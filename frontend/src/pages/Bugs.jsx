import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import api from "../api/axios";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Table from "../components/Table";

const Bugs = () => {
  const [bugs, setBugs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", project: "", severity: "Medium", priority: "Medium", stepsToReproduce: "", expectedResult: "", actualResult: "" });

  const load = () => {
    api.get("/bugs").then((res) => setBugs(res.data)).catch(() => setBugs([]));
    api.get("/projects").then((res) => setProjects(res.data)).catch(() => setProjects([]));
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (event) => {
    event.preventDefault();
    await api.post("/bugs", form);
    setOpen(false);
    load();
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Quality tracking</p>
          <h1 className="text-3xl font-black text-ink">Bugs</h1>
        </div>
        <Button onClick={() => setOpen(true)}><Plus size={18} /> Report bug</Button>
      </div>
      <Table
        columns={[
          { key: "title", label: "Bug" },
          { key: "project", label: "Project", render: (row) => row.project?.name || "-" },
          { key: "severity", label: "Severity" },
          { key: "priority", label: "Priority" },
          { key: "status", label: "Status", render: (row) => <span className="rounded-lg bg-red-50 px-2 py-1 text-xs font-bold text-red-700">{row.status}</span> },
          { key: "assignedTo", label: "Assigned", render: (row) => row.assignedTo?.name || "Unassigned" },
        ]}
        rows={bugs}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="Report bug">
        <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-1 block text-sm font-bold text-steel">Title</span>
            <input className="h-11 w-full rounded-lg border border-slate-200 px-3" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </label>
          <label>
            <span className="mb-1 block text-sm font-bold text-steel">Project</span>
            <select className="h-11 w-full rounded-lg border border-slate-200 px-3" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} required>
              <option value="">Select project</option>
              {projects.map((project) => <option key={project._id} value={project._id}>{project.name}</option>)}
            </select>
          </label>
          {["severity", "priority"].map((key) => (
            <label key={key}>
              <span className="mb-1 block text-sm font-bold text-steel">{key}</span>
              <select className="h-11 w-full rounded-lg border border-slate-200 px-3" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}>
                {["Low", "Medium", "High", "Critical"].map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          ))}
          {["description", "stepsToReproduce", "expectedResult", "actualResult"].map((key) => (
            <label key={key} className="sm:col-span-2">
              <span className="mb-1 block text-sm font-bold text-steel">{key}</span>
              <textarea className="min-h-20 w-full rounded-lg border border-slate-200 px-3 py-2" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
            </label>
          ))}
          <div className="sm:col-span-2"><Button type="submit" className="w-full">Save bug</Button></div>
        </form>
      </Modal>
    </section>
  );
};

export default Bugs;
