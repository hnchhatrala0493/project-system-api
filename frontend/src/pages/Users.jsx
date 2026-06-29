import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import api from "../api/axios";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Table from "../components/Table";

const roles = ["Super Admin", "Admin", "Project Manager", "Team Lead", "Developer", "Tester", "Client"];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Developer", department: "Engineering", designation: "Developer", status: "Active" });

  const load = () => api.get("/users").then((res) => setUsers(res.data)).catch(() => setUsers([]));

  useEffect(() => {
    load();
  }, []);

  const save = async (event) => {
    event.preventDefault();
    await api.post("/users", form);
    setOpen(false);
    setForm({ ...form, name: "", email: "", password: "" });
    load();
  };

  const filtered = users.filter((user) => [user.name, user.email, user.role, user.department].join(" ").toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">People operations</p>
          <h1 className="text-3xl font-black text-ink">Users</h1>
        </div>
        <Button onClick={() => setOpen(true)}><Plus size={18} /> Add user</Button>
      </div>
      <div className="flex h-11 max-w-md items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
        <Search size={18} className="text-steel" />
        <input className="w-full outline-none" placeholder="Search users" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <Table
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role", render: (row) => <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold">{row.role}</span> },
          { key: "department", label: "Department" },
          { key: "status", label: "Status", render: (row) => <span className={`rounded-lg px-2 py-1 text-xs font-bold ${row.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-steel"}`}>{row.status}</span> },
        ]}
        rows={filtered}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="Add user">
        <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
          {["name", "email", "password", "department", "designation"].map((key) => (
            <label key={key}>
              <span className="mb-1 block text-sm font-bold text-steel">{key[0].toUpperCase() + key.slice(1)}</span>
              <input className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-mint" type={key === "password" ? "password" : key === "email" ? "email" : "text"} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required={["name", "email"].includes(key)} />
            </label>
          ))}
          <label>
            <span className="mb-1 block text-sm font-bold text-steel">Role</span>
            <select className="h-11 w-full rounded-lg border border-slate-200 px-3" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {roles.map((role) => <option key={role}>{role}</option>)}
            </select>
          </label>
          <div className="sm:col-span-2"><Button type="submit" className="w-full">Save user</Button></div>
        </form>
      </Modal>
    </section>
  );
};

export default Users;
