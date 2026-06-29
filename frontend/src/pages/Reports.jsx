import { useEffect, useState } from "react";
import api from "../api/axios";
import Table from "../components/Table";

const Reports = () => {
  const [tasks, setTasks] = useState([]);
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    api.get("/reports/tasks").then((res) => setTasks(res.data)).catch(() => setTasks([]));
    api.get("/reports/bugs").then((res) => setBugs(res.data)).catch(() => setBugs([]));
  }, []);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Performance intelligence</p>
        <h1 className="text-3xl font-black text-ink">Reports</h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-lg font-black text-ink">Task report</h2>
          <Table columns={[{ key: "title", label: "Task" }, { key: "project", label: "Project", render: (row) => row.project?.name || "-" }, { key: "status", label: "Status" }, { key: "assignedTo", label: "Owner", render: (row) => row.assignedTo?.name || "-" }]} rows={tasks.slice(0, 8)} />
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-black text-ink">Bug report</h2>
          <Table columns={[{ key: "title", label: "Bug" }, { key: "project", label: "Project", render: (row) => row.project?.name || "-" }, { key: "severity", label: "Severity" }, { key: "status", label: "Status" }]} rows={bugs.slice(0, 8)} />
        </div>
      </div>
    </section>
  );
};

export default Reports;
