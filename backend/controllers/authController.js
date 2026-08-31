const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  findAdminByEmail,
  findAdminById,
  createAdmin,
  updateAdminEmail,
  updateAdminPassword,
  countAdmins,
} = require("../models/adminModel");

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn(
    "⚠️ JWT_SECRET is not configured in the backend environment."
  );
};

/* ==========================
   CREATE FIRST ADMIN
========================== */

const setupAdmin = async (req, res) => {
  try {
    const existingAdmins = await countAdmins();

    if (existingAdmins > 0) {
      return res.status(403).json({
        success: false,
        message: "Admin setup has already been completed.",
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingAdmin = await findAdminByEmail(normalizedEmail);

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const adminId = await createAdmin(
      normalizedEmail,
      hashedPassword
    );

    return res.status(201).json({
      success: true,
      message: "Admin account created successfully.",
      adminId,
    });
  } catch (error) {
    console.error("Setup Admin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create admin account.",
    });
  }
};

/* ==========================
   LOGIN
========================== */

const login = async (req, res) => {
  try {
    if (!JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Authentication server configuration is missing.",
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const admin = await findAdminByEmail(normalizedEmail);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        adminId: admin.id,
        email: admin.email,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
};

/* ==========================
   CURRENT ADMIN
========================== */

const getMe = async (req, res) => {
  try {
    const admin = await findAdminById(req.admin.adminId);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    return res.json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error("Get Admin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get admin information.",
    });
  }
};

/* ==========================
   UPDATE EMAIL
========================== */

const changeEmail = async (req, res) => {
  try {
    const { email, currentPassword } = req.body;

    if (!email || !currentPassword) {
      return res.status(400).json({
        success: false,
        message: "New email and current password are required.",
      });
    }

    const admin = await findAdminById(req.admin.adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    const adminWithPassword = await findAdminByEmail(admin.email);

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      adminWithPassword.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailOwner = await findAdminByEmail(normalizedEmail);

    if (
      emailOwner &&
      Number(emailOwner.id) !== Number(req.admin.adminId)
    ) {
      return res.status(409).json({
        success: false,
        message: "This email is already in use.",
      });
    }

    await updateAdminEmail(
      req.admin.adminId,
      normalizedEmail
    );

    return res.json({
      success: true,
      message: "Email updated successfully.",
      email: normalizedEmail,
    });
  } catch (error) {
    console.error("Change Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update email.",
    });
  }
};

/* ==========================
   UPDATE PASSWORD
========================== */

const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 8 characters.",
      });
    }

    const admin = await findAdminByEmail(req.admin.email);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const samePassword = await bcrypt.compare(
      newPassword,
      admin.password
    );

    if (samePassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be different from the current password.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      12
    );

    await updateAdminPassword(
      req.admin.adminId,
      hashedPassword
    );

    return res.json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error("Change Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update password.",
    });
  }
};

module.exports = {
  setupAdmin,
  login,
  getMe,
  changeEmail,
  changePassword,
};