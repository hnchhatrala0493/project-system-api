import { useEffect, useState } from "react";
import api from "../api/axios";
import Table from "../components/Table";

const Sprints = () => {
  const [sprints, setSprints] = useState([]);
  useEffect(() => {
    api.get("/sprints").then((res) => setSprints(res.data)).catch(() => setSprints([]));
  }, []);

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Iteration planning</p>
        <h1 className="text-3xl font-black text-ink">Sprints</h1>
      </div>
      <Table
        columns={[
          { key: "name", label: "Sprint" },
          { key: "project", label: "Project", render: (row) => row.project?.name || "-" },
          { key: "goal", label: "Goal" },
          { key: "status", label: "Status" },
          { key: "tasks", label: "Tasks", render: (row) => row.tasks?.length || 0 },
        ]}
        rows={sprints}
      />
    </section>
  );
};

export default Sprints;
