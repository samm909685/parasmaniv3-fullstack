import family from "../../assets/family.jpg";
import { Link } from "react-router-dom";

function Legacy() {
  return (
    <section className="bg-[#F8F0E3] py-20 md:py-28">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Image */}

          <div className="overflow-hidden rounded-3xl shadow-lg">

            <img
              src={family}
              alt="Parasmani Jewellers Legacy"
              className="w-full h-[350px] md:h-[500px] object-cover"
            />

          </div>

          {/* Content */}

          <div>

            <p className="uppercase tracking-[0.35em] text-[#C8A044] text-sm">
              Since 1965
            </p>

            <h2
              className="mt-4 text-4xl md:text-5xl text-[#1F1F1F]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Four Generations
              <br />
              of Trust
            </h2>

            <p className="mt-8 text-gray-600 leading-8 text-lg">
              For over six decades, Parasmani Jewellers has been
              a trusted name for timeless craftsmanship,
              purity, and honest relationships.

              Every jewellery piece reflects our commitment
              to quality and the trust passed down through
              generations.
            </p>

            <Link
              to="/about"
              className="inline-flex mt-10 border border-[#1F3332] px-8 py-3 rounded-full hover:bg-[#1F3332] hover:text-white transition"
            >
              Read Our Story →
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Legacy;