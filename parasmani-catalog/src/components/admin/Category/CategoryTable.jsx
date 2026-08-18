import { useState, useEffect } from "react";
import {
  Search,
  Pencil,
  Trash2,
  Star,
} from "lucide-react";

import { getCategories } from "../../../services/categoryService";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { deleteCategory } from "../../../services/categoryService";

function CategoryTable({ onEdit }) {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
 const [deleteOpen, setDeleteOpen] = useState(false);
const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const handleDelete = async () => {
  try {
    const res = await deleteCategory(selectedId);

    if (res.success) {
      setDeleteOpen(false);
      loadCategories();
    } else {
      alert(res.message);
    }
  } catch (err) {
    console.log(err);
    alert("Delete failed");
  }
};

  const filtered = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Search */}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">

        <div className="relative">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[#18322F]"
          />

        </div>

      </div>

      {/* Desktop Table */}

      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#F8F5EE]">

            <tr>
              <th className="text-left p-5">Image</th>
              <th className="text-left p-5">Category</th>
              <th className="text-left p-5">Featured</th>
              <th className="text-left p-5">Status</th>
              <th className="text-center p-5">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filtered.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-5">

                  <img
 src={
  item.image
    ? `https://api.parasmanijewellers.in/uploads/categories/${item.image}`
    : "https://placehold.co/100x100"
}
  alt={item.name}
  className="w-16 h-16 rounded-xl object-cover"
  onError={(e) => {
    e.target.src = "https://placehold.co/100x100";
  }}
/>

                </td>

                <td className="p-5 font-semibold">
                  {item.name}
                </td>

                <td className="p-5">

                  {item.featured ? (
                    <span className="inline-flex items-center gap-2 text-[#C8A044]">
                      <Star
                        size={16}
                        fill="currentColor"
                      />
                      Yes
                    </span>
                  ) : (
                    "No"
                  )}

                </td>

                <td className="p-5">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status ? "Active" : "Inactive"}
                  </span>

                </td>

                <td className="p-5">

                  <div className="flex justify-center gap-3">

                    <button
  onClick={() => onEdit(item)}
  className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
>
  <Pencil size={18} />
</button>

                    <button
  onClick={() => {
    setSelectedId(item.id);
    setDeleteOpen(true);
  }}
  className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
>
  <Trash2 size={18} />
</button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}

      <div className="lg:hidden space-y-4">

        {filtered.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
          >

            <div className="flex gap-4">

              <img
 src={
  item.image
    ? `https://api.parasmanijewellers.in/uploads/categories/${item.image}`
    : "https://placehold.co/100x100"
}
  alt={item.name}
  className="w-20 h-20 rounded-xl object-cover"
  onError={(e) => {
    e.target.src = "https://placehold.co/100x100";
  }}
/>

              <div className="flex-1">

                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Featured : {item.featured ? "Yes" : "No"}
                </p>

                <p className="text-sm mt-1">
                  Status :
                  <span
                    className={`ml-2 ${
                      item.status
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status ? "Active" : "Inactive"}
                  </span>
                </p>

              </div>

            </div>

            <div className="flex gap-3 mt-5">

              <button
  onClick={() => onEdit(item)}
  className="flex-1 py-3 rounded-xl bg-blue-100 text-blue-700"
>
  Edit
</button>
<button
  onClick={() => {
    setSelectedId(item.id);
    setDeleteOpen(true);
  }}
  className="flex-1 py-3 rounded-xl bg-red-100 text-red-700"
>
  Delete
</button>

            </div>

          </div>

        ))}

      </div>
      <DeleteCategoryModal
  open={deleteOpen}
  onClose={() => setDeleteOpen(false)}
  onDelete={handleDelete}
/>
    </>
  );
}

export default CategoryTable;