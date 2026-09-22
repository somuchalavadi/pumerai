import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const FRAME_PATTERN = /^pumerai_\d{4}\.webp$/;

function pumeraiFramesPlugin() {
  const root = process.cwd();
  const framesDir = path.resolve(root, "frames");
  const distFramesDir = path.resolve(root, "dist", "frames");

  return {
    name: "pumerai-local-frames",
    configureServer(server) {
      server.middlewares.use("/frames", (req, res, next) => {
        const rawPath = decodeURIComponent((req.url || "").split("?")[0] || "");
        const fileName = rawPath.replace(/^\/+/, "");

        if (!FRAME_PATTERN.test(fileName)) {
          next();
          return;
        }

        const filePath = path.resolve(framesDir, fileName);
        if (!filePath.startsWith(framesDir)) {
          res.statusCode = 403;
          res.end();
          return;
        }

        res.setHeader("Content-Type", "image/webp");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        fs.createReadStream(filePath).on("error", next).pipe(res);
      });
    },
    async closeBundle() {
      const entries = await fsp.readdir(framesDir).catch(() => []);
      const frames = entries.filter((entry) => FRAME_PATTERN.test(entry));

      if (frames.length === 0) {
        return;
      }

      await fsp.rm(distFramesDir, { recursive: true, force: true });
      await fsp.mkdir(distFramesDir, { recursive: true });

      await Promise.all(
        frames.map((frame) =>
          fsp.copyFile(path.join(framesDir, frame), path.join(distFramesDir, frame)),
        ),
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), pumeraiFramesPlugin()],
  publicDir: false,
  build: {
    sourcemap: false,
  },
});
