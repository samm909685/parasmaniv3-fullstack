const express = require("express");

const router = express.Router();

const uploadDesignRequest = require("../config/designRequestMulter");

const {
  createDesignRequest,
  getAllDesignRequests,
  getDesignRequestById,
  updateDesignRequestStatus,
  deleteDesignRequest,
} = require("../controllers/designRequestController");


/* ==========================
   CREATE DESIGN REQUEST
========================== */

router.post(
  "/",
  uploadDesignRequest.single("reference_image"),
  createDesignRequest
);


/* ==========================
   GET ALL DESIGN REQUESTS
========================== */

router.get(
  "/",
  getAllDesignRequests
);


/* ==========================
   GET SINGLE REQUEST
========================== */

router.get(
  "/:id",
  getDesignRequestById
);


/* ==========================
   UPDATE STATUS
========================== */

router.put(
  "/:id/status",
  updateDesignRequestStatus
);


/* ==========================
   DELETE REQUEST
========================== */

router.delete(
  "/:id",
  deleteDesignRequest
);


module.exports = router;