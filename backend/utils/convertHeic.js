const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const heicConvert = require("heic-convert");

async function convertHeicToJpg(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  // Normal images: DO NOT convert
  if (ext !== ".heic" && ext !== ".heif") {
    return filePath;
  }

  try {
    console.log("🔄 HEIC detected, converting:", filePath);

    const inputBuffer = fs.readFileSync(filePath);

    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: "JPEG",
      quality: 1,
    });

    const newPath = filePath.replace(
      /\.(heic|heif)$/i,
      ".jpg"
    );

    await sharp(outputBuffer)
      .jpeg({ quality: 90 })
      .toFile(newPath);

    fs.unlinkSync(filePath);

    console.log("✅ HEIC converted:", newPath);

    return newPath;

  } catch (error) {
    console.error(
      "❌ HEIC conversion failed:",
      error
    );

    throw error;
  }
}

module.exports = convertHeicToJpg;