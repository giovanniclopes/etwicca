import {
  ArrowRightStartOnRectangleIcon,
  BuildingOfficeIcon,
  CircleStackIcon,
  CommandLineIcon,
  HomeIcon,
  ServerIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", href: ROUTES.DASHBOARD, icon: HomeIcon },
  { name: "Hardware", href: ROUTES.HARDWARE, icon: ServerIcon },
  { name: "Software", href: ROUTES.SOFTWARE, icon: CommandLineIcon },
  { name: "Banco de Dados", href: ROUTES.DATABASE, icon: CircleStackIcon },
  { name: "Redes", href: ROUTES.NETWORKS, icon: WifiIcon },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white">
      <div className="flex items-center justify-center h-16 bg-slate-800 border-b border-slate-700">
        <BuildingOfficeIcon className="w-8 h-8 text-blue-400 mr-3" />
        <h1 className="text-lg font-bold">ET & Wicca</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-6">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ArrowRightStartOnRectangleIcon className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
