import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const location = useLocation();
  const authPage = ["/login", "/register"].includes(location.pathname);

  if (authPage) {
    return <AppRoutes />;
  }

  return (
    <div className="flex min-h-screen bg-cloud">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default App;
