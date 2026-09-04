import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact enquiry:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-white text-[#18322F]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <Header />


      {/* =====================================================
          CONTACT TITLE
      ====================================================== */}

      <section className="px-5 sm:px-6 lg:px-8 pt-12 sm:pt-14 md:pt-16 pb-8 sm:pb-10">
        <div className="max-w-6xl mx-auto text-center">

          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#C8A044]">
            Parasmani Jewellers
          </p>

          <h1
            className="mt-3 text-4xl sm:text-5xl md:text-[50px] leading-tight text-[#18322F]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Contact Us
          </h1>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="w-10 h-px bg-[#D8B15C]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8B15C]" />
            <span className="w-10 h-px bg-[#D8B15C]" />
          </div>

          <p className="mt-4 text-sm sm:text-base text-[#52615E]">
            We&apos;d love to hear from you.
          </p>

        </div>
      </section>


      {/* =====================================================
          CONTACT CONTENT
      ====================================================== */}

      <section className="px-5 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24">

        <div className="max-w-5xl mx-auto">

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">


            {/* =================================================
                CONTACT INFORMATION
            ================================================== */}

            <div className="pt-2 md:pt-5">

              <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#C8A044]">
                Get In Touch
              </p>

              <h2
                className="mt-3 text-3xl sm:text-4xl text-[#18322F]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                We&apos;re Here For You
              </h2>

              <div className="w-12 h-px bg-[#D8B15C] mt-4 mb-6" />

              <p className="max-w-md text-sm sm:text-base leading-7 text-[#52615E]">
                For enquiries or to connect with us, feel free to reach out.
              </p>


              {/* Address */}

              <div className="mt-7 flex items-start gap-4">

                <FaMapMarkerAlt className="mt-1 text-[#C8A044] shrink-0" />

                <div>

                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#8D7850]">
                    Visit Us
                  </p>

                  <p className="mt-1 text-sm sm:text-base leading-6 text-[#18322F]">
                    Parasmani Jewellers
                    <br />
                    Kasar Galli
                    <br />
                    Kolhapur, Maharashtra
                  </p>

                </div>

              </div>


              {/* Phone */}

              <div className="mt-5 flex items-center gap-4">

                <FaPhoneAlt className="text-[#C8A044] shrink-0" />

                <div>

                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#8D7850]">
                    Phone
                  </p>

                  <a
                    href="tel:+919096856444"
                    className="mt-1 block text-sm sm:text-base text-[#18322F] hover:text-[#C8A044] transition"
                  >
                    +91 90968 56444
                  </a>

                </div>

              </div>


              {/* Email */}

              <div className="mt-5 flex items-center gap-4">

                <FaEnvelope className="text-[#C8A044] shrink-0" />

                <div>

                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#8D7850]">
                    Email
                  </p>

                  <a
                    href="mailto:info@parasmani.com"
                    className="mt-1 block text-sm sm:text-base text-[#18322F] hover:text-[#C8A044] transition break-all"
                  >
                    info@parasmani.com
                  </a>

                </div>

              </div>


              {/* WhatsApp */}

              <a
                href="https://wa.me/919096856444"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 mt-7 text-sm sm:text-base text-[#18322F] hover:text-[#C8A044] transition"
              >
                <FaWhatsapp className="text-[#25D366] text-xl" />
                Chat on WhatsApp
              </a>

            </div>


            {/* =================================================
                CONTACT FORM CARD
            ================================================== */}

            <div className="bg-[#F5F1E6] border border-[#D6C5A3] rounded-xl p-6 sm:p-7 md:p-8">

              <h2
                className="text-2xl sm:text-3xl text-[#18322F]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Send a Message
              </h2>

              <div className="w-10 h-px bg-[#D8B15C] mt-3 mb-6" />


              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* =================================================
                    NAME
                ================================================== */}

                <div>

                  <label
                    htmlFor="name"
                    className="block text-sm text-[#18322F] mb-1.5"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="
                      w-full
                      h-11
                      px-4
                      bg-white
                      border
                      border-[#D6C5A3]
                      rounded-md
                      text-sm
                      text-[#18322F]
                      placeholder:text-[#9A9A91]
                      outline-none
                      focus:border-[#18322F]
                      transition
                    "
                  />

                </div>


                {/* =================================================
                    PHONE
                ================================================== */}

                <div>

                  <label
                    htmlFor="phone"
                    className="block text-sm text-[#18322F] mb-1.5"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91"
                    className="
                      w-full
                      h-11
                      px-4
                      bg-white
                      border
                      border-[#D6C5A3]
                      rounded-md
                      text-sm
                      text-[#18322F]
                      placeholder:text-[#9A9A91]
                      outline-none
                      focus:border-[#18322F]
                      transition
                    "
                  />

                </div>


                {/* =================================================
                    EMAIL
                ================================================== */}

                <div>

                  <label
                    htmlFor="email"
                    className="block text-sm text-[#18322F] mb-1.5"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="
                      w-full
                      h-11
                      px-4
                      bg-white
                      border
                      border-[#D6C5A3]
                      rounded-md
                      text-sm
                      text-[#18322F]
                      placeholder:text-[#9A9A91]
                      outline-none
                      focus:border-[#18322F]
                      transition
                    "
                  />

                </div>


                {/* =================================================
                    MESSAGE
                ================================================== */}

                <div>

                  <label
                    htmlFor="message"
                    className="block text-sm text-[#18322F] mb-1.5"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    className="
                      w-full
                      px-4
                      py-3
                      bg-white
                      border
                      border-[#D6C5A3]
                      rounded-md
                      text-sm
                      text-[#18322F]
                      placeholder:text-[#9A9A91]
                      outline-none
                      resize-none
                      focus:border-[#18322F]
                      transition
                    "
                  />

                </div>


                {/* =================================================
                    SUCCESS MESSAGE
                ================================================== */}

                {submitted && (
                  <div className="bg-white border border-[#D6C5A3] rounded-md px-4 py-3">
                    <p className="text-sm text-[#18322F]">
                      Thank you. We&apos;ll get back to you soon.
                    </p>
                  </div>
                )}


                {/* =================================================
                    SUBMIT BUTTON
                ================================================== */}

                <button
                  type="submit"
                  className="
                    w-full
                    h-11
                    bg-[#18322F]
                    text-[#F8F5EE]
                    rounded-full
                    text-sm
                    tracking-wide
                    hover:bg-[#244842]
                    transition
                  "
                >
                  Send Message

                  <span className="ml-2 text-[#D8B15C]">
                    →
                  </span>

                </button>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

    </div>
  );
}

export default Contact;