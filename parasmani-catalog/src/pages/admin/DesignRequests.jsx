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
  CheckCircle,
} from "lucide-react";


/* =========================================================
   API
========================================================= */

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api.parasmanijewelers.in";


/* =========================================================
   AUTH TOKEN
========================================================= */

const getToken = () =>
  localStorage.getItem("parasmani_admin_token");


const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});


/* =========================================================
   DESIGN REQUESTS PAGE
========================================================= */

function DesignRequests() {

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const [deletingRequestId, setDeletingRequestId] =
    useState(null);

  const [updatingStatusId, setUpdatingStatusId] =
    useState(null);


  /* =======================================================
     FETCH DESIGN REQUESTS
  ======================================================= */

  const fetchRequests = async () => {

    try {

      setLoading(true);
      setError("");


      const token = getToken();


      if (!token) {

        throw new Error(
          "Authentication required. Please login again."
        );

      }


      const response = await fetch(
        `${API_URL}/api/design-requests`,
        {
          method: "GET",
          headers: authHeaders(),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        if (response.status === 401) {

          localStorage.removeItem(
            "parasmani_admin_token"
          );

          localStorage.removeItem(
            "parasmani_admin"
          );

          throw new Error(
            "Authentication expired. Please login again."
          );

        }


        throw new Error(
          data.message ||
            "Failed to load design requests."
        );

      }


      setRequests(
        Array.isArray(data)
          ? data
          : Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.requests)
          ? data.requests
          : []
      );

    } catch (error) {

      console.error(
        "Design requests error:",
        error
      );


      setError(
        error.message ||
          "Unable to load design requests."
      );

    } finally {

      setLoading(false);

    }

  };


  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {

    fetchRequests();

  }, []);


  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredRequests =
    requests.filter((request) => {

      const searchText = `
        ${request.name || ""}
        ${request.whatsapp_number || ""}
        ${request.jewellery_type || ""}
        ${request.request_type || ""}
        ${request.requirement || ""}
        ${request.status || ""}
      `.toLowerCase();


      return searchText.includes(
        search.toLowerCase()
      );

    });


  /* =======================================================
     STATUS LABEL
  ======================================================= */

  const getStatusLabel = (status) => {

    const value =
      (status || "new").toLowerCase();


    if (value === "in_progress") {
      return "In Progress";
    }


    if (value === "new") {
      return "New";
    }


    if (value === "contacted") {
      return "Contacted";
    }


    if (value === "completed") {
      return "Completed";
    }


    if (value === "cancelled") {
      return "Cancelled";
    }


    return status || "New";

  };


  /* =======================================================
     STATUS STYLE
  ======================================================= */

  const getStatusStyle = (status) => {

    const value =
      (status || "new").toLowerCase();


    if (value === "new") {

      return "bg-[#FFF7E2] text-[#A77918]";

    }


    if (value === "contacted") {

      return "bg-blue-50 text-blue-700";

    }


    if (
      value === "in_progress" ||
      value === "in progress"
    ) {

      return "bg-purple-50 text-purple-700";

    }


    if (value === "completed") {

      return "bg-green-50 text-green-700";

    }


    if (value === "cancelled") {

      return "bg-red-50 text-red-700";

    }


    return "bg-gray-100 text-gray-600";

  };


  /* =======================================================
     MARK REQUEST AS READ
  ======================================================= */

  const markAsRead = async (request) => {

    if (!request?.id) {
      return;
    }


    try {

      const token = getToken();


      if (!token) {

        throw new Error(
          "Authentication required. Please login again."
        );

      }


      const response = await fetch(
        `${API_URL}/api/design-requests/${request.id}/read`,
        {
          method: "PATCH",
          headers: authHeaders(),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        if (response.status === 401) {

          throw new Error(
            "Authentication expired. Please login again."
          );

        }


        throw new Error(
          data.message ||
            "Failed to mark request as read."
        );

      }


      /*
        Update local request immediately
        so the UI does not need to reload.
      */

      setRequests((previous) =>
        previous.map((item) =>
          item.id === request.id
            ? {
                ...item,
                is_read: 1,
                read: 1,
              }
            : item
        )
      );


      /*
        Update selected request too.
      */

      if (
        selectedRequest?.id ===
        request.id
      ) {

        setSelectedRequest((previous) => ({
          ...previous,
          is_read: 1,
          read: 1,
        }));

      }

    } catch (error) {

      console.error(
        "Mark as read error:",
        error
      );

      /*
        Don't show an annoying alert
        for this background action.
      */

    }

  };


  /* =======================================================
     OPEN REQUEST
  ======================================================= */

  const openRequest = async (request) => {

    setSelectedRequest(request);


    /*
      Mark it as read when opened.
    */

    if (
      request.is_read === 0 ||
      request.is_read === false ||
      request.read === 0 ||
      request.read === false
    ) {

      await markAsRead(request);

    }

  };


  /* =======================================================
     UPDATE STATUS
  ======================================================= */

  const updateStatus = async (
    request,
    newStatus
  ) => {

    if (!request?.id) {
      return;
    }


    try {

      setUpdatingStatusId(
        request.id
      );


      const token = getToken();


      if (!token) {

        throw new Error(
          "Authentication required. Please login again."
        );

      }


      const response = await fetch(
        `${API_URL}/api/design-requests/${request.id}/status`,
        {
          method: "PUT",

          headers: {
            ...authHeaders(),
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        if (response.status === 401) {

          throw new Error(
            "Authentication expired. Please login again."
          );

        }


        throw new Error(
          data.message ||
            "Failed to update status."
        );

      }


      /*
        Update request in table.
      */

      setRequests((previous) =>
        previous.map((item) =>
          item.id === request.id
            ? {
                ...item,
                status: newStatus,
              }
            : item
        )
      );


      /*
        Update currently opened request.
      */

      setSelectedRequest((previous) => {

        if (
          !previous ||
          previous.id !== request.id
        ) {

          return previous;

        }


        return {
          ...previous,
          status: newStatus,
        };

      });

    } catch (error) {

      console.error(
        "Update status error:",
        error
      );


      alert(
        error.message ||
          "Unable to update status."
      );

    } finally {

      setUpdatingStatusId(null);

    }

  };


  /* =======================================================
     DELETE REQUEST
  ======================================================= */

  const handleDeleteRequest = async (
    request
  ) => {

    if (!request?.id) {
      return;
    }


    const confirmed =
      window.confirm(
        `Are you sure you want to delete Request #${request.id}?`
      );


    if (!confirmed) {
      return;
    }


    try {

      setDeletingRequestId(
        request.id
      );


      const token = getToken();


      if (!token) {

        throw new Error(
          "Authentication required. Please login again."
        );

      }


      const response = await fetch(
        `${API_URL}/api/design-requests/${request.id}`,
        {
          method: "DELETE",
          headers: authHeaders(),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        if (response.status === 401) {

          throw new Error(
            "Authentication expired. Please login again."
          );

        }


        throw new Error(
          data.message ||
            "Failed to delete request."
        );

      }


      /*
        Remove from UI immediately.
      */

      setRequests((previous) =>
        previous.filter(
          (item) =>
            item.id !== request.id
        )
      );


      /*
        Close modal if this request
        was currently open.
      */

      if (
        selectedRequest?.id ===
        request.id
      ) {

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


  /* =======================================================
     IMAGE URL
  ======================================================= */

  const getImageUrl = (image) => {

    if (!image) {
      return null;
    }


    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {

      return image;

    }


    return `${API_URL}/${image.replace(
      /^\/+/,
      ""
    )}`;

  };


  /* =======================================================
     WHATSAPP
  ======================================================= */

  const openWhatsApp = (number) => {

    if (!number) {
      return;
    }


    let cleanNumber =
      number
        .toString()
        .replace(/\D/g, "");


    if (
      cleanNumber.length === 10
    ) {

      cleanNumber =
        `91${cleanNumber}`;

    }


    window.open(
      `https://wa.me/${cleanNumber}`,
      "_blank"
    );

  };


  /* =======================================================
     PHONE
  ======================================================= */

  const callCustomer = (number) => {

    if (!number) {
      return;
    }


    window.location.href =
      `tel:${number}`;

  };


  /* =======================================================
     STATS
  ======================================================= */

  const totalRequests =
    requests.length;


  const newRequests =
    requests.filter(
      (request) =>
        (
          request.status ||
          "new"
        ).toLowerCase() === "new"
    ).length;


  const contactedRequests =
    requests.filter(
      (request) =>
        (
          request.status ||
          ""
        ).toLowerCase() ===
        "contacted"
    ).length;


  const completedRequests =
    requests.filter(
      (request) =>
        (
          request.status ||
          ""
        ).toLowerCase() ===
        "completed"
    ).length;


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (
      <AdminLayout>

        <div className="
          min-h-[60vh]
          flex
          items-center
          justify-center
        ">

          <div className="text-center">

            <div
              className="
                w-10
                h-10
                border-4
                border-[#18322F]/20
                border-t-[#18322F]
                rounded-full
                animate-spin
                mx-auto
              "
            />

            <p className="
              mt-4
              text-[#18322F]
              font-medium
            ">
              Loading design requests...
            </p>

          </div>

        </div>

      </AdminLayout>
    );

  }


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <AdminLayout>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8">

        <p
          className="
            uppercase
            tracking-[0.3em]
            text-[#C8A044]
            text-xs
            sm:text-sm
          "
          style={{
            fontFamily:
              "Cinzel, serif",
          }}
        >
          CUSTOMER ENQUIRIES
        </p>


        <div className="
          flex
          flex-col
          sm:flex-row
          sm:items-end
          sm:justify-between
          gap-4
          mt-2
        ">

          <div>

            <h1
              className="
                text-3xl
                md:text-4xl
                text-[#18322F]
              "
              style={{
                fontFamily:
                  "Cinzel, serif",
              }}
            >
              Design Requests
            </h1>


            <p className="
              mt-2
              text-gray-600
            ">
              Manage jewellery design enquiries
              submitted by customers.
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
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh

          </button>

        </div>

      </div>


      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="
        grid
        grid-cols-2
        xl:grid-cols-4
        gap-4
        sm:gap-6
      ">

        {/* TOTAL */}

        <div className="
          bg-white
          rounded-2xl
          p-5
          sm:p-6
          shadow-sm
          border
          border-gray-100
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-gray-500
                text-sm
              ">
                Total Requests
              </p>


              <h2 className="
                text-3xl
                font-bold
                mt-2
                text-[#18322F]
              ">
                {totalRequests}
              </h2>

            </div>


            <div className="
              text-[#C8A044]
            ">
              <Gem size={28} />
            </div>

          </div>

        </div>


        {/* NEW */}

        <div className="
          bg-white
          rounded-2xl
          p-5
          sm:p-6
          shadow-sm
          border
          border-gray-100
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-gray-500
                text-sm
              ">
                New
              </p>


              <h2 className="
                text-3xl
                font-bold
                mt-2
                text-[#18322F]
              ">
                {newRequests}
              </h2>

            </div>


            <div className="
              text-[#C8A044]
            ">
              <Clock size={28} />
            </div>

          </div>

        </div>


        {/* CONTACTED */}

        <div className="
          bg-white
          rounded-2xl
          p-5
          sm:p-6
          shadow-sm
          border
          border-gray-100
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-gray-500
                text-sm
              ">
                Contacted
              </p>


              <h2 className="
                text-3xl
                font-bold
                mt-2
                text-[#18322F]
              ">
                {contactedRequests}
              </h2>

            </div>


            <div className="
              text-[#C8A044]
            ">
              <MessageCircle
                size={28}
              />
            </div>

          </div>

        </div>


        {/* COMPLETED */}

        <div className="
          bg-white
          rounded-2xl
          p-5
          sm:p-6
          shadow-sm
          border
          border-gray-100
        ">

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-gray-500
                text-sm
              ">
                Completed
              </p>


              <h2 className="
                text-3xl
                font-bold
                mt-2
                text-[#18322F]
              ">
                {completedRequests}
              </h2>

            </div>


            <div className="
              text-[#C8A044]
            ">
              <CheckCircle
                size={28}
              />
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          SEARCH
      ===================================================== */}

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
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search customer, WhatsApp number, jewellery type..."
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


      {/* =====================================================
          ERROR
      ===================================================== */}

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


      {/* =====================================================
          CUSTOMER REQUESTS
      ===================================================== */}

      <div className="
        mt-8
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-100
        overflow-hidden
      ">

        <div className="
          p-5
          sm:p-6
          border-b
        ">

          <h2
            className="
              text-2xl
              text-[#18322F]
            "
            style={{
              fontFamily:
                "Cinzel, serif",
            }}
          >
            Customer Requests
          </h2>


          <p className="
            text-sm
            text-gray-500
            mt-1
          ">
            {filteredRequests.length} request
            {filteredRequests.length !== 1
              ? "s"
              : ""}
          </p>

        </div>


        {/* =================================================
            EMPTY
        ================================================= */}

        {filteredRequests.length === 0 ? (

          <div className="
            py-20
            text-center
            px-6
          ">

            <ImageIcon
              size={48}
              className="
                mx-auto
                text-gray-300
              "
            />


            <p className="
              mt-4
              text-gray-500
            ">
              {search
                ? "No requests match your search."
                : "No design requests found."}
            </p>

          </div>

        ) : (

          <div className="
            overflow-x-auto
          ">

            <table className="
              w-full
              min-w-[900px]
            ">

              <thead className="
                bg-[#F8F5EE]
              ">

                <tr>

                  <th className="
                    text-left
                    p-5
                  ">
                    Customer
                  </th>


                  <th className="
                    text-left
                    p-5
                  ">
                    Jewellery
                  </th>


                  <th className="
                    text-left
                    p-5
                  ">
                    Request
                  </th>


                  <th className="
                    text-left
                    p-5
                  ">
                    Status
                  </th>


                  <th className="
                    text-left
                    p-5
                  ">
                    Date
                  </th>


                  <th className="
                    text-right
                    p-5
                  ">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredRequests.map(
                  (request) => (

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

                        <div className="
                          flex
                          items-center
                          gap-3
                        ">

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

                            <p className="
                              font-medium
                              text-[#18322F]
                            ">
                              {request.name ||
                                "Unknown"}
                            </p>


                            <p className="
                              text-xs
                              text-gray-500
                              mt-1
                            ">
                              {request.whatsapp_number ||
                                "-"}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* JEWELLERY */}

                      <td className="p-5">

                        <span className="
                          text-gray-700
                          capitalize
                        ">
                          {request.jewellery_type ||
                            "-"}
                        </span>

                      </td>


                      {/* REQUEST */}

                      <td className="p-5">

                        <span className="
                          text-gray-700
                          capitalize
                        ">
                          {request.request_type ||
                            "-"}
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
                            ${getStatusStyle(
                              request.status
                            )}
                          `}
                        >
                          {getStatusLabel(
                            request.status
                          )}
                        </span>

                      </td>


                      {/* DATE */}

                      <td className="
                        p-5
                        text-sm
                        text-gray-500
                      ">

                        {request.created_at
                          ? new Date(
                              request.created_at
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "-"}

                      </td>


                      {/* ACTION */}

                      <td className="p-5">

                        <div className="
                          flex
                          justify-end
                          gap-2
                        ">

                          {/* VIEW */}

                          <button
                            onClick={() =>
                              openRequest(
                                request
                              )
                            }
                            className="
                              w-10
                              h-10
                              rounded-full
                              bg-[#F8F5EE]
                              text-[#18322F]
                              flex
                              items-center
                              justify-center
                              hover:bg-[#EDE5D5]
                              transition
                            "
                            title="View request"
                          >

                            <Eye size={18} />

                          </button>


                          {/* WHATSAPP */}

                          <button
                            onClick={() =>
                              openWhatsApp(
                                request.whatsapp_number
                              )
                            }
                            className="
                              w-10
                              h-10
                              rounded-full
                              bg-[#F8F5EE]
                              text-[#18322F]
                              flex
                              items-center
                              justify-center
                              hover:bg-[#EDE5D5]
                              transition
                            "
                            title="WhatsApp customer"
                          >

                            <MessageCircle
                              size={18}
                            />

                          </button>


                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDeleteRequest(
                                request
                              )
                            }
                            disabled={
                              deletingRequestId ===
                              request.id
                            }
                            className="
                              w-10
                              h-10
                              rounded-full
                              bg-red-50
                              text-red-600
                              flex
                              items-center
                              justify-center
                              hover:bg-red-100
                              transition
                              disabled:opacity-50
                            "
                            title="Delete request"
                          >

                            {deletingRequestId ===
                            request.id ? (

                              <RefreshCw
                                size={17}
                                className="animate-spin"
                              />

                            ) : (

                              <Trash2
                                size={17}
                              />

                            )}

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =====================================================
          REQUEST DETAIL MODAL
      ===================================================== */}

      {selectedRequest && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/50
            flex
            items-center
            justify-center
            p-4
          "
          onClick={() =>
            setSelectedRequest(null)
          }
        >

          <div
            className="
              bg-white
              w-full
              max-w-3xl
              max-h-[90vh]
              overflow-y-auto
              rounded-3xl
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="
              sticky
              top-0
              z-10
              bg-white
              border-b
              px-6
              py-5
              flex
              items-center
              justify-between
            ">

              <div>

                <p className="
                  uppercase
                  tracking-[0.25em]
                  text-[#C8A044]
                  text-xs
                ">
                  DESIGN REQUEST
                </p>


                <h2
                  className="
                    text-2xl
                    text-[#18322F]
                    mt-1
                  "
                  style={{
                    fontFamily:
                      "Cinzel, serif",
                  }}
                >
                  Request #{selectedRequest.id}
                </h2>

              </div>


              <button
                onClick={() =>
                  setSelectedRequest(null)
                }
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  text-gray-600
                  hover:bg-gray-200
                  transition
                "
              >

                <X size={20} />

              </button>

            </div>


            <div className="p-6 space-y-6">

              {/* CUSTOMER INFO */}

              <div className="
                grid
                sm:grid-cols-2
                gap-4
              ">

                <div className="
                  rounded-2xl
                  bg-[#F8F5EE]
                  p-5
                ">

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <User
                      size={20}
                      className="text-[#C8A044]"
                    />

                    <div>

                      <p className="
                        text-xs
                        text-gray-500
                        uppercase
                        tracking-wide
                      ">
                        Customer
                      </p>

                      <p className="
                        mt-1
                        font-medium
                        text-[#18322F]
                      ">
                        {selectedRequest.name ||
                          "-"}
                      </p>

                    </div>

                  </div>

                </div>


                <div className="
                  rounded-2xl
                  bg-[#F8F5EE]
                  p-5
                ">

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <Phone
                      size={20}
                      className="text-[#C8A044]"
                    />

                    <div>

                      <p className="
                        text-xs
                        text-gray-500
                        uppercase
                        tracking-wide
                      ">
                        WhatsApp
                      </p>

                      <p className="
                        mt-1
                        font-medium
                        text-[#18322F]
                      ">
                        {selectedRequest.whatsapp_number ||
                          "-"}
                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* JEWELLERY DETAILS */}

              <div className="
                grid
                sm:grid-cols-2
                gap-4
              ">

                <div>

                  <p className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Jewellery Type
                  </p>

                  <p className="
                    mt-1
                    text-[#18322F]
                    font-medium
                    capitalize
                  ">
                    {selectedRequest.jewellery_type ||
                      "-"}
                  </p>

                </div>


                <div>

                  <p className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Request Type
                  </p>

                  <p className="
                    mt-1
                    text-[#18322F]
                    font-medium
                    capitalize
                  ">
                    {selectedRequest.request_type ||
                      "-"}
                  </p>

                </div>

              </div>


              {/* REQUIREMENT */}

              <div>

                <p className="
                  text-xs
                  uppercase
                  tracking-wide
                  text-gray-500
                ">
                  Customer Requirement
                </p>


                <div className="
                  mt-2
                  rounded-2xl
                  bg-[#F8F5EE]
                  p-5
                  text-gray-700
                  leading-7
                  whitespace-pre-wrap
                ">
                  {selectedRequest.requirement ||
                    "No requirement provided."}
                </div>

              </div>


              {/* REFERENCE IMAGE */}

              {selectedRequest.reference_image && (

                <div>

                  <p className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Reference Design
                  </p>


                  <div className="
                    mt-3
                    rounded-2xl
                    overflow-hidden
                    border
                    border-gray-200
                    bg-[#F8F5EE]
                  ">

                    <img
                      src={getImageUrl(
                        selectedRequest.reference_image
                      )}
                      alt="Customer reference design"
                      className="
                        w-full
                        max-h-[450px]
                        object-contain
                      "
                    />

                  </div>

                </div>

              )}


              {/* STATUS */}

              <div>

                <p className="
                  text-xs
                  uppercase
                  tracking-wide
                  text-gray-500
                ">
                  Request Status
                </p>


                <div className="
                  mt-3
                  flex
                  flex-wrap
                  gap-2
                ">

                  {[
                    "new",
                    "contacted",
                    "in_progress",
                    "completed",
                    "cancelled",
                  ].map((status) => (

                    <button
                      key={status}
                      onClick={() =>
                        updateStatus(
                          selectedRequest,
                          status
                        )
                      }
                      disabled={
                        updatingStatusId ===
                        selectedRequest.id
                      }
                      className={`
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-medium
                        border
                        transition
                        ${
                          (
                            selectedRequest.status ||
                            "new"
                          ) === status
                            ? getStatusStyle(
                                status
                              )
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }
                      `}
                    >

                      {updatingStatusId ===
                        selectedRequest.id &&
                      selectedRequest.status ===
                        status ? (
                        <span className="
                          flex
                          items-center
                          gap-2
                        ">

                          <RefreshCw
                            size={14}
                            className="animate-spin"
                          />

                          Updating...

                        </span>
                      ) : (
                        getStatusLabel(
                          status
                        )
                      )}

                    </button>

                  ))}

                </div>

              </div>


              {/* ACTIONS */}

              <div className="
                pt-4
                border-t
                flex
                flex-col
                sm:flex-row
                gap-3
              ">

                <button
                  onClick={() =>
                    openWhatsApp(
                      selectedRequest.whatsapp_number
                    )
                  }
                  className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-[#18322F]
                    text-white
                    rounded-xl
                    py-3
                    font-medium
                    hover:bg-[#23423F]
                    transition
                  "
                >

                  <MessageCircle
                    size={18}
                  />

                  WhatsApp Customer

                </button>


                <button
                  onClick={() =>
                    callCustomer(
                      selectedRequest.whatsapp_number
                    )
                  }
                  className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    border
                    border-[#C8A044]
                    text-[#18322F]
                    rounded-xl
                    py-3
                    font-medium
                    hover:bg-[#F8F5EE]
                    transition
                  "
                >

                  <Phone size={18} />

                  Call Customer

                </button>


                <button
                  onClick={() =>
                    handleDeleteRequest(
                      selectedRequest
                    )
                  }
                  disabled={
                    deletingRequestId ===
                    selectedRequest.id
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-3
                    rounded-xl
                    bg-red-50
                    text-red-600
                    font-medium
                    hover:bg-red-100
                    transition
                    disabled:opacity-50
                  "
                >

                  {deletingRequestId ===
                  selectedRequest.id ? (

                    <RefreshCw
                      size={18}
                      className="animate-spin"
                    />

                  ) : (

                    <Trash2 size={18} />

                  )}

                  Delete

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </AdminLayout>
  );
}


export default DesignRequests;