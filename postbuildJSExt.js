import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function addJsExtension(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const updatedContent = content.replace(
    /(from\s+['"])(\..*?)(['"])/g,
    (match, p1, p2, p3) => {
      return p2.endsWith(".js") ? match : `${p1}${p2}.js${p3}`;
    }
  );
  fs.writeFileSync(filePath, updatedContent, "utf8");
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const fullPath = path.join(directory, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith(".js")) {
      addJsExtension(fullPath);
    }
  });
}

processDirectory(path.join(__dirname, "build/api"));
