import { Component } from "react";
import Button from "./Button";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-cloud p-6">
          <section className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-coral">ProjectFlow</p>
            <h1 className="mt-2 text-2xl font-black text-ink">Something stopped the screen from loading</h1>
            <p className="mt-3 text-sm font-semibold text-steel">{this.state.error.message}</p>
            <Button className="mt-5" onClick={() => window.location.reload()}>
              Reload
            </Button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
