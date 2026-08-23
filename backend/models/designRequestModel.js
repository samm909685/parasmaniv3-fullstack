const db = require("../config/db");

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

const getAllDesignRequests = (callback) => {
  const sql = `
    SELECT *
    FROM design_requests
    ORDER BY created_at DESC
  `;

  db.query(sql, callback);
};

const getDesignRequestById = (id, callback) => {
  const sql = `
    SELECT *
    FROM design_requests
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

const updateDesignRequestStatus = (id, status, callback) => {
  const sql = `
    UPDATE design_requests
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, id], callback);
};

const deleteDesignRequest = (id, callback) => {
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
  deleteDesignRequest,
};