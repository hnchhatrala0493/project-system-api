import { useEffect, useState } from "react";
import { AlertTriangle, Bug, CheckCircle2, Clock3, FolderKanban, Users } from "lucide-react";
import api from "../api/axios";

const fallback = {
  stats: { totalProjects: 12, activeProjects: 7, completedProjects: 3, pendingTasks: 46, overdueTasks: 8, bugsCount: 14, usersCount: 28 },
  projectProgress: [
    { status: "Planning", count: 3 },
    { status: "In Progress", count: 5 },
    { status: "Testing", count: 2 },
    { status: "Completed", count: 3 },
  ],
  teamPerformance: [
    { name: "Aarav", status: "Completed", count: 18 },
    { name: "Meera", status: "In Progress", count: 9 },
    { name: "Riya", status: "Testing", count: 7 },
  ],
};

const Dashboard = () => {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    api.get("/reports/dashboard").then((res) => setData(res.data)).catch(() => setData(fallback));
  }, []);

  const cards = [
    ["Total Projects", data.stats.totalProjects, FolderKanban, "bg-ink"],
    ["Active Projects", data.stats.activeProjects, Clock3, "bg-mint"],
    ["Completed", data.stats.completedProjects, CheckCircle2, "bg-emerald-600"],
    ["Pending Tasks", data.stats.pendingTasks, AlertTriangle, "bg-amber"],
    ["Open Bugs", data.stats.bugsCount, Bug, "bg-coral"],
    ["Team Members", data.stats.usersCount, Users, "bg-sky-600"],
  ];

  const max = Math.max(...data.projectProgress.map((item) => item.count), 1);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Operations overview</p>
        <h1 className="mt-1 text-3xl font-black text-ink">Dashboard</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value, Icon, color]) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-steel">{label}</p>
                <p className="mt-2 text-3xl font-black text-ink">{value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-white ${color}`}>
                <Icon size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-ink">Project progress</h2>
          <div className="mt-5 space-y-4">
            {data.projectProgress.map((item) => (
              <div key={item.status}>
                <div className="mb-1 flex justify-between text-sm font-bold">
                  <span>{item.status}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-mint" style={{ width: `${(item.count / max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-ink">Team performance</h2>
          <div className="mt-4 space-y-3">
            {data.teamPerformance.slice(0, 6).map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <div>
                  <p className="font-bold text-ink">{item.name}</p>
                  <p className="text-xs font-semibold text-steel">{item.status}</p>
                </div>
                <span className="text-lg font-black text-mint">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
