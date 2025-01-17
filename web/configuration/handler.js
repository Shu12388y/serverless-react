import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const handler = async (event) => {
  try {
    const { rawPath } = event; // e.g., "/" or "/assets/styles.css"
    let filePath;

    // Serve the index.html for the root path
    if (rawPath === "/") {
      filePath = path.join(__dirname, "dist", "index.html");
    } else {
      // Map other paths to files in the dist folder
      filePath = path.join(__dirname, "dist", rawPath);
    }

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "text/plain",
        },
        body: "File not found",
      };
    }

    // Determine the MIME type
    const ext = path.extname(filePath);
    const mimeTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".gif": "image/gif",
      ".ico": "image/x-icon",
    };
    const contentType = mimeTypes[ext] || "application/octet-stream";

    // Read the file content
    const fileContent = fs.readFileSync(filePath);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": contentType,
      },
      body: fileContent.toString("base64"),
      isBase64Encoded: true, // Required for binary data
    };
  } catch (error) {
    console.error("Error serving file:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/plain",
      },
      body: "Internal Server Error",
    };
  }
};
