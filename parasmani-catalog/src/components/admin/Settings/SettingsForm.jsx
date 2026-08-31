import { useEffect, useState } from "react";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api.parasmanijewelers.in";

function SettingsForm() {
  /* =====================================================
     ADMIN AUTHENTICATION
  ====================================================== */

  const [adminEmail, setAdminEmail] = useState("");

  /* =====================================================
     EMAIL CHANGE
  ====================================================== */

  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  /* =====================================================
     PASSWORD CHANGE
  ====================================================== */

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [passwordLoading, setPasswordLoading] =
    useState(false);

  /* =====================================================
     MESSAGES
  ====================================================== */

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* =====================================================
     GET CURRENT ADMIN
  ====================================================== */

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem(
          "parasmani_admin_token"
        );

        if (!token) {
          return;
        }

        const response = await fetch(
          `${API_URL}/api/auth/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (
          response.ok &&
          data.success &&
          data.admin
        ) {
          setAdminEmail(data.admin.email);

          setNewEmail(data.admin.email);

          localStorage.setItem(
            "parasmani_admin",
            JSON.stringify(data.admin)
          );
        }

      } catch (error) {
        console.error(
          "Failed to fetch admin:",
          error
        );
      }
    };

    fetchAdmin();
  }, []);

  /* =====================================================
     CLEAR MESSAGES
  ====================================================== */

  const clearMessages = () => {
    setMessage("");
    setError("");
  };

  /* =====================================================
     CHANGE EMAIL
  ====================================================== */

  const handleEmailChange = async (event) => {
    event.preventDefault();

    clearMessages();

    const token = localStorage.getItem(
      "parasmani_admin_token"
    );

    if (!token) {
      setError(
        "Authentication required. Please login again."
      );
      return;
    }

    const trimmedEmail =
      newEmail.trim().toLowerCase();

    if (!trimmedEmail) {
      setError("Please enter a new email address.");
      return;
    }

    if (!emailPassword) {
      setError(
        "Please enter your current password."
      );
      return;
    }

    if (trimmedEmail === adminEmail) {
      setError(
        "New email must be different from your current email."
      );
      return;
    }

    try {
      setEmailLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/email`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            email: trimmedEmail,
            currentPassword: emailPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to update email."
        );
      }

      /* Update local admin information */

      const storedAdmin =
        localStorage.getItem(
          "parasmani_admin"
        );

      let admin = {};

      try {
        admin = storedAdmin
          ? JSON.parse(storedAdmin)
          : {};
      } catch {
        admin = {};
      }

      admin.email = data.email;

      localStorage.setItem(
        "parasmani_admin",
        JSON.stringify(admin)
      );

      setAdminEmail(data.email);
      setNewEmail(data.email);
      setEmailPassword("");

      setMessage(
        "Admin email updated successfully."
      );

    } catch (error) {
      console.error(
        "Change Email Error:",
        error
      );

      setError(
        error.message ||
          "Failed to update email."
      );

    } finally {
      setEmailLoading(false);
    }
  };

  /* =====================================================
     CHANGE PASSWORD
  ====================================================== */

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    clearMessages();

    const token = localStorage.getItem(
      "parasmani_admin_token"
    );

    if (!token) {
      setError(
        "Authentication required. Please login again."
      );
      return;
    }

    if (!currentPassword) {
      setError(
        "Please enter your current password."
      );
      return;
    }

    if (!newPassword) {
      setError(
        "Please enter a new password."
      );
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "New password must be at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        "New password and confirmation do not match."
      );
      return;
    }

    if (newPassword === currentPassword) {
      setError(
        "New password must be different from the current password."
      );
      return;
    }

    try {
      setPasswordLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/password`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to update password."
        );
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setMessage(
        "Admin password updated successfully."
      );

    } catch (error) {
      console.error(
        "Change Password Error:",
        error
      );

      setError(
        error.message ||
          "Failed to update password."
      );

    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* =====================================================
          GLOBAL MESSAGE
      ====================================================== */}

      {(message || error) && (
        <div
          className={`
            rounded-2xl
            border
            px-5
            py-4
            flex
            items-start
            gap-3
            ${
              error
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            }
          `}
        >

          {error ? (
            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0"
            />
          ) : (
            <CheckCircle
              size={20}
              className="mt-0.5 shrink-0"
            />
          )}

          <p className="text-sm font-medium">
            {error || message}
          </p>

        </div>
      )}

      {/* =====================================================
          ADMIN SECURITY
      ====================================================== */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <div className="mb-6">

          <h2
            className="text-2xl text-[#18322F]"
            style={{
              fontFamily: "Cinzel, serif",
            }}
          >
            Admin Security
          </h2>

          <p className="mt-2 text-gray-500">
            Change the email address and password
            used to access the admin panel.
          </p>

        </div>


        {/* =================================================
            CURRENT EMAIL
        ================================================== */}

        <div
          className="
            rounded-xl
            bg-[#F8F5EE]
            border
            border-[#E8E0D1]
            px-5
            py-4
            mb-8
          "
        >

          <p className="text-xs uppercase tracking-wider text-gray-500">
            Current Admin Email
          </p>

          <p className="mt-1 text-[#18322F] font-semibold break-all">
            {adminEmail || "Loading..."}
          </p>

        </div>


        {/* =================================================
            CHANGE EMAIL
        ================================================== */}

        <form
          onSubmit={handleEmailChange}
          className="space-y-5"
        >

          <h3 className="text-lg font-semibold text-[#18322F]">
            Change Email
          </h3>

          <div>

            <label className="block mb-2 font-medium text-[#18322F]">
              New Email
            </label>

            <input
              type="email"
              value={newEmail}
              onChange={(event) =>
                setNewEmail(event.target.value)
              }
              placeholder="Enter new admin email"
              disabled={emailLoading}
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:border-[#18322F]
                disabled:bg-gray-100
              "
            />

          </div>


          <div>

            <label className="block mb-2 font-medium text-[#18322F]">
              Current Password
            </label>

            <input
              type="password"
              value={emailPassword}
              onChange={(event) =>
                setEmailPassword(
                  event.target.value
                )
              }
              placeholder="Enter current password"
              autoComplete="current-password"
              disabled={emailLoading}
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:border-[#18322F]
                disabled:bg-gray-100
              "
            />

          </div>


          <div className="flex justify-end">

            <button
              type="submit"
              disabled={emailLoading}
              className="
                bg-[#18322F]
                hover:bg-[#244744]
                text-white
                px-7
                py-3
                rounded-xl
                transition
                font-semibold
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {emailLoading
                ? "Updating..."
                : "Update Email"}
            </button>

          </div>

        </form>


        <div className="border-t border-gray-100 my-8" />


        {/* =================================================
            CHANGE PASSWORD
        ================================================== */}

        <form
          onSubmit={handlePasswordChange}
          className="space-y-5"
        >

          <h3 className="text-lg font-semibold text-[#18322F]">
            Change Password
          </h3>

          <div>

            <label className="block mb-2 font-medium text-[#18322F]">
              Current Password
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(
                  event.target.value
                )
              }
              placeholder="Enter current password"
              autoComplete="current-password"
              disabled={passwordLoading}
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:border-[#18322F]
                disabled:bg-gray-100
              "
            />

          </div>


          <div>

            <label className="block mb-2 font-medium text-[#18322F]">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(
                  event.target.value
                )
              }
              placeholder="Enter new password"
              autoComplete="new-password"
              disabled={passwordLoading}
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:border-[#18322F]
                disabled:bg-gray-100
              "
            />

            <p className="text-xs text-gray-500 mt-2">
              Password must contain at least 8 characters.
            </p>

          </div>


          <div>

            <label className="block mb-2 font-medium text-[#18322F]">
              Confirm New Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              placeholder="Confirm new password"
              autoComplete="new-password"
              disabled={passwordLoading}
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:border-[#18322F]
                disabled:bg-gray-100
              "
            />

          </div>


          <div className="flex justify-end">

            <button
              type="submit"
              disabled={passwordLoading}
              className="
                bg-[#18322F]
                hover:bg-[#244744]
                text-white
                px-7
                py-3
                rounded-xl
                transition
                font-semibold
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {passwordLoading
                ? "Updating..."
                : "Update Password"}
            </button>

          </div>

        </form>

      </div>


      {/* =====================================================
          GENERAL SETTINGS
      ====================================================== */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <h2
          className="text-2xl text-[#18322F] mb-6"
          style={{
            fontFamily: "Cinzel, serif",
          }}
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

            <label
              className="
                border-2
                border-dashed
                rounded-xl
                h-36
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                hover:border-[#18322F]
              "
            >

              <Upload
                size={28}
                className="text-gray-400"
              />

              <span className="mt-2 text-gray-500">
                Upload Logo
              </span>

              <input
                type="file"
                className="hidden"
              />

            </label>

          </div>

        </div>

      </div>


      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <h2
          className="text-2xl text-[#18322F] mb-6"
          style={{
            fontFamily: "Cinzel, serif",
          }}
        >
          Hero Section
        </h2>

        <div className="space-y-6">

          <div>

            <label className="block mb-2 font-medium">
              Hero Banner
            </label>

            <label
              className="
                border-2
                border-dashed
                rounded-xl
                h-44
                flex
                flex-col
                justify-center
                items-center
                cursor-pointer
                hover:border-[#18322F]
              "
            >

              <Upload
                size={32}
                className="text-gray-400"
              />

              <span className="mt-2 text-gray-500">
                Upload Hero Banner
              </span>

              <input
                type="file"
                className="hidden"
              />

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


      {/* =====================================================
          CONTACT
      ====================================================== */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <h2
          className="text-2xl text-[#18322F] mb-6"
          style={{
            fontFamily: "Cinzel, serif",
          }}
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


      {/* =====================================================
          SOCIAL LINKS
      ====================================================== */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <h2
          className="text-2xl text-[#18322F] mb-6"
          style={{
            fontFamily: "Cinzel, serif",
          }}
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


      {/* =====================================================
          SEO
      ====================================================== */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <h2
          className="text-2xl text-[#18322F] mb-6"
          style={{
            fontFamily: "Cinzel, serif",
          }}
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


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <h2
          className="text-2xl text-[#18322F] mb-6"
          style={{
            fontFamily: "Cinzel, serif",
          }}
        >
          Footer
        </h2>

        <textarea
          rows="3"
          placeholder="Copyright Text"
          className="w-full border rounded-xl px-4 py-3"
        />

      </div>


      {/* =====================================================
          SAVE WEBSITE SETTINGS
      ====================================================== */}

      <div className="flex justify-end">

        <button
          type="button"
          className="
            bg-[#18322F]
            hover:bg-[#244744]
            text-white
            px-10
            py-3
            rounded-xl
            transition
          "
        >
          Save Settings
        </button>

      </div>

    </div>
  );
}

export default SettingsForm;