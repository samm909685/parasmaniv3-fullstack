import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";

function Collections() {
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();

      const categories = response.data.filter(
        (category) => category.featured && category.status
      );

      setFeaturedCategories(categories);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  return (
    <section className="py-10 md:py-14 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-center uppercase tracking-[0.35em] text-[#C8A044] text-xs sm:text-sm">
          Explore
        </p>

        <h2
          className="text-center text-3xl sm:text-4xl md:text-5xl mt-3"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Our Collections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-10">

          {featuredCategories.map((category) => (

            <Link
              key={category.id}
              to={`/collections/${category.slug}`}
              className="group relative h-[360px] sm:h-[400px] md:h-[430px] overflow-hidden rounded-2xl cursor-pointer block"
            >

              <img
                src={
                  category.image
  ? `https://api.parasmanijewelers.in/uploads/categories/${category.image}`
  : "https://placehold.co/600x700"
                }
                
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">

                <h3
                  className="text-white text-2xl sm:text-3xl"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  {category.name}
                </h3>

                <button className="mt-4 px-5 py-2 sm:px-6 sm:py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition">

                  View Collection

                </button>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Collections;