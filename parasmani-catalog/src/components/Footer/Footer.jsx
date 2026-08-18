import logo from "../../assets/logo.png";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#18322F] text-[#F8F5EE]">

      {/* Top */}

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">

        <div className="grid lg:grid-cols-3 gap-14">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-4">

              <img
                src={logo}
                alt="Parasmani Jewellers"
                className="w-16 h-16 rounded-sm"
              />

              <div>

                <h2
                  className="text-3xl text-[#D8B15C]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  PARASMANI
                </h2>

                <p
                  className="tracking-[0.3em] text-sm"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  JEWELLERS
                </p>

              </div>

            </div>

            <p className="mt-8 leading-8 text-[#D9D5CD]">

              Wholesale Traditional Gold Jewellery
              <br />
              Custom Manufacturing
              <br />
              Traditional Maharashtrian Designs

            </p>

          </div>

          {/* Explore */}

          <div>

            <h3
              className="text-2xl text-[#D8B15C]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Explore
            </h3>

            <div className="w-16 h-[2px] bg-[#D8B15C] my-5"></div>

            <div className="flex flex-col gap-4">

              <Link to="/">Home</Link>
              <Link to="/collections">Collections</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3
              className="text-2xl text-[#D8B15C]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Contact
            </h3>

            <div className="w-16 h-[2px] bg-[#D8B15C] my-5"></div>

            <div className="space-y-5">

              <div className="flex gap-4">

                <FaMapMarkerAlt className="text-[#D8B15C] mt-1" />

                <p>
                  Parasmani Jewellers
                  <br />
                  Kasar Galli,
                  <br />
                  Kolhapur, Maharashtra
                </p>

              </div>

              <div className="flex items-center gap-4">

                <FaPhoneAlt className="text-[#D8B15C]" />

                <p>+91 90968 56444</p>

              </div>

              <div className="flex items-center gap-4">

                <FaEnvelope className="text-[#D8B15C]" />

                <p>info@parasmani.com</p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Divider */}

      <div className="border-t border-[#30504B]"></div>

      {/* Bottom */}

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-sm text-[#D9D5CD] text-center md:text-left">

            © 2026 Parasmani Jewellers. All Rights Reserved.

          </p>

          <div className="flex items-center gap-5">

            <button className="w-11 h-11 rounded-full border border-[#D8B15C] flex items-center justify-center hover:bg-[#D8B15C] hover:text-[#18322F] transition">

              <FaInstagram />

            </button>

            <button className="w-11 h-11 rounded-full border border-[#D8B15C] flex items-center justify-center hover:bg-[#D8B15C] hover:text-[#18322F] transition">

              <FaFacebookF />

            </button>

            <button className="w-11 h-11 rounded-full border border-[#D8B15C] flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition">

              <FaWhatsapp />

            </button>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;