import logo from "../../assets/logo.png";

function Login() {
  return (
    <section className="min-h-screen bg-[#F8F5EE] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* Left Side */}

        <div className="hidden lg:flex bg-[#18322F] text-white flex-col justify-center items-center p-12">

          <img
            src={logo}
            alt="Parasmani"
            className="w-40 mb-8"
          />

          <h1
            className="text-4xl text-[#D8B15C]"
            style={{ fontFamily: "Cinzel, serif" }}
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

        {/* Right Side */}

        <div className="p-8 sm:p-12">

          <div className="lg:hidden flex flex-col items-center mb-8">

            <img
              src={logo}
              alt="Parasmani"
              className="w-24 mb-4"
            />

            <h2
              className="text-3xl text-[#18322F]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Parasmani
            </h2>

          </div>

          <h2 className="text-3xl font-semibold text-[#18322F]">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Login to continue.
          </p>

          <form className="space-y-6">

            <div>

              <label className="block mb-2 text-[#18322F] font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#18322F]"
              />

            </div>

            <div>

              <label className="block mb-2 text-[#18322F] font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#18322F]"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-[#18322F] hover:bg-[#23423F] text-white py-3 rounded-xl transition font-semibold"
            >
              Login
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Login;