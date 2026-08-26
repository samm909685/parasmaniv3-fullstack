import { useState } from "react";
import {
  FiUploadCloud,
  FiImage,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";

function OurCraft() {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  return (
    <section className="bg-[#F8F5EE] py-16 sm:py-20 lg:py-24">

      {/* ================= HEADER ================= */}

      <div className="max-w-4xl mx-auto text-center px-5">

        <p
          className="uppercase tracking-[0.45em] text-[#C8A044] text-xs sm:text-sm"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          HAVE A DESIGN IN MIND?
        </p>

        <h2
          className="mt-4 text-3xl sm:text-4xl lg:text-5xl text-[#18322F] leading-tight"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Bring Your Jewellery
          <br className="hidden sm:block" />
          Idea To Life
        </h2>

        <div className="w-20 h-[2px] bg-[#D8B15C] mx-auto my-6"></div>

        <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base lg:text-lg leading-7">

          Have a jewellery design you love?
          Share a reference with us. Whether you want the
          same design, something similar, or a new design
          inspired by it, our team can help you find the
          right piece.

        </p>

      </div>


      {/* ================= REQUEST AREA ================= */}

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 mt-12 lg:mt-16">

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">


          {/* ================= LEFT - IMAGE ================= */}

          <div className="bg-white rounded-2xl border border-[#E4D8C2] p-5 sm:p-7 shadow-sm">

            <div className="mb-5">

              <p
                className="text-[#18322F] text-xl sm:text-2xl"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Share Your Reference
              </p>

              <p className="text-gray-500 text-sm mt-2">
                Upload an image of the jewellery design you are looking for.
              </p>

            </div>


            {/* Upload Area */}

            <label
              htmlFor="design-upload"
              className={`
                relative block w-full
                aspect-[4/3]
                rounded-xl
                border-2 border-dashed
                border-[#D8B15C]
                overflow-hidden
                cursor-pointer
                transition
                hover:bg-[#FBF8F1]
                ${
                  preview
                    ? "border-solid"
                    : ""
                }
              `}
            >

              {preview ? (

                <>
                  <img
                    src={preview}
                    alt="Reference design preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Preview Overlay */}

                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition flex items-center justify-center">

                    <div className="opacity-0 hover:opacity-100 bg-[#18322F] text-white px-5 py-2.5 rounded-full text-sm transition">
                      Change Image
                    </div>

                  </div>
                </>

              ) : (

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

                  <div className="w-16 h-16 rounded-full bg-[#F8F0E3] flex items-center justify-center mb-5">

                    <FiUploadCloud
                      className="text-[#C8A044]"
                      size={30}
                    />

                  </div>

                  <p className="text-[#18322F] font-medium text-base sm:text-lg">
                    Upload Your Design
                  </p>

                  <p className="text-gray-500 text-sm mt-2">
                    Click to choose an image
                  </p>

                  <p className="text-gray-400 text-xs mt-3">
                    JPG, JPEG or PNG
                  </p>

                </div>

              )}

            </label>

            <input
              id="design-upload"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleImageChange}
              className="hidden"
            />


            {/* Selected File */}

            {fileName && (

              <div className="flex items-center gap-3 mt-4 px-4 py-3 bg-[#F8F5EE] rounded-lg">

                <FiImage
                  className="text-[#C8A044] flex-shrink-0"
                  size={20}
                />

                <p className="text-sm text-gray-600 truncate">
                  {fileName}
                </p>

                <FiCheck
                  className="ml-auto text-[#18322F] flex-shrink-0"
                  size={18}
                />

              </div>

            )}

          </div>


          {/* ================= RIGHT - FORM ================= */}

          <div className="bg-white rounded-2xl border border-[#E4D8C2] p-5 sm:p-7 lg:p-8 shadow-sm">

            <div className="mb-6">

              <p
                className="text-[#18322F] text-xl sm:text-2xl"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Tell Us What You're Looking For
              </p>

              <p className="text-gray-500 text-sm mt-2">
                Tell us what you would like us to make or find for you.
              </p>

            </div>


            {/* Requirement */}

            <div className="mb-5">

              <label className="block text-sm font-medium text-[#18322F] mb-2">
                Your Requirement
              </label>

              <textarea
                rows="5"
                placeholder="For example: Do you have this design? If not, can you make something similar?"
                className="
                  w-full
                  rounded-xl
                  border border-[#DCD2C0]
                  bg-[#FCFAF6]
                  px-4 py-3
                  text-sm
                  text-gray-700
                  outline-none
                  resize-none
                  transition
                  focus:border-[#C8A044]
                  focus:ring-1
                  focus:ring-[#C8A044]
                "
              />

            </div>


            {/* Jewellery Type */}

            <div className="mb-5">

              <label className="block text-sm font-medium text-[#18322F] mb-2">
                Jewellery Type
              </label>

              <div className="relative">

                <select
                  className="
                    appearance-none
                    w-full
                    rounded-xl
                    border border-[#DCD2C0]
                    bg-[#FCFAF6]
                    px-4 py-3
                    text-sm
                    text-gray-700
                    outline-none
                    cursor-pointer
                    focus:border-[#C8A044]
                    focus:ring-1
                    focus:ring-[#C8A044]
                  "
                  defaultValue=""
                >

                  <option value="" disabled>
                    Select jewellery type
                  </option>

                  <option value="thushi">
                    Thushi
                  </option>

                  <option value="mala">
                    Mala
                  </option>

                  <option value="necklace">
                    Necklace
                  </option>

                  <option value="bangle">
                    Bangle
                  </option>

                  <option value="bracelet">
                    Bracelet
                  </option>

                  <option value="earrings">
                    Earrings
                  </option>

                  <option value="other">
                    Other
                  </option>

                </select>

                <FiChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={18}
                />

              </div>

            </div>


            {/* Name */}

            <div className="mb-5">

              <label className="block text-sm font-medium text-[#18322F] mb-2">
                Your Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="
                  w-full
                  rounded-xl
                  border border-[#DCD2C0]
                  bg-[#FCFAF6]
                  px-4 py-3
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-[#C8A044]
                  focus:ring-1
                  focus:ring-[#C8A044]
                "
              />

            </div>


            {/* WhatsApp */}

            <div className="mb-6">

              <label className="block text-sm font-medium text-[#18322F] mb-2">
                WhatsApp Number
              </label>

              <input
                type="tel"
                placeholder="Enter your WhatsApp number"
                className="
                  w-full
                  rounded-xl
                  border border-[#DCD2C0]
                  bg-[#FCFAF6]
                  px-4 py-3
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-[#C8A044]
                  focus:ring-1
                  focus:ring-[#C8A044]
                "
              />

            </div>


            {/* Submit */}

            <button
              type="button"
              className="
                w-full
                bg-[#18322F]
                hover:bg-[#244543]
                text-white
                py-3.5
                rounded-full
                text-sm
                sm:text-base
                transition
                duration-300
                shadow-sm
                hover:shadow-md
              "
            >
              Send Design Request →
            </button>


            {/* Note */}

            <p className="text-center text-gray-400 text-xs mt-4">
              Our team will contact you on WhatsApp regarding your request.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default OurCraft;