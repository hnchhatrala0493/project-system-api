import { Bell, LogOut, Menu, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex min-h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Button variant="ghost" className="h-10 w-10 px-0 lg:hidden" aria-label="Open navigation">
          <Menu size={20} />
        </Button>
        <div className="hidden h-10 max-w-md flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 md:flex">
          <Search size={17} className="text-steel" />
          <input className="w-full bg-transparent text-sm outline-none" placeholder="Search projects, tasks, bugs" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" className="h-10 w-10 px-0" aria-label="Notifications">
          <Bell size={19} />
        </Button>
        <Link to="/profile" className="hidden items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-slate-100 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-mint text-sm font-bold text-white">
            {user?.name?.slice(0, 1) || "P"}
          </div>
          <div className="text-left">
            <p className="max-w-36 truncate text-sm font-bold text-ink">{user?.name || "ProjectFlow User"}</p>
            <p className="text-xs font-semibold text-steel">{user?.role || "Admin"}</p>
          </div>
        </Link>
        <Button variant="secondary" className="h-10 w-10 px-0" onClick={handleLogout} aria-label="Logout">
          <LogOut size={18} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
