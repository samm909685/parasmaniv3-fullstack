import AdminLayout from "../../layouts/AdminLayout";
import SettingsForm from "../../components/admin/Settings/SettingsForm";

function Settings() {
  return (
    <AdminLayout>

      <div className="mb-8">

        <h1
          className="text-3xl md:text-4xl text-[#18322F]"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Website Settings
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your website information, branding and contact details.
        </p>

      </div>

      <SettingsForm />

    </AdminLayout>
  );
}

export default Settings;