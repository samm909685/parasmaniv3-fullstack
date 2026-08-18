import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { getFavorites } from "../utils/favorites";
import ProductCard from "../components/ProductCard/ProductCard";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { FaWhatsapp } from "react-icons/fa";

function Favorites() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoriteIds = getFavorites();

      if (favoriteIds.length === 0) {
        setProducts([]);
        return;
      }

      const response = await getProducts();

      const allProducts = response.data || [];

      const favoriteProducts = allProducts.filter((product) =>
        favoriteIds.includes(Number(product.id))
      );

      setProducts(favoriteProducts);
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================
     WHATSAPP ENQUIRY
  ========================== */

  const handleWhatsAppEnquiry = () => {
    if (products.length === 0) return;

    const whatsappNumber = "919096856444";

    let message =
      "Hello Parasmani Jewellers,%0A%0A" +
      "I am interested in the following jewellery designs from your catalog:%0A%0A";

    products.forEach((product, index) => {
      message += `${index + 1}. ${product.name}`;

      if (product.product_code) {
        message += ` - Code: ${product.product_code}`;
      }

      message += "%0A";
    });

    message +=
      "%0APlease share more details and availability.%0A%0A" +
      "Thank you.";

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <>
      <Header />

      <main className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* ==========================
              HEADING
          ========================== */}

          <div className="text-center mb-10">

            <p className="uppercase tracking-[0.35em] text-[#C8A044] text-sm">
              Your Selection
            </p>

            <h1
              className="text-4xl md:text-6xl mt-4 text-[#18322F]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              My Favorites
            </h1>

          </div>

          {/* ==========================
              LOADING
          ========================== */}

          {loading && (
            <div className="text-center py-20">
              <p className="text-gray-500">
                Loading favorites...
              </p>
            </div>
          )}

          {/* ==========================
              EMPTY
          ========================== */}

          {!loading && products.length === 0 && (
            <div className="text-center py-20">

              <p className="text-5xl mb-6 text-[#18322F]">
                ♡
              </p>

              <h2
                className="text-2xl text-[#18322F]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                No Favorites Yet
              </h2>

              <p className="mt-4 text-gray-500">
                Explore our collections and save
                the designs you love.
              </p>

            </div>
          )}

          {/* ==========================
              FAVORITE PRODUCTS
          ========================== */}

          {!loading && products.length > 0 && (
            <>
              {/* WhatsApp Enquiry */}

              <div className="flex justify-center mb-12">

                <button
                  onClick={handleWhatsAppEnquiry}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    bg-[#1F3332]
                    text-white
                    px-7
                    sm:px-9
                    py-3
                    sm:py-4
                    rounded-full
                    hover:bg-[#294443]
                    transition
                    duration-300
                    shadow-sm
                  "
                >
                  <FaWhatsapp className="text-xl" />

                  <span>
                    Enquire All Favorites on WhatsApp
                  </span>
                </button>

              </div>

              {/* Products */}

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">

                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>
            </>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Favorites;