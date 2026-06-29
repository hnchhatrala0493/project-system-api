import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import api from "../api/axios";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Table from "../components/Table";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", code: "", clientName: "", description: "", startDate: "", endDate: "", priority: "Medium", status: "Planning", budget: 0, technologies: "" });
  const load = () => api.get("/projects").then((res) => setProjects(res.data)).catch(() => setProjects([]));

  useEffect(() => {
    load();
  }, []);

  const save = async (event) => {
    event.preventDefault();
    await api.post("/projects", { ...form, technologies: form.technologies.split(",").map((item) => item.trim()).filter(Boolean) });
    setOpen(false);
    load();
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Delivery portfolio</p>
          <h1 className="text-3xl font-black text-ink">Projects</h1>
        </div>
        <Button onClick={() => setOpen(true)}><Plus size={18} /> New project</Button>
      </div>
      <Table
        columns={[
          { key: "name", label: "Project", render: (row) => <Link className="font-bold text-ink hover:text-mint" to={`/projects/${row._id}`}>{row.name}</Link> },
          { key: "code", label: "Code" },
          { key: "clientName", label: "Client" },
          { key: "status", label: "Status", render: (row) => <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold">{row.status}</span> },
          { key: "priority", label: "Priority" },
          { key: "budget", label: "Budget", render: (row) => `$${Number(row.budget || 0).toLocaleString()}` },
        ]}
        rows={projects}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="Create project">
        <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
          {[
            ["name", "Project name"],
            ["code", "Project code"],
            ["clientName", "Client name"],
            ["startDate", "Start date"],
            ["endDate", "End date"],
            ["budget", "Budget"],
            ["technologies", "Technology stack"],
          ].map(([key, label]) => (
            <label key={key}>
              <span className="mb-1 block text-sm font-bold text-steel">{label}</span>
              <input className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-mint" type={key.includes("Date") ? "date" : key === "budget" ? "number" : "text"} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required={!["technologies", "budget"].includes(key)} />
            </label>
          ))}
          <label>
            <span className="mb-1 block text-sm font-bold text-steel">Priority</span>
            <select className="h-11 w-full rounded-lg border border-slate-200 px-3" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              {["Low", "Medium", "High", "Critical"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="sm:col-span-2">
            <span className="mb-1 block text-sm font-bold text-steel">Description</span>
            <textarea className="min-h-24 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-mint" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          <div className="sm:col-span-2"><Button type="submit" className="w-full">Save project</Button></div>
        </form>
      </Modal>
    </section>
  );
};

export default Projects;
