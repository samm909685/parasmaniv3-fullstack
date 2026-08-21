import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  isFavorite,
  toggleFavorite,
} from "../../utils/favorites";

function ProductCard({ product }) {
  const [favorite, setFavorite] = useState(
    isFavorite(product.id)
  );

  const handleFavorite = () => {
    const newStatus = toggleFavorite(product.id);
    setFavorite(newStatus);
  };

  return (
    <div>
      {/* Product Image */}

      <div className="overflow-hidden rounded-3xl">
        <img
          src={product.featured_image}
          alt={product.name}
          className="w-full aspect-square object-cover object-center rounded-3xl hover:scale-105 transition duration-700"
        />
      </div>

      {/* Product Information */}

      <div className="mt-5 flex justify-between items-start">
        <div>

          <p className="text-sm text-[#C8A044] uppercase tracking-widest">
            {product.product_code || "Jewellery"}
          </p>

          <h3
            className="mt-2 text-2xl text-[#18322F]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            {product.name}
          </h3>

          <p className="mt-3 text-gray-500">
            {product.description}
          </p>

        </div>

        {/* Favorite */}

        <button
          onClick={handleFavorite}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
         className={`text-[25px] transition ${
  favorite
    ? "text-[#5F817B]"
    : "text-[#5F817B] hover:text-[#18322F]"
}`}
        >
          {favorite ? <FaHeart /> : <FaRegHeart />}
        </button>

      </div>

      {/* Details */}

      <Link
        to={`/product/${product.id}`}
        className="inline-block mt-4 border border-[#18322F] px-5 py-2 rounded-full text-sm hover:bg-[#18322F] hover:text-white transition"
      >
        View Details →
      </Link>

    </div>
  );
}

export default ProductCard;