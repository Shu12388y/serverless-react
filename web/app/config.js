import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, "dist");
const serverPath = path.join(__dirname, "..", "configuration/dist");


fs.cp(distPath, serverPath, { recursive: true }, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("done");
});

