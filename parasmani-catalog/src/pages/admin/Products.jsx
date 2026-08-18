import { useState, useRef } from "react";
import { Plus } from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import ProductTable from "../../components/admin/Product/ProductTable";
import ProductForm from "../../components/admin/Product/ProductForm";

function Products() {
  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const tableRef = useRef();

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1
            className="text-3xl md:text-4xl text-[#18322F]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Products
          </h1>

          <p className="mt-2 text-gray-600">
            Manage all jewellery products.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setOpenForm(true);
          }}
          className="flex items-center justify-center gap-2 bg-[#18322F] hover:bg-[#244744] text-white px-6 py-3 rounded-xl transition"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <ProductTable
        ref={tableRef}
        onEdit={(product) => {
          setEditingProduct(product);
          setOpenForm(true);
        }}
      />

      <ProductForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        editingProduct={editingProduct}
        refreshProducts={() =>
          tableRef.current?.loadProducts()
        }
      />
    </AdminLayout>
  );
}

export default Products;