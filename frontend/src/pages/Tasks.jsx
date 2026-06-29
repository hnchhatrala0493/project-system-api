import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import api from "../api/axios";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Table from "../components/Table";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", project: "", assignedTo: "", priority: "Medium", status: "Todo", startDate: "", dueDate: "", estimatedHours: 0 });

  const load = () => {
    api.get("/tasks").then((res) => setTasks(res.data)).catch(() => setTasks([]));
    api.get("/projects").then((res) => setProjects(res.data)).catch(() => setProjects([]));
    api.get("/users").then((res) => setUsers(res.data)).catch(() => setUsers([]));
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (event) => {
    event.preventDefault();
    await api.post("/tasks", form);
    setOpen(false);
    load();
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Execution board</p>
          <h1 className="text-3xl font-black text-ink">Tasks</h1>
        </div>
        <Button onClick={() => setOpen(true)}><Plus size={18} /> New task</Button>
      </div>
      <Table
        columns={[
          { key: "title", label: "Task" },
          { key: "project", label: "Project", render: (row) => row.project?.name || "-" },
          { key: "assignedTo", label: "Assigned", render: (row) => row.assignedTo?.name || "Unassigned" },
          { key: "priority", label: "Priority" },
          { key: "status", label: "Status", render: (row) => <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold">{row.status}</span> },
          { key: "dueDate", label: "Due", render: (row) => row.dueDate ? new Date(row.dueDate).toLocaleDateString() : "-" },
        ]}
        rows={tasks}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="Create task">
        <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-1 block text-sm font-bold text-steel">Title</span>
            <input className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-mint" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </label>
          <label>
            <span className="mb-1 block text-sm font-bold text-steel">Project</span>
            <select className="h-11 w-full rounded-lg border border-slate-200 px-3" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} required>
              <option value="">Select project</option>
              {projects.map((project) => <option key={project._id} value={project._id}>{project.name}</option>)}
            </select>
          </label>
          <label>
            <span className="mb-1 block text-sm font-bold text-steel">Assigned to</span>
            <select className="h-11 w-full rounded-lg border border-slate-200 px-3" value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}>
              <option value="">Unassigned</option>
              {users.map((user) => <option key={user._id} value={user._id}>{user.name}</option>)}
            </select>
          </label>
          {["startDate", "dueDate"].map((key) => (
            <label key={key}>
              <span className="mb-1 block text-sm font-bold text-steel">{key === "startDate" ? "Start date" : "Due date"}</span>
              <input className="h-11 w-full rounded-lg border border-slate-200 px-3" type="date" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required />
            </label>
          ))}
          <label>
            <span className="mb-1 block text-sm font-bold text-steel">Priority</span>
            <select className="h-11 w-full rounded-lg border border-slate-200 px-3" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              {["Low", "Medium", "High", "Critical"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span className="mb-1 block text-sm font-bold text-steel">Estimated hours</span>
            <input className="h-11 w-full rounded-lg border border-slate-200 px-3" type="number" value={form.estimatedHours} onChange={(e) => setForm({ ...form, estimatedHours: e.target.value })} />
          </label>
          <label className="sm:col-span-2">
            <span className="mb-1 block text-sm font-bold text-steel">Description</span>
            <textarea className="min-h-24 w-full rounded-lg border border-slate-200 px-3 py-2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          <div className="sm:col-span-2"><Button type="submit" className="w-full">Save task</Button></div>
        </form>
      </Modal>
    </section>
  );
};

export default Tasks;
