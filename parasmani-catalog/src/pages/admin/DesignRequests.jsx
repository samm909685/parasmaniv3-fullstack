import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  Search,
  Eye,
  MessageCircle,
  RefreshCw,
  X,
  Image as ImageIcon,
  User,
  Phone,
  Gem,
  Clock,
  Trash2,
} from "lucide-react";

function DesignRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [deletingRequestId, setDeletingRequestId] =
  useState(null);

  // ==========================================
  // FETCH DESIGN REQUESTS
  // ==========================================

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
  "https://api.parasmanijewelers.in/api/design-requests"
);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load design requests."
        );
      }

      setRequests(
        Array.isArray(data)
          ? data
          : data.data || data.requests || []
      );
    } catch (error) {
      console.error("Design requests error:", error);

      setError(
        error.message || "Unable to load design requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredRequests = requests.filter((request) => {
    const searchText = `
      ${request.name || ""}
      ${request.whatsapp_number || ""}
      ${request.jewellery_type || ""}
      ${request.request_type || ""}
      ${request.requirement || ""}
      ${request.status || ""}
    `.toLowerCase();

    return searchText.includes(search.toLowerCase());
  });

  // ==========================================
  // IMAGE URL
  // ==========================================

 const getImageUrl = (image) => {
  if (!image) return null;

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `https://api.parasmanijewelers.in/${image.replace(
    /^\/+/,
    ""
  )}`;
};

  // ==========================================
  // WHATSAPP
  // ==========================================

  const openWhatsApp = (number) => {
    if (!number) return;

    let cleanNumber = number.toString().replace(/\D/g, "");

    if (cleanNumber.length === 10) {
      cleanNumber = `91${cleanNumber}`;
    }

    window.open(
      `https://wa.me/${cleanNumber}`,
      "_blank"
    );
  };

// ==========================================
// DELETE REQUEST
// ==========================================

const handleDeleteRequest = async (request) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete Request #${request.id}?`
  );

  if (!confirmed) return;

  try {
    setDeletingRequestId(request.id);

    const response = await fetch(
      `https://api.parasmanijewelers.in/api/design-requests/${request.id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete request."
      );
    }

    setRequests((prevRequests) =>
      prevRequests.filter(
        (item) => item.id !== request.id
      )
    );

    if (selectedRequest?.id === request.id) {
      setSelectedRequest(null);
    }
  } catch (error) {
    console.error(
      "Delete design request error:",
      error
    );

    alert(
      error.message ||
        "Unable to delete design request."
    );
  } finally {
    setDeletingRequestId(null);
  }
};



  // ==========================================
  // STATUS
  // ==========================================

  const getStatusStyle = (status) => {
    const value = (status || "new").toLowerCase();

    if (value === "new") {
      return "bg-[#FFF7E2] text-[#A77918]";
    }

    if (value === "contacted") {
      return "bg-blue-50 text-blue-700";
    }

    if (value === "in progress") {
      return "bg-purple-50 text-purple-700";
    }

    if (value === "completed") {
      return "bg-green-50 text-green-700";
    }

    return "bg-gray-100 text-gray-600";
  };

  // ==========================================
  // STATS
  // ==========================================

  const totalRequests = requests.length;

  const newRequests = requests.filter(
    (request) =>
      (request.status || "new").toLowerCase() === "new"
  ).length;

  const contactedRequests = requests.filter(
    (request) =>
      (request.status || "").toLowerCase() === "contacted"
  ).length;

  const completedRequests = requests.filter(
    (request) =>
      (request.status || "").toLowerCase() === "completed"
  ).length;

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <AdminLayout>

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="mb-8">

        <p
          className="uppercase tracking-[0.3em] text-[#C8A044] text-xs sm:text-sm"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          CUSTOMER ENQUIRIES
        </p>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-2">

          <div>

            <h1
              className="text-3xl md:text-4xl text-[#18322F]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Design Requests
            </h1>

            <p className="mt-2 text-gray-600">
              Manage jewellery design enquiries submitted by customers.
            </p>

          </div>

          <button
            onClick={fetchRequests}
            disabled={loading}
            className="
              flex
              items-center
              justify-center
              gap-2
              px-5
              py-2.5
              rounded-full
              border
              border-[#C8A044]
              bg-white
              text-[#18322F]
              hover:bg-[#F8F5EE]
              transition
              disabled:opacity-50
            "
          >

            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />

            Refresh

          </button>

        </div>

      </div>


      {/* ======================================
          STAT CARDS
      ====================================== */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

        {/* TOTAL */}

        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Total Requests
              </p>

              <h2 className="text-3xl font-bold mt-2 text-[#18322F]">
                {totalRequests}
              </h2>

            </div>

            <div className="text-[#C8A044]">
              <Gem size={28} />
            </div>

          </div>

        </div>


        {/* NEW */}

        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                New
              </p>

              <h2 className="text-3xl font-bold mt-2 text-[#18322F]">
                {newRequests}
              </h2>

            </div>

            <div className="text-[#C8A044]">
              <Clock size={28} />
            </div>

          </div>

        </div>


        {/* CONTACTED */}

        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Contacted
              </p>

              <h2 className="text-3xl font-bold mt-2 text-[#18322F]">
                {contactedRequests}
              </h2>

            </div>

            <div className="text-[#C8A044]">
              <MessageCircle size={28} />
            </div>

          </div>

        </div>


        {/* COMPLETED */}

        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Completed
              </p>

              <h2 className="text-3xl font-bold mt-2 text-[#18322F]">
                {completedRequests}
              </h2>

            </div>

            <div className="text-[#C8A044]">
              <Eye size={28} />
            </div>

          </div>

        </div>

      </div>


      {/* ======================================
          SEARCH
      ====================================== */}

      <div className="mt-8">

        <div className="relative">

          <Search
            size={19}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="
              Search customer, WhatsApp number, jewellery type...
            "
            className="
              w-full
              bg-white
              border
              border-gray-200
              rounded-xl
              pl-11
              pr-4
              py-3.5
              outline-none
              text-gray-700
              focus:border-[#C8A044]
              transition
            "
          />

        </div>

      </div>


      {/* ======================================
          ERROR
      ====================================== */}

      {error && (

        <div className="
          mt-5
          bg-red-50
          border
          border-red-200
          text-red-700
          rounded-xl
          px-5
          py-4
          text-sm
        ">
          {error}
        </div>

      )}


      {/* ======================================
          REQUEST TABLE
      ====================================== */}

      <div className="
        mt-8
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-100
        overflow-hidden
      ">

        <div className="p-5 sm:p-6 border-b">

          <h2
            className="text-2xl text-[#18322F]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Customer Requests
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {filteredRequests.length} request
            {filteredRequests.length !== 1 ? "s" : ""}
          </p>

        </div>


        {loading ? (

          <div className="py-20 text-center text-gray-500">
            Loading design requests...
          </div>

        ) : filteredRequests.length === 0 ? (

          <div className="py-20 text-center px-6">

            <ImageIcon
              size={42}
              className="mx-auto text-gray-300"
            />

            <p className="mt-4 text-gray-500">
              No design requests found.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead className="bg-[#F8F5EE]">

                <tr>

                  <th className="text-left p-5">
                    Customer
                  </th>

                  <th className="text-left p-5">
                    Jewellery
                  </th>

                  <th className="text-left p-5">
                    Request
                  </th>

                  <th className="text-left p-5">
                    Status
                  </th>

                  <th className="text-left p-5">
                    Date
                  </th>

                  <th className="text-right p-5">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredRequests.map((request) => (

                  <tr
                    key={request.id}
                    className="
                      border-t
                      hover:bg-gray-50
                      transition
                    "
                  >

                    {/* CUSTOMER */}

                    <td className="p-5">

                      <div className="flex items-center gap-3">

                        <div className="
                          w-10
                          h-10
                          rounded-full
                          bg-[#F8F5EE]
                          text-[#C8A044]
                          flex
                          items-center
                          justify-center
                          flex-shrink-0
                        ">
                          <User size={18} />
                        </div>

                        <div>

                          <p className="font-medium text-[#18322F]">
                            {request.name || "Unknown"}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {request.whatsapp_number || "-"}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* JEWELLERY */}

                    <td className="p-5">

                      <span className="text-gray-700 capitalize">
                        {request.jewellery_type || "-"}
                      </span>

                    </td>


                    {/* REQUEST */}

                    <td className="p-5">

                      <span className="text-gray-700 capitalize">
                        {request.request_type || "-"}
                      </span>

                    </td>


                    {/* STATUS */}

                    <td className="p-5">

                      <span
                        className={`
                          inline-flex
                          px-3
                          py-1.5
                          rounded-full
                          text-xs
                          font-medium
                          capitalize
                          ${getStatusStyle(request.status)}
                        `}
                      >
                        {request.status || "new"}
                      </span>

                    </td>


                    {/* DATE */}

                    <td className="p-5 text-sm text-gray-500">

                      {request.created_at
                        ? new Date(
                            request.created_at
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}

                    </td>


                    {/* ACTION */}

                    <td className="p-5">

                      <div className="flex justify-end gap-2">

                        <button
                         onClick={async () => {
  try {
    await fetch(
      `https://api.parasmanijewelers.in/api/design-requests/${request.id}/read`,
      {
        method: "PATCH",
      }
    );
  } catch (error) {
    console.error(
      "Failed to mark request as read:",
      error
    );
  }

  setSelectedRequest(request);
}}
                          title="View request"
                          className="
                            w-10
                            h-10
                            rounded-full
                            border
                            border-[#C8A044]
                            text-[#18322F]
                            flex
                            items-center
                            justify-center
                            hover:bg-[#F8F5EE]
                            transition
                          "
                        >
                          <Eye size={18} />
                        </button>


                        <button
                          onClick={() =>
                            openWhatsApp(
                              request.whatsapp_number
                            )
                          }
                          title="Open WhatsApp"
                          className="
                            w-10
                            h-10
                            rounded-full
                            bg-[#18322F]
                            text-white
                            flex
                            items-center
                            justify-center
                            hover:bg-[#244543]
                            transition
                          "
                        >
                          <MessageCircle size={18} />
                                                </button>

                        <button
                          onClick={() =>
                            handleDeleteRequest(request)
                          }
                          disabled={
                            deletingRequestId === request.id
                          }
                          title="Delete request"
                          className="
                            w-10
                            h-10
                            rounded-full
                            border
                            border-red-200
                            text-red-600
                            flex
                            items-center
                            justify-center
                            hover:bg-red-50
                            transition
                            disabled:opacity-50
                          "
                        >
                          <Trash2
                            size={18}
                            className={
                              deletingRequestId === request.id
                                ? "animate-pulse"
                                : ""
                            }
                          />
                        </button>
                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* ======================================
          VIEW REQUEST MODAL
      ====================================== */}

      {selectedRequest && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/50
            flex
            items-center
            justify-center
            p-4
          "
          onClick={() => setSelectedRequest(null)}
        >

          <div
            className="
              bg-white
              rounded-2xl
              w-full
              max-w-4xl
              max-h-[90vh]
              overflow-y-auto
              shadow-2xl
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}

            <div className="
              sticky
              top-0
              z-10
              bg-white
              border-b
              px-5
              sm:px-7
              py-4
              flex
              items-center
              justify-between
            ">

              <div>

                <p
                  className="text-xl sm:text-2xl text-[#18322F]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Design Request
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Request #{selectedRequest.id}
                </p>

              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="
                  w-9
                  h-9
                  rounded-full
                  hover:bg-gray-100
                  flex
                  items-center
                  justify-center
                  transition
                "
              >
                <X size={20} />
              </button>

            </div>


            {/* MODAL BODY */}

            <div className="
              grid
              lg:grid-cols-2
              gap-8
              p-5
              sm:p-7
            ">

              {/* IMAGE */}

              <div>

                <p className="font-medium text-[#18322F] mb-3">
                  Reference Design
                </p>

                {getImageUrl(
                  selectedRequest.reference_image
                ) ? (

                  <img
                    src={getImageUrl(
                      selectedRequest.reference_image
                    )}
                    alt="Customer reference design"
                    className="
                      w-full
                      aspect-square
                      object-cover
                      rounded-xl
                      border
                      border-gray-200
                    "
                  />

                ) : (

                  <div className="
                    w-full
                    aspect-square
                    rounded-xl
                    bg-[#F8F5EE]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-gray-400
                  ">

                    <ImageIcon size={42} />

                    <p className="mt-3 text-sm">
                      No reference image
                    </p>

                  </div>

                )}

              </div>


              {/* DETAILS */}

              <div>

                <div className="space-y-5">

                  {/* NAME */}

                  <div>

                    <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider">
                      <User size={14} />
                      Customer
                    </div>

                    <p className="mt-1 text-lg text-[#18322F]">
                      {selectedRequest.name || "-"}
                    </p>

                  </div>


                  {/* WHATSAPP */}

                  <div>

                    <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider">
                      <Phone size={14} />
                      WhatsApp
                    </div>

                    <p className="mt-1 text-[#18322F]">
                      {selectedRequest.whatsapp_number || "-"}
                    </p>

                  </div>


                  {/* JEWELLERY */}

                  <div>

                    <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider">
                      <Gem size={14} />
                      Jewellery Type
                    </div>

                    <p className="mt-1 text-gray-700 capitalize">
                      {selectedRequest.jewellery_type || "-"}
                    </p>

                  </div>


                  {/* REQUEST TYPE */}

                  <div>

                    <p className="text-gray-400 text-xs uppercase tracking-wider">
                      Request Type
                    </p>

                    <p className="mt-1 text-gray-700 capitalize">
                      {selectedRequest.request_type || "-"}
                    </p>

                  </div>


                  {/* REQUIREMENT */}

                  <div>

                    <p className="text-gray-400 text-xs uppercase tracking-wider">
                      Customer Requirement
                    </p>

                    <div className="
                      mt-2
                      bg-[#F8F5EE]
                      rounded-xl
                      p-4
                      text-gray-700
                      leading-6
                    ">
                      {selectedRequest.requirement ||
                        "No additional requirement provided."}
                    </div>

                  </div>


                  {/* STATUS */}

                  <div>

                    <p className="text-gray-400 text-xs uppercase tracking-wider">
                      Current Status
                    </p>

                    <span
                      className={`
                        inline-flex
                        mt-2
                        px-3
                        py-1.5
                        rounded-full
                        text-xs
                        font-medium
                        capitalize
                        ${getStatusStyle(
                          selectedRequest.status
                        )}
                      `}
                    >
                      {selectedRequest.status || "new"}
                    </span>

                  </div>


                  {/* WHATSAPP BUTTON */}

                  <button
                    onClick={() =>
                      openWhatsApp(
                        selectedRequest.whatsapp_number
                      )
                    }
                    className="
                      w-full
                      mt-2
                      bg-[#18322F]
                      hover:bg-[#244543]
                      text-white
                      py-3.5
                      rounded-full
                      flex
                      items-center
                      justify-center
                      gap-2
                      transition
                    "
                  >

                    <MessageCircle size={19} />

                    Contact on WhatsApp

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </AdminLayout>
  );
}

export default DesignRequests;