import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

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

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api.parasmanijewelers.in";

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

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [
    unreadDesignRequests,
    setUnreadDesignRequests,
  ] = useState(0);

  /* =====================================================
     FETCH UNREAD DESIGN REQUEST COUNT
  ====================================================== */

  useEffect(() => {
    const fetchUnreadDesignRequests =
      async () => {
        try {
          const token = localStorage.getItem(
            "parasmani_admin_token"
          );

          if (!token) {
            setUnreadDesignRequests(0);
            return;
          }

          const response = await fetch(
            `${API_URL}/api/design-requests/unread-count`,
            {
              method: "GET",

              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          /* Token expired / invalid */

          if (response.status === 401) {
            localStorage.removeItem(
              "parasmani_admin_token"
            );

            localStorage.removeItem(
              "parasmani_admin"
            );

            navigate("/admin/login", {
              replace: true,
            });

            return;
          }

          if (!response.ok) {
            return;
          }

          const data =
            await response.json();

          setUnreadDesignRequests(
            Number(data.unread_count) || 0
          );

        } catch (error) {
          console.error(
            "Failed to fetch unread design requests:",
            error
          );
        }
      };

    fetchUnreadDesignRequests();

    const interval = setInterval(
      fetchUnreadDesignRequests,
      10000
    );

    return () =>
      clearInterval(interval);

  }, [navigate]);

  /* =====================================================
     LOGOUT
  ====================================================== */

  const handleLogout = () => {
    localStorage.removeItem(
      "parasmani_admin_token"
    );

    localStorage.removeItem(
      "parasmani_admin"
    );

    setUnreadDesignRequests(0);

    setSidebarOpen(false);

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-72
          bg-[#18322F]
          text-white
          transform
          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
          lg:z-30
        `}
      >

        {/* =================================================
            HEADER
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            px-8
            py-8
            border-b
            border-white/10
          "
        >

          <div>

            <h1
              className="
                text-3xl
                text-[#D8B15C]
              "
              style={{
                fontFamily:
                  "Cinzel, serif",
              }}
            >
              Parasmani
            </h1>

            <p
              className="
                uppercase
                tracking-[0.35em]
                text-xs
                mt-2
                text-gray-300
              "
            >
              Admin Panel
            </p>

          </div>

          {/* Mobile Close */}

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="lg:hidden"
            type="button"
          >
            <X size={24} />
          </button>

        </div>

        {/* =================================================
            NAVIGATION
        ================================================== */}

        <nav className="mt-8 px-4 space-y-2">

          {menu.map((item) => (

            <Link
              key={item.title}
              to={item.link}
              onClick={() =>
                setSidebarOpen(false)
              }
              className={`
                flex
                items-center
                gap-4
                rounded-xl
                px-5
                py-4
                transition-all
                duration-300

                ${
                  location.pathname ===
                  item.link
                    ? "bg-[#D8B15C] text-[#18322F] font-semibold shadow-lg"
                    : "hover:bg-white/10"
                }
              `}
            >

              {item.icon}

              <span className="flex-1">
                {item.title}
              </span>

              {/* Design Request Badge */}

              {item.title ===
                "Design Requests" &&
                unreadDesignRequests > 0 && (

                  <span
                    className="
                      min-w-[24px]
                      h-6
                      px-1.5
                      rounded-full
                      bg-[#D8B15C]
                      text-[#18322F]
                      text-xs
                      font-bold
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {unreadDesignRequests >
                    99
                      ? "99+"
                      : unreadDesignRequests}
                  </span>

                )}

            </Link>

          ))}

        </nav>

        {/* =================================================
            LOGOUT
        ================================================== */}

        <div
          className="
            absolute
            bottom-0
            left-0
            w-full
            p-5
            border-t
            border-white/10
          "
        >

          <button
            type="button"
            onClick={handleLogout}
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