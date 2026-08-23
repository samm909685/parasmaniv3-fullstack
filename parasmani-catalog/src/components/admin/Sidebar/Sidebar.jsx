import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Gem,
  Image,
  MessageSquareText,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    link: "/admin/dashboard",
  },
  {
    title: "Categories",
    icon: <FolderKanban size={20} />,
    link: "/admin/categories",
  },
  {
    title: "Products",
    icon: <Gem size={20} />,
    link: "/admin/products",
  },
  {
    title: "Media",
    icon: <Image size={20} />,
    link: "/admin/media",
  },

  {
  title: "Design Requests",
  icon: <MessageSquareText size={20} />,
  link: "/admin/design-requests",
  },

  {
    title: "Settings",
    icon: <Settings size={20} />,
    link: "/admin/settings",
  },
];

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-[#18322F]
          text-white
          transform transition-transform duration-300

          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }

          lg:translate-x-0
          lg:z-30
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between px-8 py-8 border-b border-white/10">

          <div>

            <h1
              className="text-3xl text-[#D8B15C]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Parasmani
            </h1>

            <p className="uppercase tracking-[0.35em] text-xs mt-2 text-gray-300">
              Admin Panel
            </p>

          </div>

          {/* Close Button Mobile */}

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="mt-8 px-4 space-y-2">

          {menu.map((item) => (

            <Link
              key={item.title}
              to={item.link}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-4
                rounded-xl
                px-5
                py-4
                transition-all duration-300

                ${
                  location.pathname === item.link
                    ? "bg-[#D8B15C] text-[#18322F] font-semibold shadow-lg"
                    : "hover:bg-white/10"
                }
              `}
            >
              {item.icon}

              <span>{item.title}</span>

            </Link>

          ))}

        </nav>

        {/* Logout */}

        <div className="absolute bottom-0 left-0 w-full p-5 border-t border-white/10">

          <button
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              rounded-xl
              py-3
              bg-white/10
              hover:bg-red-500
              transition
            "
          >
            <LogOut size={18} />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;