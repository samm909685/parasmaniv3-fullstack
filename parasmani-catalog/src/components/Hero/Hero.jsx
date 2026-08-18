import heroBackground from "../../assets/hero-background.png";

function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        min-h-[465px]
        sm:min-h-[520px]
        md:min-h-[650px]
        flex
        items-center
      "
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* Soft Background Overlay */}
      <div className="absolute inset-0 bg-[#F8F0E3]/70" />

      {/* Hero Content */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-6xl
          mx-auto
          px-5
          sm:px-6
          py-10
          sm:py-14
          md:py-24
          text-center
        "
      >
        {/* Legacy */}
        <p
          className="
            text-[#C8A044]
            uppercase
            tracking-[0.25em]
            sm:tracking-[0.35em]
            text-[10px]
            sm:text-sm
            md:text-base
            mb-4
            sm:mb-5
          "
        >
          Legacy Since 1965
        </p>

        {/* Main Heading */}
        <h1
          className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            text-[#1F1F1F]
            leading-[1.15]
          "
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Timeless Jewellery
        </h1>

        {/* Gold Heading */}
        <h2
          className="
            mt-2
            sm:mt-3
            md:mt-4
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            text-[#C8A044]
            leading-[1.15]
          "
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Crafted For Generations
        </h2>

        {/* Description */}
        <p
          className="
            mt-5
            sm:mt-7
            md:mt-8
            text-gray-600
            text-sm
            sm:text-base
            md:text-lg
            max-w-3xl
            mx-auto
            leading-6
            sm:leading-7
            md:leading-8
            px-2
            sm:px-0
          "
        >
          Discover handcrafted jewellery that blends tradition,
          elegance, and timeless craftsmanship. Every creation
          reflects the trust and legacy of Parasmani Jewellers
          since 1965.
        </p>

        {/* Buttons */}
        <div
          className="
            mt-7
            sm:mt-10
            flex
            flex-col
            sm:flex-row
            justify-center
            items-center
            gap-3
            sm:gap-4
          "
        >
          <button
            className="
              w-full
              sm:w-auto
              bg-[#1F3332]
              text-white
              px-8
              md:px-10
              py-3
              md:py-4
              rounded-full
              hover:bg-[#294443]
              transition
              duration-300
            "
          >
            Explore Collection
          </button>

          <button
            className="
              w-full
              sm:w-auto
              border
              border-[#1F3332]
              text-[#1F3332]
              px-8
              md:px-10
              py-3
              md:py-4
              rounded-full
              hover:bg-[#1F3332]
              hover:text-white
              transition
              duration-300
            "
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;