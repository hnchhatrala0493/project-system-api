import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Account</p>
        <h1 className="text-3xl font-black text-ink">Profile</h1>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-ink text-3xl font-black text-white">{user?.name?.slice(0, 1) || "P"}</div>
          <div>
            <h2 className="text-2xl font-black text-ink">{user?.name || "ProjectFlow User"}</h2>
            <p className="font-semibold text-steel">{user?.email}</p>
            <p className="mt-1 inline-flex rounded-lg bg-mint/10 px-2 py-1 text-xs font-bold text-mint">{user?.role}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Department", user?.department],
            ["Designation", user?.designation],
            ["Status", user?.status],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase text-steel">{label}</p>
              <p className="mt-1 font-black text-ink">{value || "-"}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
