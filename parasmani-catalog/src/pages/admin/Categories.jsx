import { useState } from "react";
import { Plus } from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import CategoryTable from "../../components/admin/Category/CategoryTable";
import CategoryForm from "../../components/admin/Category/CategoryForm";

function Categories() {
  const [openForm, setOpenForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshCategories = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setOpenForm(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setOpenForm(true);
  };

  return (
    <AdminLayout>
      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8">
        <div>
          <h1
            className="text-3xl md:text-4xl text-[#18322F]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Categories
          </h1>

          <p className="mt-2 text-gray-600">
            Manage all jewellery categories.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#18322F] text-white px-6 py-3 rounded-xl hover:bg-[#244744] transition"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <CategoryTable
        key={refreshKey}
        onEdit={handleEdit}
      />

      <CategoryForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        editingCategory={editingCategory}
        refreshCategories={refreshCategories}
      />
    </AdminLayout>
  );
}

export default Categories;