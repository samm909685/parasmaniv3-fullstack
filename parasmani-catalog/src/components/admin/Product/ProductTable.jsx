import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  getProducts,
  deleteProduct,
} from "../../../services/productService";

import DeleteProductModal from "./DeleteProductModal";
import {
  Search,
  Pencil,
  Trash2,
  Star,
} from "lucide-react";



const ProductTable = forwardRef(({ onEdit }, ref) => {
  const [products, setProducts] = useState([]);

const [search, setSearch] = useState("");

const [deleteOpen, setDeleteOpen] = useState(false);

const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
  loadProducts();
}, []);

const loadProducts = async () => {
  try {
    const res = await getProducts();

console.log(res);

setProducts(res.data);
  } catch (err) {
    console.log(err);
  }
};

const handleDelete = async () => {
  try {
    const result = await deleteProduct(selectedId);

    if (result.success) {
      setDeleteOpen(false);
      loadProducts();
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.log(err);
    alert("Delete failed");
  }
};

useImperativeHandle(ref, () => ({
  loadProducts,
}));

const filteredProducts = products.filter((product) =>
  product.name
    .toLowerCase()
    .includes(search.toLowerCase())
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
            placeholder="Search product..."
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
              <th className="text-left p-5">Product</th>
              <th className="text-left p-5">Code</th>
              <th className="text-left p-5">Category</th>
              <th className="text-left p-5">Featured</th>
              <th className="text-left p-5">Status</th>
              <th className="text-center p-5">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr
                key={product.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-5">
                  <img
                    src={product.featured_image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </td>

                <td className="p-5 font-semibold">
                  {product.name}
                </td>

                <td className="p-5">
                  {product.product_code}
                </td>

                <td className="p-5">
                  {product.category_name}
                </td>

                <td className="p-5">
                  {product.featured ? (
                    <span className="inline-flex items-center gap-2 text-[#C8A044]">
                      <Star size={16} fill="currentColor" />
                      Yes
                    </span>
                  ) : (
                    "No"
                  )}
                </td>

                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-5">

                  <div className="flex justify-center gap-3">

                   <button
  onClick={() => onEdit(product)}
  className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
>

                      <Pencil size={18} />

                    </button>

                    <button
  onClick={() => {
    setSelectedId(product.id);
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

        {filteredProducts.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
          >

            <div className="flex gap-4">

              <img
                src={product.featured_image}
                alt={product.name}
                className="w-20 h-20 rounded-xl object-cover"
              />

              <div className="flex-1">

                <h3 className="font-semibold text-lg">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {product.product_code}
                </p>

                <p className="text-sm mt-1">
                  {product.category_name}
                </p>

                <p className="text-sm mt-1">
                  {product.status ? "Active" : "Inactive"}
                </p>

              </div>

            </div>

            <div className="flex gap-3 mt-5">

            <button
  onClick={() => onEdit(product)}
  className="flex-1 py-3 rounded-xl bg-blue-100 text-blue-700"
>
  Edit
</button>

          <button
  onClick={() => {
    setSelectedId(product.id);
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
<DeleteProductModal
  open={deleteOpen}
  onClose={() => setDeleteOpen(false)}
  onDelete={handleDelete}
/>
       </>
  );
});

export default ProductTable;