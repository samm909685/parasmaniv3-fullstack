import { Upload } from "lucide-react";

function SettingsForm() {
  return (
    <div className="space-y-8">

      {/* General Settings */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <h2
          className="text-2xl text-[#18322F] mb-6"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          General Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              Website Name
            </label>

            <input
              type="text"
              placeholder="Parasmani Jewellers"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Logo
            </label>

            <label className="border-2 border-dashed rounded-xl h-36 flex flex-col items-center justify-center cursor-pointer hover:border-[#18322F]">

              <Upload size={28} className="text-gray-400" />

              <span className="mt-2 text-gray-500">
                Upload Logo
              </span>

              <input type="file" className="hidden" />

            </label>
          </div>

        </div>

      </div>

      {/* Hero Section */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <h2
          className="text-2xl text-[#18322F] mb-6"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Hero Section
        </h2>

        <div className="space-y-6">

          <div>
            <label className="block mb-2 font-medium">
              Hero Banner
            </label>

            <label className="border-2 border-dashed rounded-xl h-44 flex flex-col justify-center items-center cursor-pointer hover:border-[#18322F]">

              <Upload size={32} className="text-gray-400" />

              <span className="mt-2 text-gray-500">
                Upload Hero Banner
              </span>

              <input type="file" className="hidden" />

            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Hero Heading
            </label>

            <input
              type="text"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Hero Description
            </label>

            <textarea
              rows="4"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

        </div>

      </div>

      {/* Contact */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <h2
          className="text-2xl text-[#18322F] mb-6"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Contact Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            placeholder="Phone Number"
            className="border rounded-xl px-4 py-3"
          />

          <input
            placeholder="WhatsApp"
            className="border rounded-xl px-4 py-3"
          />

          <input
            placeholder="Email"
            className="border rounded-xl px-4 py-3"
          />

          <input
            placeholder="Address"
            className="border rounded-xl px-4 py-3"
          />

        </div>

      </div>

      {/* Social Links */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <h2
          className="text-2xl text-[#18322F] mb-6"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Social Media
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Instagram URL"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            placeholder="Facebook URL"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            placeholder="YouTube URL"
            className="w-full border rounded-xl px-4 py-3"
          />

        </div>

      </div>

      {/* SEO */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <h2
          className="text-2xl text-[#18322F] mb-6"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          SEO Settings
        </h2>

        <div className="space-y-5">

          <input
            placeholder="Meta Title"
            className="w-full border rounded-xl px-4 py-3"
          />

          <textarea
            rows="4"
            placeholder="Meta Description"
            className="w-full border rounded-xl px-4 py-3"
          />

        </div>

      </div>

      {/* Footer */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <h2
          className="text-2xl text-[#18322F] mb-6"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Footer
        </h2>

        <textarea
          rows="3"
          placeholder="Copyright Text"
          className="w-full border rounded-xl px-4 py-3"
        />

      </div>

      {/* Save */}

      <div className="flex justify-end">

        <button className="bg-[#18322F] hover:bg-[#244744] text-white px-10 py-3 rounded-xl transition">

          Save Settings

        </button>

      </div>

    </div>
  );
}

export default SettingsForm;