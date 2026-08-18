import { Menu, Bell } from "lucide-react";

function Topbar({ setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-20 h-16 lg:h-20 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">

      <div className="h-full flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          {/* Mobile Menu */}

          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[#18322F]"
          >
            <Menu size={28} />
          </button>

          <div>

            <h2
              className="text-xl lg:text-2xl font-semibold text-[#18322F]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Parasmani Admin
            </h2>

            <p className="hidden sm:block text-sm text-gray-500">
              Welcome back, Administrator
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3 lg:gap-5">

          {/* Notification */}

          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">

            <Bell size={22} className="text-[#18322F]" />

            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>

          </button>

          {/* Admin Avatar */}

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-[#18322F] text-white flex items-center justify-center font-bold">

              A

            </div>

            <div className="hidden md:block">

              <p className="text-sm font-semibold text-[#18322F]">
                Administrator
              </p>

              <p className="text-xs text-gray-500">
                Super Admin
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;