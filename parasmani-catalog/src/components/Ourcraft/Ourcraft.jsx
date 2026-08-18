import craft from "../../assets/ourcraft.png";
import {
  GiNecklace,
  GiGoldBar,
} from "react-icons/gi";
import { MdTempleHindu } from "react-icons/md";
import { PiHandsPrayingLight } from "react-icons/pi";

function OurCraft() {
  return (
    <section className="bg-[#F8F5EE] overflow-hidden">

      {/* ================= HERO ================= */}

      <div className="relative h-[55vh] sm:h-[65vh] lg:h-[90vh] overflow-hidden">

        {/* Image */}

        <img
  src={craft}
  alt="Our Craft"
  className="absolute inset-0 w-full h-full object-cover object-[center_65%] md:object-[center_58%] transition duration-700"
/>

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/60"></div>

<div className="absolute inset-0 backdrop-blur-[3px]"></div>

        {/* Text */}

        <div className="relative z-20 flex h-full items-center justify-center -translate-y-10 md:-translate-y-14">

          <div className="text-center px-6">

            <p
              className="uppercase tracking-[0.45em] text-[#D8B15C] text-xs md:text-sm"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              OUR CRAFT
            </p>

            <div className="w-24 h-px bg-[#D8B15C] mx-auto my-6"></div>

            <h1
              className="text-white text-3xl sm:text-5xl lg:text-7xl leading-tight"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Traditional Gold
              <br />
              Wax Bead Jewellery
            </h1>

          </div>

        </div>

        {/* SVG */}

        <div className="absolute bottom-[-4px] left-0 w-full leading-none overflow-hidden z-30">

          <svg
  viewBox="0 0 1440 220"
  preserveAspectRatio="none"
  className="block w-full h-[90px] md:h-[150px]"
>

        <path
  fill="#F8F5EE"
  d="
    M0,140
    C220,60
    430,180
    720,120
    C980,70
    1180,170
    1440,100
    L1440,220
    L0,220
    Z"
/>

          </svg>

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <div>

            <p
              className="uppercase tracking-[0.35em] text-[#C8A044] text-sm"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Heritage Craftsmanship
            </p>

            <h2
              className="mt-5 text-4xl lg:text-6xl text-[#18322F] leading-tight"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Jewellery Crafted
              <br />
              With Tradition
            </h2>

            <div className="w-24 h-[2px] bg-[#C8A044] my-8"></div>

            <p className="text-gray-600 text-lg leading-9">

              Every necklace, thushi and traditional
              wax bead ornament reflects generations
              of dedication, precision and artistry.

              Our jewellery is handcrafted to preserve
              Maharashtrian heritage while creating
              timeless elegance.

            </p>

            <button className="mt-10 bg-[#18322F] hover:bg-[#244543] transition text-white px-10 py-4 rounded-full">

              Explore Our Craft →

            </button>

          </div>
                    {/* RIGHT */}

          <div className="grid grid-cols-2 gap-x-10 gap-y-14">

            {[
              {
                icon: <PiHandsPrayingLight />,
                title: "Handcrafted",
                desc: "Every jewellery piece is carefully handcrafted by skilled artisans.",
              },
              {
                icon: <GiGoldBar />,
                title: "Traditional",
                desc: "Inspired by timeless Maharashtrian jewellery traditions.",
              },
              {
                icon: <GiNecklace />,
                title: "Authentic",
                desc: "Designed with genuine craftsmanship and attention to detail.",
              },
              {
                icon: <MdTempleHindu />,
                title: "Heritage",
                desc: "Celebrating generations of culture and traditional artistry.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group text-center px-4"
              >

                <div className="flex justify-center">

                  <div className="w-20 h-20 rounded-full border border-[#D8B15C] flex items-center justify-center group-hover:bg-[#18322F] transition duration-300">

                    <div className="text-[#D8B15C] text-4xl group-hover:text-white transition">

                      {item.icon}

                    </div>

                  </div>

                </div>

                <h3
                  className="mt-6 text-2xl text-[#18322F]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  {item.title}
                </h3>

                <div className="w-10 h-[2px] bg-[#D8B15C] mx-auto my-5"></div>

                <p className="text-gray-600 leading-7 text-sm">

                  {item.desc}

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default OurCraft;