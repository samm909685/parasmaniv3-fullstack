import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/productService";

function ProductDetailsSection() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      const allProducts = response.data || [];

      const foundProduct = allProducts.find(
        (item) => item.id === Number(id)
      );

      setProduct(foundProduct || null);
    } catch (error) {
      console.error("Failed to load product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500">
            Loading product...
          </p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-lg">
            Product not found
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Image */}
          <div>
            <img
              src={product.featured_image}
              alt={product.name}
              className="w-full rounded-3xl"
            />
          </div>

          {/* Details */}
          <div>

            <p className="uppercase tracking-[0.3em] text-[#C8A044]">
              {product.product_code || "Jewellery"}
            </p>

            <h1
              className="mt-4 text-5xl text-[#18322F]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              {product.name}
            </h1>

            <p className="mt-8 text-gray-600 leading-8">
              {product.description}
            </p>

            <div className="mt-10 space-y-4">

              <p>
                <strong>Category:</strong>{" "}
                {product.category_name}
              </p>

              <p>
                <strong>Product Code:</strong>{" "}
                {product.product_code}
              </p>

              <p>
                <strong>Weight:</strong>{" "}
                {product.weight}
              </p>

              <p>
                <strong>Purity:</strong>{" "}
                {product.purity}
              </p>

            </div>

            <button
              className="mt-12 bg-[#18322F] text-white px-10 py-4 rounded-full hover:bg-[#23423F] transition"
            >
              Enquire on WhatsApp →
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ProductDetailsSection;