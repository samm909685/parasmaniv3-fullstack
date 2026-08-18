import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";

import {
  createProduct,
  updateProduct,
} from "../../../services/productService";

function ProductForm({
  open,
  onClose,
  editingProduct,
  refreshProducts,
}) {

    const [categories, setCategories] = useState([]);

const [categoryId, setCategoryId] = useState("");

const [name, setName] = useState("");

const [productCode, setProductCode] = useState("");

const [slug, setSlug] = useState("");

const [description, setDescription] = useState("");

const [weight, setWeight] = useState("");

const [purity, setPurity] = useState("");

const [featuredImage, setFeaturedImage] = useState(null);

const [galleryImages, setGalleryImages] = useState([]);

const [featured, setFeatured] = useState(false);

const [status, setStatus] = useState(true);

const [loading, setLoading] = useState(false);

useEffect(() => {
  loadCategories();
}, []);

const loadCategories = async () => {
  try {
    const res = await axios.get(
  "https://api.parasmanijewelers.in/api/categories"
);

    setCategories(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

const resetForm = () => {
  setCategoryId("");
  setName("");
  setProductCode("");
  setSlug("");
  setDescription("");
  setWeight("");
  setPurity("");
  setFeaturedImage(null);
  setGalleryImages([]);
  setFeatured(false);
  setStatus(true);
};

useEffect(() => {
  if (editingProduct) {
    setCategoryId(editingProduct.category_id || "");
    setName(editingProduct.name || "");
    setProductCode(editingProduct.product_code || "");
    setSlug(editingProduct.slug || "");
    setDescription(editingProduct.description || "");
    setWeight(editingProduct.weight || "");
    setPurity(editingProduct.purity || "");
    setFeatured(Boolean(editingProduct.featured));
    setStatus(Boolean(editingProduct.status));
    setFeaturedImage(null);
    setGalleryImages([]);
  } else {
    resetForm();
  }
}, [editingProduct]);

const handleSubmit = async () => {
  if (!name.trim()) {
    alert("Product Name is required");
    return;
  }

  if (!categoryId) {
    alert("Please select a category");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("category_id", categoryId);
    formData.append("name", name);
    formData.append("product_code", productCode);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("weight", weight);
    formData.append("purity", purity);
    formData.append("featured", featured);
    formData.append("status", status);
    formData.append("display_order", 0);

    if (featuredImage) {
      formData.append("featured_image", featuredImage);
    }

    galleryImages.forEach((img) => {
      formData.append("gallery_images", img);
    });

    let result;

    if (editingProduct) {
      result = await updateProduct(
        editingProduct.id,
        formData
      );
    } else {
      result = await createProduct(formData);
    }

    if (result.success) {
      alert(
        editingProduct
          ? "Product Updated Successfully"
          : "Product Added Successfully"
      );

      resetForm();

     if (refreshProducts) {
  refreshProducts();
}

      onClose();
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.log(err);

    alert("Failed to save product");
  } finally {
    setLoading(false);
  }
};



  if (!open) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 h-full w-full lg:w-[650px] bg-white shadow-2xl z-50 overflow-y-auto">

        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">

          <div>

            <h2
              className="text-2xl text-[#18322F]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Add Product
            </h2>

            <p className="text-gray-500 mt-1">
              Create a new jewellery product.
            </p>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        <div className="p-6 space-y-6">

          {/* Featured Image */}

          <div>

            <label className="block font-medium mb-2">
              Featured Image
            </label>

            <label className="border-2 border-dashed rounded-2xl h-48 flex flex-col justify-center items-center cursor-pointer hover:border-[#18322F]">

              <Upload size={34} className="text-gray-400" />

              <span className="mt-3 text-gray-500">
                {featuredImage
  ? featuredImage.name
  : "Upload Featured Image"}
              </span>

              <input
  type="file"
  className="hidden"
  accept="image/*"
  onChange={(e) =>
    setFeaturedImage(e.target.files[0])
  }
/>

            </label>

          </div>

          {/* Gallery */}

          <div>

            <label className="block font-medium mb-2">
              Gallery Images
            </label>

            <input
  type="file"
  multiple
  accept="image/*"
  className="w-full border rounded-xl p-3"
  onChange={(e) =>
    setGalleryImages([...e.target.files])
  }
/>

          </div>

          {/* Product Name */}

          <div>

            <label className="block font-medium mb-2">
              Product Name
            </label>

          <input
  type="text"
  value={name}
  onChange={(e) => {
    setName(e.target.value);

    setSlug(
      e.target.value
        .toLowerCase()
        .replace(/\s+/g, "-")
    );
  }}
  className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#18322F]"
/>

          </div>

          {/* Product Code */}

          <div>

            <label className="block font-medium mb-2">
              Product Code
            </label>

           <input
  type="text"
  value={productCode}
  onChange={(e) =>
    setProductCode(e.target.value)
  }
  className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#18322F]"
/>

          </div>

          {/* Category */}

          <div>

            <label className="block font-medium mb-2">
              Category
            </label>

            <select
  value={categoryId}
  onChange={(e) =>
    setCategoryId(e.target.value)
  }
  className="w-full border rounded-xl px-4 py-3"
>
  <option value="">
    Select Category
  </option>

  {categories.map((category) => (
    <option
      key={category.id}
      value={category.id}
    >
      {category.name}
    </option>
  ))}
</select>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

  <div>

    <label className="block font-medium mb-2">
      Weight
    </label>

    <input
      type="text"
      value={weight}
      onChange={(e) =>
        setWeight(e.target.value)
      }
      placeholder="10 gm"
      className="w-full border rounded-xl px-4 py-3"
    />

  </div>

  <div>

    <label className="block font-medium mb-2">
      Purity
    </label>

    <input
      type="text"
      value={purity}
      onChange={(e) =>
        setPurity(e.target.value)
      }
      placeholder="22K"
      className="w-full border rounded-xl px-4 py-3"
    />

  </div>

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
  className="w-full border rounded-xl px-4 py-3"
/>

          </div>

          {/* Featured */}

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-medium">
                Featured Product
              </h3>

              <p className="text-sm text-gray-500">
                Show on homepage.
              </p>

            </div>

           <input
  type="checkbox"
  checked={featured}
  onChange={(e) =>
    setFeatured(e.target.checked)
  }
  className="w-5 h-5"
/>

          </div>

          {/* Status */}

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-medium">
                Active
              </h3>

              <p className="text-sm text-gray-500">
                Visible on website.
              </p>

            </div>

            <input
  type="checkbox"
  checked={status}
  onChange={(e) =>
    setStatus(e.target.checked)
  }
  className="w-5 h-5"
/>

          </div>

        </div>

        {/* Footer */}

        <div className="sticky bottom-0 bg-white border-t p-6 flex gap-4">

         <button
  onClick={() => {
    resetForm();
    onClose();
  }}
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
    : editingProduct
    ? "Update Product"
    : "Save Product"}

</button>

        </div>

      </div>

    </>
  );
}

export default ProductForm;