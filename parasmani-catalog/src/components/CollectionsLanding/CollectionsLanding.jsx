import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/categoryService";

function CollectionsLanding() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();

      const activeCategories = response.data.filter(
        (item) => item.status
      );

      setCategories(activeCategories);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  return (
    <section className="bg-[#F8F5EE]">

      {/* =====================================================
          PAGE INTRO
      ====================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-10 sm:pt-12 md:pt-14 pb-8 sm:pb-10">

          <p
            className="
              uppercase
              tracking-[0.35em]
              sm:tracking-[0.4em]
              text-[#C8A044]
              text-[10px]
              sm:text-xs
            "
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Collections
          </p>

          <h1
            className="
              mt-3
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-[48px]
              leading-tight
              text-[#18322F]
            "
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Traditional Gold Jewellery
          </h1>

          <p
            className="
              mt-4
              max-w-2xl
              mx-auto
              text-xs
              sm:text-sm
              md:text-base
              text-gray-600
              leading-6
              sm:leading-7
            "
          >
            Explore our handcrafted collections created for jewellery
            retailers and wholesale partners.
          </p>

        </div>
      </div>


      {/* =====================================================
          COLLECTION GRID
      ====================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">

        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-3
            gap-x-3
            gap-y-8
            sm:gap-x-5
            sm:gap-y-10
            lg:gap-x-7
            lg:gap-y-12
          "
        >

          {categories.map((item) => (

            <article
              key={item.id}
              className="min-w-0 group"
            >

              {/* =================================================
                  IMAGE
              ================================================== */}

              <Link to={`/collections/${item.slug}`}>
                <div
                  className="
                    overflow-hidden
                    rounded-xl
                    sm:rounded-2xl
                    bg-[#EDE5D7]
                  "
                >

                  <img
                    src={
                      item.image
                        ? `https://api.parasmanijewelers.in/uploads/categories/${item.image}`
                        : "https://placehold.co/700x700"
                    }
                    alt={item.name}
                    className="
                      w-full
                      aspect-square
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-700
                    "
                  />

                </div>
              </Link>


              {/* =================================================
                  COLLECTION DETAILS
              ================================================== */}

              <div className="pt-4 sm:pt-5">

                <p
                  className="
                    uppercase
                    tracking-[0.2em]
                    sm:tracking-[0.28em]
                    text-[#C8A044]
                    text-[9px]
                    sm:text-[10px]
                    lg:text-xs
                  "
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Collection
                </p>

                <h2
                  className="
                    mt-1.5
                    sm:mt-2
                    text-xl
                    sm:text-2xl
                    lg:text-3xl
                    leading-tight
                    text-[#18322F]
                  "
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  {item.name}
                </h2>

                <p
                  className="
                    mt-2
                    sm:mt-3
                    text-[11px]
                    sm:text-xs
                    lg:text-sm
                    text-gray-600
                    leading-5
                    sm:leading-6
                    line-clamp-2
                  "
                >
                  {item.description ||
                    "Premium handcrafted jewellery collection."}
                </p>

                <Link to={`/collections/${item.slug}`}>
                  <button
                    className="
                      mt-3
                      sm:mt-4
                      border
                      border-[#18322F]
                      px-4
                      sm:px-5
                      lg:px-6
                      py-2
                      sm:py-2.5
                      rounded-full
                      text-[10px]
                      sm:text-xs
                      text-[#18322F]
                      hover:bg-[#18322F]
                      hover:text-white
                      transition
                    "
                  >
                    Explore →
                  </button>
                </Link>

              </div>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}

export default CollectionsLanding;