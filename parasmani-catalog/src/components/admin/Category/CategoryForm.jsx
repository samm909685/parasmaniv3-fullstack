import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import {
  createCategory,
  updateCategory,
} from "../../../services/categoryService";

function CategoryForm({
  open,
  onClose,
  editingCategory,
  refreshCategories,
}) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setSlug("");
    setDescription("");
    setFeatured(false);
    setStatus(true);
    setImage(null);
  };

  useEffect(() => {
    if (!open) return;

    if (editingCategory) {
      setName(editingCategory.name || "");
      setSlug(editingCategory.slug || "");
      setDescription(editingCategory.description || "");
      setFeatured(Boolean(editingCategory.featured));
      setStatus(Boolean(editingCategory.status));
      setImage(null);
    } else {
      resetForm();
    }
  }, [editingCategory, open]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Category Name is required");
      return;
    }

    if (!slug.trim()) {
      alert("Slug is required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("featured", featured);
      formData.append("status", status);
      formData.append("display_order", 0);

      if (image) {
        formData.append("image", image);
      }

      const result = editingCategory
        ? await updateCategory(editingCategory.id, formData)
        : await createCategory(formData);

      if (result.success) {
        alert(
          editingCategory
            ? "Category Updated Successfully"
            : "Category Added Successfully"
        );

        refreshCategories();
        resetForm();
        onClose();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save category.");
    } finally {
      setLoading(false);
    }
  };
    return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 h-full w-full sm:w-[520px] bg-white shadow-2xl z-50 overflow-y-auto">

        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">

          <div>

            <h2
              className="text-2xl text-[#18322F]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              {editingCategory ? "Edit Category" : "Add Category"}
            </h2>

            <p className="text-gray-500 mt-1">
              {editingCategory
                ? "Update jewellery category."
                : "Create a new jewellery category."}
            </p>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Form */}

        <div className="p-6 space-y-6">

          {/* Image */}

          <div>

            <label className="block font-medium mb-2">
              Category Image
            </label>

            <label className="border-2 border-dashed rounded-2xl h-44 flex flex-col justify-center items-center cursor-pointer hover:border-[#18322F] transition">

              <Upload
                size={34}
                className="text-gray-400"
              />

              <span className="mt-3 text-gray-500">

                {image
                  ? image.name
                  : "Upload Category Image"}

              </span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />

            </label>

          </div>

          {/* Name */}

          <div>

            <label className="block font-medium mb-2">
              Category Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);

                if (!editingCategory) {
                  setSlug(
                    e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                  );
                }
              }}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#18322F]"
            />

          </div>

          {/* Slug */}

          <div>

            <label className="block font-medium mb-2">
              Slug
            </label>

            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#18322F]"
            />

          </div>

          {/* Description */}

          <div>

            <label className="block font-medium mb-2">
              Description
            </label>

            <textarea
              rows="5"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#18322F]"
            />

          </div>

          {/* Featured */}

          <div className="flex justify-between items-center">

            <h3 className="font-medium">
              Featured on Homepage
            </h3>

            <input
              type="checkbox"
              checked={featured}
              onChange={(e) =>
                setFeatured(e.target.checked)
              }
            />

          </div>

          {/* Status */}

          <div className="flex justify-between items-center">

            <h3 className="font-medium">
              Active
            </h3>

            <input
              type="checkbox"
              checked={status}
              onChange={(e) =>
                setStatus(e.target.checked)
              }
            />

          </div>

        </div>

        {/* Footer */}

        <div className="sticky bottom-0 bg-white border-t p-6 flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 border rounded-xl py-3 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-[#18322F] text-white rounded-xl py-3 hover:bg-[#244744] disabled:opacity-50"
          >

            {loading
              ? "Saving..."
              : editingCategory
              ? "Update Category"
              : "Save Category"}

          </button>

        </div>

      </div>

    </>
  );
}

export default CategoryForm;