import {
  BarChart3,
  BriefcaseBusiness,
  Bug,
  ClipboardList,
  Columns3,
  Gauge,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: Users },
  { to: "/roles", label: "Roles", icon: ShieldCheck },
  { to: "/projects", label: "Projects", icon: BriefcaseBusiness },
  { to: "/tasks", label: "Tasks", icon: ClipboardList },
  { to: "/bugs", label: "Bugs", icon: Bug },
  { to: "/sprints", label: "Sprints", icon: Gauge },
  { to: "/kanban", label: "Kanban", icon: Columns3 },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/profile", label: "Profile", icon: UserRound },
];

const Sidebar = () => {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white px-4 py-5 lg:block">
      <NavLink to="/dashboard" className="mb-7 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-white">
          <BriefcaseBusiness size={22} />
        </div>
        <div>
          <p className="text-lg font-black text-ink">ProjectFlow</p>
          <p className="text-xs font-semibold text-steel">Management system</p>
        </div>
      </NavLink>

      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition ${
                isActive ? "bg-ink text-white" : "text-steel hover:bg-slate-100 hover:text-ink"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
