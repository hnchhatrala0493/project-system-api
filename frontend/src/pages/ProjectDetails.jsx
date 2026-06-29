import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Table from "../components/Table";

const ProjectDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/projects/${id}`).then((res) => setData(res.data)).catch(() => setData(null));
  }, [id]);

  if (!data) return <div className="rounded-lg bg-white p-6 text-steel">Project details unavailable.</div>;

  const { project, tasks } = data;

  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">{project.code}</p>
        <h1 className="mt-1 text-3xl font-black text-ink">{project.name}</h1>
        <p className="mt-3 max-w-3xl text-steel">{project.description || "No project description yet."}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          {["clientName", "status", "priority", "category"].map((key) => (
            <div key={key} className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-bold uppercase text-steel">{key}</p>
              <p className="mt-1 font-black text-ink">{project[key]}</p>
            </div>
          ))}
        </div>
      </div>
      <Table
        columns={[
          { key: "title", label: "Task" },
          { key: "assignedTo", label: "Assigned", render: (row) => row.assignedTo?.name || "Unassigned" },
          { key: "priority", label: "Priority" },
          { key: "status", label: "Status" },
          { key: "dueDate", label: "Due", render: (row) => row.dueDate ? new Date(row.dueDate).toLocaleDateString() : "-" },
        ]}
        rows={tasks || []}
      />
    </section>
  );
};

export default ProjectDetails;
