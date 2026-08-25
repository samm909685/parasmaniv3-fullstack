const express = require("express");

const router = express.Router();

const uploadDesignRequest = require(
  "../config/designRequestMulter"
);


const {
  createDesignRequest,
  getAllDesignRequests,
  getDesignRequestById,
  updateDesignRequestStatus,
  markDesignRequestAsRead,
  getUnreadDesignRequestCount,
  deleteDesignRequest,
} = require(
  "../controllers/designRequestController"
);


/* ==========================
   CREATE DESIGN REQUEST
========================== */

router.post(
  "/",
  uploadDesignRequest.single(
    "reference_image"
  ),
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
   GET UNREAD COUNT
========================== */

router.get(
  "/unread-count",
  getUnreadDesignRequestCount
);


/* ==========================
   GET SINGLE REQUEST
========================== */

router.get(
  "/:id",
  getDesignRequestById
);


/* ==========================
   MARK AS READ
========================== */

router.patch(
  "/:id/read",
  markDesignRequestAsRead
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