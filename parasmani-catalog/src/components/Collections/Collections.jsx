import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, Flower2 } from "lucide-react";
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
    <section className="bg-white py-12 sm:py-16 md:py-20">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="text-center max-w-2xl mx-auto">

          <p
            className="text-[#C8A044] uppercase tracking-[0.35em] text-[10px] sm:text-xs"
          >
            Explore
          </p>

          <h2
            className="mt-2 text-3xl sm:text-4xl md:text-5xl text-[#18322F]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Our Collections
          </h2>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="w-10 sm:w-14 h-px bg-[#D9B566]" />

            <Flower2
              size={20}
              strokeWidth={1.2}
              className="text-[#C8A044]"
            />

            <span className="w-10 sm:w-14 h-px bg-[#D9B566]" />
          </div>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-500 leading-6">
            Discover the beauty of handcrafted jewellery made for every moment.
          </p>

        </div>


        {/* DESKTOP + TABLET */}

        <div className="hidden sm:grid grid-cols-3 gap-5 md:gap-7 lg:gap-9 max-w-5xl mx-auto mt-10 md:mt-12">

          {featuredCategories.map((category) => (

            <Link
              key={category.id}
              to={`/collections/${category.slug}`}
              className="
                group
                flex
                flex-col
                items-center
                text-center
                border
                border-[#DDBB70]
                rounded-[120px]
                bg-white
                px-3
                md:px-4
                pt-3
                md:pt-4
                pb-7
                md:pb-8
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_12px_30px_rgba(180,140,50,0.12)]
              "
            >

              {/* IMAGE */}

              <div
                className="
                  relative
                  w-full
                  aspect-square
                  max-w-[220px]
                  md:max-w-[235px]
                  lg:max-w-[250px]
                  rounded-full
                  overflow-hidden
                  border
                  border-[#DDBB70]
                  bg-[#F8F4EA]
                "
              >

                <img
                  src={
                    category.image
                      ? `https://api.parasmanijewelers.in/uploads/categories/${category.image}`
                      : "https://placehold.co/600x600"
                  }
                  alt={category.name}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* IMAGE ARROW */}

               

              </div>


              {/* CONTENT */}

              <div className="mt-8 md:mt-9">

                <div className="flex items-center justify-center gap-2 mb-2">

                  <span className="w-4 h-px bg-[#D9B566]" />

                  <Flower2
                    size={12}
                    strokeWidth={1.2}
                    className="text-[#C8A044]"
                  />

                  <span className="w-4 h-px bg-[#D9B566]" />

                </div>

                <h3
                  className="
                    text-xl
                    md:text-2xl
                    text-[#18322F]
                  "
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  {category.name}
                </h3>

                <div className="
                  mt-3
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-[#A77A24]
                  text-xs
                  md:text-sm
                ">

                  <span>Explore Collection</span>

                  <ArrowRight
                    size={15}
                    strokeWidth={1.4}
                  />

                </div>

              </div>

            </Link>

          ))}

        </div>


        {/* MOBILE */}

        <div className="sm:hidden flex flex-col gap-3.5 mt-8">

          {featuredCategories.map((category, index) => (

           <Link
  key={category.id}
  to={`/collections/${category.slug}`}
  className={`
    group
    flex
    items-center
    w-full
    min-h-[104px]
    rounded-full
    border
    border-[#DDBB70]
    bg-white
    p-2.5
    shadow-[0_3px_15px_rgba(180,140,50,0.06)]
    active:scale-[0.985]
    transition-transform
    ${index % 2 !== 0 ? "flex-row-reverse" : ""}
  `}
>
  {/* MOBILE IMAGE */}

  <div
    className="
      flex-shrink-0
      w-[82px]
      h-[82px]
      rounded-full
      overflow-hidden
      border
      border-[#DDBB70]
      bg-[#F8F4EA]
    "
  >
    <img
      src={
        category.image
          ? `https://api.parasmanijewelers.in/uploads/categories/${category.image}`
          : "https://placehold.co/500x500"
      }
      alt={category.name}
      className="
        w-full
        h-full
        object-cover
      "
    />
  </div>


  {/* MOBILE CONTENT */}

 <div
  className={`
    flex-1
    min-w-0
    px-3
    ${index % 2 !== 0 ? "text-right pr-4" : "text-left pl-4"}
  `}

  >

    <div
      className={`
        flex
        items-center
        gap-1.5
        mb-1
        ${index % 2 !== 0 ? "justify-end" : "justify-start"}
      `}
    >

      <Flower2
        size={13}
        strokeWidth={1.2}
        className="text-[#C8A044]"
      />

      <span
        className="
          text-[8px]
          uppercase
          tracking-[0.18em]
          text-[#A77A24]
        "
      >
        Collection
      </span>

    </div>


    <h3
      className="
        text-lg
        text-[#18322F]
        truncate
      "
      style={{ fontFamily: "Cinzel, serif" }}
    >
      {category.name}
    </h3>


    <div
      className={`
        mt-1.5
        flex
        items-center
        gap-1.5
        text-[#A77A24]
        text-[10px]
        ${index % 2 !== 0 ? "justify-end" : "justify-start"}
      `}
    >

      <span>
        Explore Collection
      </span>

      <ArrowRight
        size={13}
        strokeWidth={1.4}
      />

    </div>

  </div>


  {/* MOBILE ARROW */}

  <div
    className="
      flex-shrink-0
      w-8
      h-8
      mr-1
      rounded-full
      border
      border-[#D9B566]
      flex
      items-center
      justify-center
      text-[#A77A24]
    "
  >
    <ArrowRight
      size={15}
      strokeWidth={1.4}
    />
  </div>

</Link>

          ))}

        </div>


        {/* VIEW ALL */}

        <div className="flex justify-center mt-9 md:mt-11">

          <Link
            to="/collections"
            className="
              inline-flex
              items-center
              gap-2.5
              px-6
              py-2.5
              rounded-full
              border
              border-[#D9B566]
              text-[#765C28]
              text-xs
              sm:text-sm
              transition-all
              duration-300
              hover:bg-[#D9A94A]
              hover:text-white
              hover:border-[#D9A94A]
            "
          >

            <span>View All Collections</span>

            <ArrowRight
              size={16}
              strokeWidth={1.4}
            />

          </Link>

        </div>

      </div>

    </section>
  );
}

export default Collections;