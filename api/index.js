import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverModule = await import(pathToFileURL(path.join(__dirname, "../dist/server/server.js")).href);
const handler = serverModule.default ?? serverModule;

export default async function (req, res) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "localhost";
  const requestUrl = new URL(req.url ?? "/", `${protocol}://${host}`);

  const request = new Request(requestUrl, {
    method: req.method,
    headers: req.headers,
    body: ["GET", "HEAD"].includes(req.method ?? "GET") ? undefined : req,
  });

  const response = await handler.fetch(request, {}, {});

  res.statusCode = response.status;
  response.headers.forEach((value, name) => {
    // Skip headers that Vercel sets automatically
    if (name.toLowerCase() === "transfer-encoding") return;
    res.setHeader(name, value);
  });

  const body = await response.arrayBuffer();
  res.end(Buffer.from(body));
}
