const groups = [
  ["Company profile", "Branding, billing identity, timezone"],
  ["Departments", "Engineering, QA, Product, Support"],
  ["Designations", "Manager, Team Lead, Developer, Tester"],
  ["Project categories", "Internal, Client, Maintenance, Research"],
  ["Priority master", "Low, Medium, High, Critical"],
  ["Status master", "Project, task, bug, sprint statuses"],
];

const Settings = () => {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Workspace controls</p>
        <h1 className="text-3xl font-black text-ink">Settings</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {groups.map(([title, description]) => (
          <article key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-black text-ink">{title}</h2>
            <p className="mt-2 text-sm font-semibold text-steel">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Settings;
