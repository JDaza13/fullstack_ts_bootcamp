import crypto from "crypto";
import * as fs from "fs";
import path from "path";
import type { Plugin } from "vite";

const obfuscationMessage = "Obfuscated sourcemap generated";

/**
 * Generates an obfuscated filename by inserting an crypto-generated string in the original filename
 * @param source the original filename
 * @returns the obfuscate filename string
 */
const generateObfuscatedFilename = (source: string): string => {
  const randomString = crypto.randomBytes(8).toString("hex");
  return source.replace(/\.js.map$/, `-${randomString}.js.map`);
};

/**
 * A vite (rollup) plugin that generate obsfucated sourcemaps
 * @param assetsDir path to the assets dir
 * @returns Plugin
 */
export default function myPlugin(assetsDir: string): Plugin {
  return {
    name: "obfuscate-sourcemaps",
    async closeBundle() {
      const assetsPath = path.resolve(assetsDir);
      fs.readdir(assetsPath, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
          if (file.endsWith(".map")) {
            const source = path.join(assetsDir, file);
            const resultSourcemapFilename = generateObfuscatedFilename(source);
            fs.copyFileSync(source, resultSourcemapFilename);
            console.log(`${obfuscationMessage}: ${resultSourcemapFilename}`);
          }
        });
      });
    },
  };
}
