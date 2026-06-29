import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BriefcaseBusiness, LogIn } from "lucide-react";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-cloud lg:grid-cols-[1.1fr_0.9fr]">
      <section className="hidden bg-ink px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-mint">
            <BriefcaseBusiness />
          </div>
          <span className="text-2xl font-black">ProjectFlow</span>
        </div>
        <div className="max-w-xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-mint">Modern project control</p>
          <h1 className="text-5xl font-black leading-tight">Plan, assign, test, report, and deliver from one workspace.</h1>
          <p className="mt-6 text-lg text-slate-300">A focused MERN dashboard for teams that need clean execution visibility.</p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm text-slate-300">
          {["Role access", "Kanban flow", "Live reports"].map((item) => (
            <div key={item} className="rounded-lg border border-white/10 p-4">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-center p-6">
        <form onSubmit={submit} className="w-full max-w-md rounded-lg bg-white p-8 shadow-panel">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Welcome back</p>
            <h2 className="mt-2 text-3xl font-black text-ink">Sign in</h2>
          </div>
          {error ? <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div> : null}
          <label className="mb-4 block">
            <span className="mb-1 block text-sm font-bold text-steel">Email</span>
            <input className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-mint" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </label>
          <label className="mb-6 block">
            <span className="mb-1 block text-sm font-bold text-steel">Password</span>
            <input className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-mint" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </label>
          <Button type="submit" className="w-full" disabled={loading}>
            <LogIn size={18} /> {loading ? "Signing in" : "Login"}
          </Button>
          <p className="mt-5 text-center text-sm text-steel">
            New team? <Link className="font-bold text-ink" to="/register">Create an account</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
