const db = require("../config/db");

const findAdminByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT id, email, password, created_at, updated_at
      FROM admins
      WHERE email = ?
      LIMIT 1
    `;

    db.query(sql, [email], (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(results[0] || null);
    });
  });
};

const findAdminById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT id, email, created_at, updated_at
      FROM admins
      WHERE id = ?
      LIMIT 1
    `;

    db.query(sql, [id], (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(results[0] || null);
    });
  });
};

const createAdmin = (email, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO admins (email, password)
      VALUES (?, ?)
    `;

    db.query(sql, [email, hashedPassword], (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result.insertId);
    });
  });
};

const updateAdminEmail = (id, email) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE admins
      SET email = ?
      WHERE id = ?
    `;

    db.query(sql, [email, id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
};

const updateAdminPassword = (id, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE admins
      SET password = ?
      WHERE id = ?
    `;

    db.query(sql, [hashedPassword, id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
};

const countAdmins = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT COUNT(*) AS count FROM admins`;

    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(Number(results[0].count));
    });
  });
};

module.exports = {
  findAdminByEmail,
  findAdminById,
  createAdmin,
  updateAdminEmail,
  updateAdminPassword,
  countAdmins,
};