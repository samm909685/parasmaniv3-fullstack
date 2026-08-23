const DesignRequest = require("../models/designRequestModel");
const path = require("path");

/* ==========================
   CREATE DESIGN REQUEST
========================== */

exports.createDesignRequest = (req, res) => {
  try {
    const {
      name,
      whatsapp_number,
      jewellery_type,
      request_type,
      requirement,
    } = req.body;

    /* ==========================
       VALIDATION
    ========================== */

    if (
      !name ||
      !whatsapp_number ||
      !jewellery_type ||
      !requirement
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    /* ==========================
       REFERENCE IMAGE
    ========================== */

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a reference design.",
      });
    }

    const referenceImage = path.basename(req.file.path);

    /* ==========================
       DESIGN REQUEST DATA
    ========================== */

    const designRequest = {
      name: name.trim(),
      whatsapp_number: whatsapp_number.trim(),
      jewellery_type: jewellery_type.trim(),
      request_type: request_type
        ? request_type.trim()
        : null,
      requirement: requirement.trim(),
      reference_image: referenceImage,
    };

    /* ==========================
       SAVE TO DATABASE
    ========================== */

    DesignRequest.createDesignRequest(
      designRequest.name,
      designRequest.whatsapp_number,
      designRequest.jewellery_type,
      designRequest.request_type,
      designRequest.requirement,
      designRequest.reference_image,
      (err, result) => {
        if (err) {
          console.error(
            "❌ Create Design Request Error:",
            err
          );

          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        res.status(201).json({
          success: true,
          message:
            "Your design request has been submitted successfully.",
          id: result.insertId,
        });
      }
    );
  } catch (err) {
    console.error(
      "❌ Design Request Error:",
      err
    );

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/* ==========================
   GET ALL DESIGN REQUESTS
========================== */

exports.getAllDesignRequests = (req, res) => {
  const API_URL = `${req.protocol}://${req.get("host")}`;

  DesignRequest.getAllDesignRequests(
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      const requests = results.map((item) => ({
        ...item,

        reference_image: item.reference_image
          ? `${API_URL}/uploads/design-requests/${item.reference_image}`
          : null,
      }));

      res.json({
        success: true,
        data: requests,
      });
    }
  );
};


/* ==========================
   GET SINGLE DESIGN REQUEST
========================== */

exports.getDesignRequestById = (req, res) => {
  const id = req.params.id;

  DesignRequest.getDesignRequestById(
    id,
    (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (!results.length) {
        return res.status(404).json({
          success: false,
          message: "Design request not found.",
        });
      }

      const request = {
        ...results[0],

        reference_image:
          results[0].reference_image
            ? `${req.protocol}://${req.get(
                "host"
              )}/uploads/design-requests/${results[0].reference_image}`
            : null,
      };

      res.json({
        success: true,
        data: request,
      });
    }
  );
};


/* ==========================
   UPDATE STATUS
========================== */

exports.updateDesignRequestStatus = (
  req,
  res
) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "new",
    "contacted",
    "in_progress",
    "completed",
    "cancelled",
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status.",
    });
  }

  DesignRequest.updateDesignRequestStatus(
    id,
    status,
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        message: "Design request status updated.",
      });
    }
  );
};


/* ==========================
   DELETE DESIGN REQUEST
========================== */

exports.deleteDesignRequest = (req, res) => {
  const id = req.params.id;

  DesignRequest.deleteDesignRequest(
    id,
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        message: "Design request deleted successfully.",
      });
    }
  );
};