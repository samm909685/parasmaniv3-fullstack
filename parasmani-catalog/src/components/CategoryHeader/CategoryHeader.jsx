import { Link, useParams } from "react-router-dom";
import { FiChevronRight, FiSearch } from "react-icons/fi";

function CategoryHeader() {
  const { category } = useParams();

  const title = category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <section className="bg-[#F8F5EE] pt-14 pb-8">

      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}

        <div className="flex items-center gap-2 text-sm text-gray-500">

          <Link
            to="/"
            className="hover:text-[#18322F]"
          >
            Home
          </Link>

          <FiChevronRight />

          <Link
            to="/collections"
            className="hover:text-[#18322F]"
          >
            Collections
          </Link>

          <FiChevronRight />

          <span className="text-[#18322F] font-medium">
            {title}
          </span>

        </div>

        {/* Heading */}

        <h1
          className="mt-8 text-5xl text-[#18322F]"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          {title}
        </h1>

        <p className="mt-5 text-gray-600 max-w-2xl leading-8">
          Explore our handcrafted wholesale jewellery collection
          inspired by timeless Maharashtrian artistry.
        </p>

        {/* Search */}

        <div className="mt-10 relative max-w-md">

          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-full border border-[#D9D4C8] bg-white py-4 pl-14 pr-6 outline-none focus:border-[#18322F]"
          />

        </div>

      </div>

    </section>
  );
}

export default CategoryHeader;