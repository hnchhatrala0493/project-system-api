import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const roles = ["Super Admin", "Admin", "Project Manager", "Team Lead", "Developer", "Tester", "Client"];

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Admin", department: "Engineering", designation: "Project Owner" });
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-cloud p-6">
      <form onSubmit={submit} className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-panel">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">ProjectFlow</p>
        <h1 className="mt-2 text-3xl font-black text-ink">Create workspace account</h1>
        {error ? <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div> : null}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["name", "Name"],
            ["email", "Email"],
            ["password", "Password"],
            ["department", "Department"],
            ["designation", "Designation"],
          ].map(([key, label]) => (
            <label key={key} className="block">
              <span className="mb-1 block text-sm font-bold text-steel">{label}</span>
              <input className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-mint" type={key === "password" ? "password" : key === "email" ? "email" : "text"} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required={["name", "email", "password"].includes(key)} />
            </label>
          ))}
          <label className="block">
            <span className="mb-1 block text-sm font-bold text-steel">Role</span>
            <select className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-mint" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {roles.map((role) => <option key={role}>{role}</option>)}
            </select>
          </label>
        </div>
        <Button type="submit" className="mt-6 w-full">Create account</Button>
        <p className="mt-5 text-center text-sm text-steel">
          Already registered? <Link className="font-bold text-ink" to="/login">Sign in</Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
