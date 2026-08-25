const db = require("../config/db");

/* ==========================
   CREATE DESIGN REQUEST
========================== */

const createDesignRequest = (
  name,
  whatsapp_number,
  jewellery_type,
  request_type,
  requirement,
  reference_image,
  callback
) => {
  const sql = `
    INSERT INTO design_requests
    (
      name,
      whatsapp_number,
      jewellery_type,
      request_type,
      requirement,
      reference_image
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      whatsapp_number,
      jewellery_type,
      request_type,
      requirement,
      reference_image,
    ],
    callback
  );
};


/* ==========================
   GET ALL DESIGN REQUESTS
========================== */

const getAllDesignRequests = (callback) => {
  const sql = `
    SELECT *
    FROM design_requests
    ORDER BY created_at DESC
  `;

  db.query(sql, callback);
};


/* ==========================
   GET SINGLE DESIGN REQUEST
========================== */

const getDesignRequestById = (id, callback) => {
  const sql = `
    SELECT *
    FROM design_requests
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};


/* ==========================
   UPDATE STATUS
========================== */

const updateDesignRequestStatus = (
  id,
  status,
  callback
) => {
  const sql = `
    UPDATE design_requests
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, id], callback);
};


/* ==========================
   MARK AS READ
========================== */

const markDesignRequestAsRead = (
  id,
  callback
) => {
  const sql = `
    UPDATE design_requests
    SET is_read = 1
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};


/* ==========================
   GET UNREAD COUNT
========================== */

const getUnreadDesignRequestCount = (
  callback
) => {
  const sql = `
    SELECT COUNT(*) AS unread_count
    FROM design_requests
    WHERE is_read = 0
  `;

  db.query(sql, callback);
};


/* ==========================
   DELETE DESIGN REQUEST
========================== */

const deleteDesignRequest = (
  id,
  callback
) => {
  const sql = `
    DELETE FROM design_requests
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};


module.exports = {
  createDesignRequest,
  getAllDesignRequests,
  getDesignRequestById,
  updateDesignRequestStatus,
  markDesignRequestAsRead,
  getUnreadDesignRequestCount,
  deleteDesignRequest,
};