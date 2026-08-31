import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api.parasmanijewellers.in";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Invalid email or password."
        );
      }

      if (!data.token) {
        throw new Error(
          "Login failed. Authentication token was not received."
        );
      }

      /*
        Save authentication token
      */

      localStorage.setItem(
        "parasmani_admin_token",
        data.token
      );

      /*
        Save admin information
      */

      if (data.admin) {
        localStorage.setItem(
          "parasmani_admin",
          JSON.stringify(data.admin)
        );
      }

      /*
        Go to dashboard
      */

      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login Error:", error);

      setError(
        error.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F8F5EE] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <div className="hidden lg:flex bg-[#18322F] text-white flex-col justify-center items-center p-12">

          <img
            src={logo}
            alt="Parasmani"
            className="w-40 mb-8"
          />

          <h1
            className="text-4xl text-[#D8B15C]"
            style={{
              fontFamily: "Cinzel, serif",
            }}
          >
            Parasmani
          </h1>

          <p className="uppercase tracking-[0.35em] mt-3 text-sm text-gray-300">
            Admin Panel
          </p>

          <p className="text-center mt-10 text-gray-300 leading-8">
            Manage your jewellery catalogue,
            categories, products and media
            from one premium dashboard.
          </p>

        </div>


        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div className="p-8 sm:p-12">

          {/* Mobile Logo */}

          <div className="lg:hidden flex flex-col items-center mb-8">

            <img
              src={logo}
              alt="Parasmani"
              className="w-24 mb-4"
            />

            <h2
              className="text-3xl text-[#18322F]"
              style={{
                fontFamily: "Cinzel, serif",
              }}
            >
              Parasmani
            </h2>

          </div>


          {/* Heading */}

          <h2 className="text-3xl font-semibold text-[#18322F]">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Login to continue.
          </p>


          {/* Error */}

          {error && (
            <div
              className="
                mb-6
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-700
              "
            >
              {error}
            </div>
          )}


          {/* Login Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Email */}

            <div>

              <label className="block mb-2 text-[#18322F] font-medium">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email"
                autoComplete="email"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-3
                  focus:outline-none
                  focus:border-[#18322F]
                  disabled:bg-gray-100
                  disabled:cursor-not-allowed
                "
              />

            </div>


            {/* Password */}

            <div>

              <label className="block mb-2 text-[#18322F] font-medium">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-3
                  focus:outline-none
                  focus:border-[#18322F]
                  disabled:bg-gray-100
                  disabled:cursor-not-allowed
                "
              />

            </div>


            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-[#18322F]
                hover:bg-[#23423F]
                text-white
                py-3
                rounded-xl
                transition
                font-semibold
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Login;