import { useEffect, useState } from "react";
import api from "../api/axios";

const statuses = ["Todo", "In Progress", "Review", "Testing", "Completed"];

const Kanban = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    api.get("/tasks").then((res) => setTasks(res.data)).catch(() => setTasks([]));
  }, []);

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Task flow</p>
        <h1 className="text-3xl font-black text-ink">Kanban Board</h1>
      </div>
      <div className="grid gap-4 overflow-x-auto pb-2 lg:grid-cols-5">
        {statuses.map((status) => (
          <div key={status} className="min-h-96 rounded-lg border border-slate-200 bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-black text-ink">{status}</h2>
              <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-steel">{tasks.filter((task) => task.status === status).length}</span>
            </div>
            <div className="space-y-3">
              {tasks.filter((task) => task.status === status).map((task) => (
                <article key={task._id} className="rounded-lg border border-slate-200 p-3">
                  <h3 className="font-bold text-ink">{task.title}</h3>
                  <p className="mt-2 text-xs font-semibold text-steel">{task.project?.name || "No project"}</p>
                  <div className="mt-3 flex items-center justify-between text-xs font-bold">
                    <span className="rounded-lg bg-amber/10 px-2 py-1 text-amber">{task.priority}</span>
                    <span>{task.assignedTo?.name || "Unassigned"}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Kanban;
