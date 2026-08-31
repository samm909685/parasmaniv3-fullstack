const express = require("express");

const router = express.Router();

const uploadDesignRequest = require(
  "../config/designRequestMulter"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
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
   PUBLIC
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
   PROTECTED
========================== */

router.get(
  "/",
  authMiddleware,
  getAllDesignRequests
);


/* ==========================
   GET UNREAD COUNT
   PROTECTED
========================== */

router.get(
  "/unread-count",
  authMiddleware,
  getUnreadDesignRequestCount
);


/* ==========================
   GET SINGLE REQUEST
   PROTECTED
========================== */

router.get(
  "/:id",
  authMiddleware,
  getDesignRequestById
);


/* ==========================
   MARK AS READ
   PROTECTED
========================== */

router.patch(
  "/:id/read",
  authMiddleware,
  markDesignRequestAsRead
);


/* ==========================
   UPDATE STATUS
   PROTECTED
========================== */

router.put(
  "/:id/status",
  authMiddleware,
  updateDesignRequestStatus
);


/* ==========================
   DELETE REQUEST
   PROTECTED
========================== */

router.delete(
  "/:id",
  authMiddleware,
  deleteDesignRequest
);


module.exports = router;