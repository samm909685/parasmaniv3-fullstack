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

      // Only show active categories
      const activeCategories = response.data.filter(
        (item) => item.status
      );

      setCategories(activeCategories);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  return (
    <section className="bg-[#F8F5EE] py-20">

      {/* Hero */}

      <div className="max-w-7xl mx-auto px-6">

        <p
          className="text-center uppercase tracking-[0.45em] text-[#C8A044] text-sm"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Collections
        </p>

        <h1
          className="text-center text-4xl md:text-6xl mt-4 text-[#18322F]"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Traditional Gold Jewellery
        </h1>

        <p className="mt-8 text-center max-w-3xl mx-auto text-gray-600 leading-8">
          Explore our handcrafted collections created for jewellery
          retailers and wholesale partners.
        </p>

      </div>

      {/* Dynamic Categories */}

      <div className="mt-20">

        {categories.map((item, index) => (

          <section
            key={item.id}
            className="max-w-7xl mx-auto px-6 mb-24"
          >

            <div
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1
                  ? "lg:[&>*:first-child]:order-2"
                  : ""
              }`}
            >

              {/* Image */}

              <div className="overflow-hidden rounded-3xl">

                <img
                  src={
                    item.image
  ? `https://api.parasmanijewelers.in/uploads/categories/${item.image}`
  : "https://placehold.co/700x700"
                  }
                  alt={item.name}
                  className="w-full h-[280px] md:h-[520px] object-cover hover:scale-105 transition duration-700"
                />

              </div>

              {/* Text */}

              <div>

                <p
                  className="uppercase tracking-[0.35em] text-[#C8A044] text-sm"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Collection
                </p>

                <h2
                  className="mt-4 text-4xl md:text-6xl text-[#18322F]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  {item.name}
                </h2>

                <p className="mt-8 text-gray-600 leading-9">
                  {item.description || "Premium handcrafted jewellery collection."}
                </p>

                <Link to={`/collections/${item.slug}`}>

                  <button className="mt-10 border border-[#18322F] px-9 py-4 rounded-full hover:bg-[#18322F] hover:text-white transition">

                    Explore Collection →

                  </button>

                </Link>

              </div>

            </div>

          </section>

        ))}

      </div>

    </section>
  );
}

export default CollectionsLanding;