import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import api from "../api/axios";
import Button from "../components/Button";
import Table from "../components/Table";

const defaults = [
  { name: "Super Admin", description: "Full access", permissions: { manageUsers: true, manageProjects: true, manageTasks: true, manageBugs: true, manageReports: true, manageSettings: true } },
  { name: "Project Manager", description: "Manage assigned delivery", permissions: { manageProjects: true, manageTasks: true, manageReports: true } },
  { name: "Developer", description: "Update assigned tasks", permissions: { manageTasks: true } },
];

const Roles = () => {
  const [roles, setRoles] = useState(defaults);
  useEffect(() => {
    api.get("/roles").then((res) => setRoles(res.data.length ? res.data : defaults)).catch(() => setRoles(defaults));
  }, []);

  return (
    <section className="space-y-5">
      <div className="flex justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Access control</p>
          <h1 className="text-3xl font-black text-ink">Roles & Permissions</h1>
        </div>
        <Button><Plus size={18} /> Role</Button>
      </div>
      <Table
        columns={[
          { key: "name", label: "Role" },
          { key: "description", label: "Description" },
          { key: "permissions", label: "Permissions", render: (row) => Object.entries(row.permissions || {}).filter(([, value]) => value).map(([key]) => key.replace("manage", "")).join(", ") || "View only" },
        ]}
        rows={roles}
      />
    </section>
  );
};

export default Roles;
