import {
  FaImage,
  FaComments,
  FaHammer,
  FaTruck,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaImage />,
    title: "Share Your Design",
    description:
      "Send us product images, reference designs or your custom jewellery requirements.",
  },
  {
    icon: <FaComments />,
    title: "Discuss Requirements",
    description:
      "We finalize the design, weight, purity, pricing and delivery timeline together.",
  },
  {
    icon: <FaHammer />,
    title: "Craftsmanship",
    description:
      "Our experienced artisans carefully manufacture every jewellery piece with precision.",
  },
  {
    icon: <FaTruck />,
    title: "Delivery",
    description:
      "The finished jewellery is securely packed and delivered to your showroom.",
  },
];

function HowWeWork() {
  return (
    <section className="bg-white py-24">

      <div className="max-w-6xl mx-auto px-6">

        <p
          className="text-center uppercase tracking-[0.4em] text-[#C8A044] text-sm"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          How We Work
        </p>

        <h2
          className="text-center text-4xl md:text-6xl mt-4 text-[#18322F]"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          From Design
          <br />
          To Delivery
        </h2>

        <p className="text-center max-w-3xl mx-auto mt-8 text-gray-600 leading-8">

          We work closely with jewellery retailers to transform ideas into
          beautifully crafted traditional gold jewellery.

        </p>

        <div className="mt-20 relative">

          {/* Center Line */}

          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-[#D8B15C]"></div>

          <div className="space-y-16">

            {steps.map((step, index) => (

              <div
                key={index}
                className={`grid md:grid-cols-2 gap-10 items-center ${
                  index % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >

                <div
                  className={`${
                    index % 2 === 0
                      ? "md:text-right"
                      : "md:text-left"
                  }`}
                >
                  <h3
                    className="text-3xl text-[#18322F]"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    {step.title}
                  </h3>

                  <p className="mt-5 text-gray-600 leading-8">
                    {step.description}
                  </p>
                </div>

                <div className="flex justify-center">

                  <div className="w-20 h-20 rounded-full bg-[#18322F] text-[#D8B15C] text-3xl flex items-center justify-center border-4 border-[#F8F5EE] shadow-lg">

                    {step.icon}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default HowWeWork;