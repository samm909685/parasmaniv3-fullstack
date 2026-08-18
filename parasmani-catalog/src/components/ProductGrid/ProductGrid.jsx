import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import ProductCard from "../ProductCard/ProductCard";

function ProductGrid() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    try {
      setLoading(true);

      // Get categories
      const categoryResponse = await getCategories();
      const categories = categoryResponse.data || [];

      // Find the category using the URL slug
      const selectedCategory = categories.find(
        (item) => item.slug === category
      );

      if (!selectedCategory) {
        console.log("Category not found:", category);
        setProducts([]);
        return;
      }

      setCategoryId(selectedCategory.id);

      // Get all products
      const productResponse = await getProducts();
      const allProducts = productResponse.data || [];

      // Filter products belonging to this category
      const filteredProducts = allProducts.filter(
        (product) => product.category_id === selectedCategory.id
      );

      setProducts(filteredProducts);
    } catch (error) {
      console.error("Failed to load products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Product Count */}
        <div className="flex justify-between items-center mb-10">
          <p className="text-gray-600 text-sm md:text-base">
            {products.length} Designs Available
          </p>
        </div>

        {/* No Products */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No products available in this collection.
            </p>
          </div>
        ) : (
          /* Products */
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default ProductGrid;