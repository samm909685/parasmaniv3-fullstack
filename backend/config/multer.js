const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;

    // Categories
    if (req.baseUrl.includes("categories")) {
      uploadPath = path.join(__dirname, "../uploads/categories");
    }

    // Products
    else if (req.baseUrl.includes("products")) {
      uploadPath = path.join(__dirname, "../uploads/products");
    }

    // Default
    else {
      uploadPath = path.join(__dirname, "../uploads");
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1000000000) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;