import { useState } from "react";
import {
  FiUploadCloud,
  FiImage,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";

function HowWeWork() {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    whatsapp_number: "",
    jewellery_type: "",
    request_type: "",
    requirement: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /* ==========================
     IMAGE CHANGE
  ========================== */

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, JPEG, PNG or WEBP image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10 MB.");
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    setError("");
    setSuccess("");
  };

  /* ==========================
     FORM CHANGE
  ========================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* ==========================
     SUBMIT
  ========================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!selectedFile) {
      setError("Please upload a reference design.");
      return;
    }

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.whatsapp_number.trim()) {
      setError("Please enter your WhatsApp number.");
      return;
    }

    const phone = formData.whatsapp_number.replace(/\D/g, "");

    if (phone.length < 10 || phone.length > 15) {
      setError("Please enter a valid WhatsApp number.");
      return;
    }

    if (!formData.jewellery_type) {
      setError("Please select a jewellery type.");
      return;
    }

    if (!formData.requirement.trim()) {
      setError("Please tell us what you are looking for.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name.trim());

      data.append(
        "whatsapp_number",
        formData.whatsapp_number.trim()
      );

      data.append(
        "jewellery_type",
        formData.jewellery_type
      );

      data.append(
        "request_type",
        formData.request_type
      );

      data.append(
        "requirement",
        formData.requirement.trim()
      );

      data.append(
        "reference_image",
        selectedFile
      );

      const response = await fetch(
        "https://api.parasmanijewelers.in/api/design-requests",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
          "Unable to submit your request."
        );
      }

      setSuccess(
        "Thank you! Your design request has been submitted successfully. Our team will contact you on WhatsApp shortly."
      );

      setFormData({
        name: "",
        whatsapp_number: "",
        jewellery_type: "",
        request_type: "",
        requirement: "",
      });

      setSelectedFile(null);
      setPreview(null);
      setFileName("");

    } catch (err) {
      console.error(
        "Design request error:",
        err
      );

      setError(
        err.message ||
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">

      {/* ==========================
          SECTION HEADER
      ========================== */}

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
          Share a reference with us. Whether you want
          the same design, something similar, or a new
          design inspired by it, our team can help you
          find the right piece.
        </p>

      </div>


      {/* ==========================
          REQUEST AREA
      ========================== */}

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 mt-12 lg:mt-16">

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">


          {/* ==========================
              LEFT — REFERENCE IMAGE
          ========================== */}

          <div className="bg-[#FCFAF6] rounded-2xl border border-[#E4D8C2] p-5 sm:p-7 shadow-sm">

            <div className="mb-5">

              <p
                className="text-[#18322F] text-xl sm:text-2xl"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Share Your Reference
              </p>

              <p className="text-gray-500 text-sm mt-2">
                Upload an image of the jewellery design you
                are looking for.
              </p>

            </div>


            {/* Upload Box */}

            <label
              htmlFor="design-upload"
              className={`
                relative block
                w-full
                aspect-[4/3]
                rounded-xl
                border-2 border-dashed
                border-[#D8B15C]
                overflow-hidden
                cursor-pointer
                transition
                hover:bg-[#F8F5EE]
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
                    JPG, JPEG, PNG or WEBP • Max 10 MB
                  </p>

                </div>

              )}

            </label>

            <input
              id="design-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />


            {/* Selected File */}

            {fileName && (

              <div className="flex items-center gap-3 mt-4 px-4 py-3 bg-white rounded-lg border border-[#E4D8C2]">

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


          {/* ==========================
              RIGHT — FORM
          ========================== */}

          <div className="bg-[#FCFAF6] rounded-2xl border border-[#E4D8C2] p-5 sm:p-7 lg:p-8 shadow-sm">

            <form onSubmit={handleSubmit}>

              <div className="mb-6">

                <p
                  className="text-[#18322F] text-xl sm:text-2xl"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Tell Us What You're Looking For
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  Tell us what you would like us to make
                  or find for you.
                </p>

              </div>


              {/* Requirement */}

              <div className="mb-5">

                <label className="block text-sm font-medium text-[#18322F] mb-2">
                  Your Requirement
                </label>

                <textarea
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  rows="4"
                  placeholder="For example: I want this type of Thushi but with a different pendant."
                  className="
                    w-full
                    rounded-xl
                    border border-[#DCD2C0]
                    bg-white
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
                    name="jewellery_type"
                    value={formData.jewellery_type}
                    onChange={handleChange}
                    className="
                      appearance-none
                      w-full
                      rounded-xl
                      border border-[#DCD2C0]
                      bg-white
                      px-4 py-3
                      text-sm
                      text-gray-700
                      outline-none
                      cursor-pointer
                      focus:border-[#C8A044]
                      focus:ring-1
                      focus:ring-[#C8A044]
                    "
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


              {/* Request Type */}

              <div className="mb-5">

                <label className="block text-sm font-medium text-[#18322F] mb-2">
                  What Would You Like?
                </label>

                <div className="relative">

                  <select
                    name="request_type"
                    value={formData.request_type}
                    onChange={handleChange}
                    className="
                      appearance-none
                      w-full
                      rounded-xl
                      border border-[#DCD2C0]
                      bg-white
                      px-4 py-3
                      text-sm
                      text-gray-700
                      outline-none
                      cursor-pointer
                      focus:border-[#C8A044]
                      focus:ring-1
                      focus:ring-[#C8A044]
                    "
                  >

                    <option value="">
                      Select an option
                    </option>

                    <option value="same">
                      I want the same design
                    </option>

                    <option value="similar">
                      I want something similar
                    </option>

                    <option value="inspired">
                      I want a new design inspired by this
                    </option>

                    <option value="suggest">
                      I'm not sure — please suggest
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="
                    w-full
                    rounded-xl
                    border border-[#DCD2C0]
                    bg-white
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
                  name="whatsapp_number"
                  value={formData.whatsapp_number}
                  onChange={handleChange}
                  placeholder="Enter your WhatsApp number"
                  className="
                    w-full
                    rounded-xl
                    border border-[#DCD2C0]
                    bg-white
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


              {/* Error */}

              {error && (

                <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>

              )}


              {/* Success */}

              {success && (

                <div className="mb-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>

              )}


              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-[#18322F]
                  hover:bg-[#244543]
                  disabled:opacity-60
                  disabled:cursor-not-allowed
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

                {loading
                  ? "Sending Request..."
                  : "Send Design Request →"}

              </button>


              <p className="text-center text-gray-400 text-xs mt-4">
                Our team will contact you on WhatsApp regarding your request.
              </p>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HowWeWork;