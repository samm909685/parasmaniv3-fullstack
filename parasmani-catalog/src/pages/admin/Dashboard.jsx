import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import {
  Gem,
  FolderKanban,
  Star,
  Image as ImageIcon,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api.parasmanijewelers.in";

function Dashboard() {
  const [stats, setStats] = useState([
    {
      title: "Total Products",
      value: 0,
      icon: <Gem size={30} />,
    },
    {
      title: "Categories",
      value: 0,
      icon: <FolderKanban size={30} />,
    },
    {
      title: "Featured Products",
      value: 0,
      icon: <Star size={30} />,
    },
    {
      title: "Images",
      value: 0,
      icon: <ImageIcon size={30} />,
    },
  ]);

  const [recentProducts, setRecentProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* =========================================================
     FETCH DASHBOARD DATA
  ========================================================= */

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        /* =====================================================
           FETCH PRODUCTS
        ===================================================== */

        const productsResponse = await fetch(
          `${API_URL}/api/products`
        );

        const productsData =
          await productsResponse.json();

        if (!productsResponse.ok) {
          throw new Error(
            productsData.message ||
              "Failed to fetch products"
          );
        }

        /* =====================================================
           FETCH CATEGORIES
        ===================================================== */

        const categoriesResponse = await fetch(
          `${API_URL}/api/categories`
        );

        const categoriesData =
          await categoriesResponse.json();

        if (!categoriesResponse.ok) {
          throw new Error(
            categoriesData.message ||
              "Failed to fetch categories"
          );
        }

        /* =====================================================
           NORMALIZE PRODUCTS
        ===================================================== */

        const products =
          Array.isArray(productsData)
            ? productsData
            : Array.isArray(productsData.data)
            ? productsData.data
            : [];

        /* =====================================================
           NORMALIZE CATEGORIES
        ===================================================== */

        const categories =
          Array.isArray(categoriesData)
            ? categoriesData
            : Array.isArray(categoriesData.data)
            ? categoriesData.data
            : [];

        /* =====================================================
           TOTAL PRODUCTS
        ===================================================== */

        const totalProducts =
          products.length;

        /* =====================================================
           TOTAL CATEGORIES
        ===================================================== */

        const totalCategories =
          categories.length;

        /* =====================================================
           FEATURED PRODUCTS
        ===================================================== */

        const featuredProducts =
          products.filter(
            (product) =>
              product.featured === true ||
              product.featured === 1 ||
              product.featured === "1" ||
              product.featured === "true"
          );

        const totalFeaturedProducts =
          featuredProducts.length;

        /* =====================================================
           TOTAL IMAGES
           
           Count:
           - Featured image
           - Every gallery image
        ===================================================== */

        let totalImages = 0;

        products.forEach((product) => {
          /* Featured image */

          if (
            product.featured_image &&
            String(product.featured_image).trim() !== ""
          ) {
            totalImages += 1;
          }

          /* Gallery images */

          let galleryImages =
            product.gallery_images;

          if (
            typeof galleryImages === "string"
          ) {
            try {
              galleryImages =
                JSON.parse(galleryImages);
            } catch {
              galleryImages = [];
            }
          }

          if (
            Array.isArray(galleryImages)
          ) {
            totalImages +=
              galleryImages.length;
          }
        });

        /* =====================================================
           RECENT PRODUCTS
           
           Use created_at if available.
           Otherwise keep API order.
        ===================================================== */

        const sortedProducts = [
          ...products,
        ].sort((a, b) => {
          if (
            a.created_at &&
            b.created_at
          ) {
            return (
              new Date(b.created_at) -
              new Date(a.created_at)
            );
          }

          if (
            a.createdAt &&
            b.createdAt
          ) {
            return (
              new Date(b.createdAt) -
              new Date(a.createdAt)
            );
          }

          return 0;
        });

        const latestProducts =
          sortedProducts.slice(0, 5);

        /* =====================================================
           UPDATE STATE
        ===================================================== */

        setStats([
          {
            title: "Total Products",
            value: totalProducts,
            icon: <Gem size={30} />,
          },
          {
            title: "Categories",
            value: totalCategories,
            icon: <FolderKanban size={30} />,
          },
          {
            title: "Featured Products",
            value:
              totalFeaturedProducts,
            icon: <Star size={30} />,
          },
          {
            title: "Images",
            value: totalImages,
            icon: <ImageIcon size={30} />,
          },
        ]);

        setRecentProducts(
          latestProducts
        );
      } catch (err) {
        console.error(
          "Dashboard Error:",
          err
        );

        setError(
          err.message ||
            "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  /* =========================================================
     GET CATEGORY NAME
  ========================================================= */

  const getCategoryName = (product) => {
    /* If API already gives category name */

    if (
      product.category_name
    ) {
      return product.category_name;
    }

    if (
      product.categoryName
    ) {
      return product.categoryName;
    }

    if (
      product.category
    ) {
      if (
        typeof product.category ===
        "string"
      ) {
        return product.category;
      }

      if (
        typeof product.category ===
          "object" &&
        product.category.name
      ) {
        return product.category.name;
      }
    }

    return "—";
  };

  /* =========================================================
     LOADING STATE
  ========================================================= */

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div
              className="
                w-10
                h-10
                border-4
                border-[#18322F]/20
                border-t-[#18322F]
                rounded-full
                animate-spin
                mx-auto
              "
            />

            <p className="mt-4 text-[#18322F] font-medium">
              Loading dashboard...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  /* =========================================================
     DASHBOARD
  ========================================================= */

  return (
    <AdminLayout>

      {/* =====================================================
          HEADING
      ===================================================== */}

      <div className="mb-10">

        <h1
          className="
            text-3xl
            md:text-4xl
            text-[#18322F]
          "
          style={{
            fontFamily: "Cinzel, serif",
          }}
        >
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-gray-600">
          Here's an overview of your
          jewellery catalogue.
        </p>

      </div>


      {/* =====================================================
          ERROR MESSAGE
      ===================================================== */}

      {error && (
        <div
          className="
            mb-8
            rounded-2xl
            border
            border-red-200
            bg-red-50
            px-5
            py-4
            text-red-700
          "
        >
          <p className="font-medium">
            Unable to load some dashboard data.
          </p>

          <p className="text-sm mt-1">
            {error}
          </p>
        </div>
      )}


      {/* =====================================================
          STATS
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        {stats.map((item) => (

          <div
            key={item.title}
            className="
              bg-white
              rounded-2xl
              p-6
              shadow-sm
              border
              border-gray-100
              hover:shadow-lg
              transition
            "
          >

            <div
              className="
                flex
                justify-between
                items-center
              "
            >

              <div>

                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2
                  className="
                    text-3xl
                    font-bold
                    mt-2
                    text-[#18322F]
                  "
                >
                  {item.value}
                </h2>

              </div>

              <div className="text-[#C8A044]">
                {item.icon}
              </div>

            </div>

          </div>

        ))}

      </div>


      {/* =====================================================
          RECENT PRODUCTS
      ===================================================== */}

      <div
        className="
          mt-12
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-gray-100
          overflow-hidden
        "
      >

        {/* Heading */}

        <div className="p-6 border-b">

          <h2
            className="
              text-2xl
              text-[#18322F]
            "
            style={{
              fontFamily: "Cinzel, serif",
            }}
          >
            Recently Added Products
          </h2>

        </div>


        {/* ===================================================
            NO PRODUCTS
        =================================================== */}

        {recentProducts.length === 0 ? (

          <div className="p-10 text-center">

            <p className="text-gray-500">
              No products found.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              {/* =================================================
                  TABLE HEADER
              ================================================= */}

              <thead className="bg-[#F8F5EE]">

                <tr>

                  <th
                    className="
                      text-left
                      p-5
                      whitespace-nowrap
                    "
                  >
                    Product Code
                  </th>

                  <th
                    className="
                      text-left
                      p-5
                      whitespace-nowrap
                    "
                  >
                    Product Name
                  </th>

                  <th
                    className="
                      text-left
                      p-5
                      whitespace-nowrap
                    "
                  >
                    Category
                  </th>

                </tr>

              </thead>


              {/* =================================================
                  TABLE BODY
              ================================================= */}

              <tbody>

                {recentProducts.map(
                  (product, index) => (

                    <tr
                      key={
                        product.id ||
                        product.product_code ||
                        index
                      }
                      className="
                        border-t
                        hover:bg-gray-50
                        transition
                      "
                    >

                      {/* Product Code */}

                      <td
                        className="
                          p-5
                          font-medium
                          whitespace-nowrap
                        "
                      >
                        {product.product_code ||
                          product.code ||
                          "—"}
                      </td>


                      {/* Product Name */}

                      <td
                        className="
                          p-5
                          whitespace-nowrap
                        "
                      >
                        {product.name ||
                          "—"}
                      </td>


                      {/* Category */}

                      <td
                        className="
                          p-5
                          whitespace-nowrap
                        "
                      >
                        {getCategoryName(
                          product
                        )}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </AdminLayout>
  );
}

export default Dashboard;