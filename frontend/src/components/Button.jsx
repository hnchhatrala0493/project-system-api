const variants = {
  primary: "bg-ink text-white hover:bg-slate-800",
  secondary: "bg-white text-ink ring-1 ring-slate-200 hover:bg-slate-50",
  danger: "bg-coral text-white hover:bg-red-500",
  ghost: "text-steel hover:bg-slate-100",
};

const Button = ({ children, variant = "primary", className = "", type = "button", ...props }) => {
  return (
    <button
      type={type}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
