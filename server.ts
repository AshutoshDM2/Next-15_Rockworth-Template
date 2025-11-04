/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServer } from "http";
import { parse } from "url";
import next from "next";

const DEFAULT_PORT = 4001;
const port = parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url || "", true);
    handle(req, res, parsedUrl);
  });

  server.listen(port);

  server.on("listening", () => {
    const address = server.address();
    const actualPort = typeof address === "object" && address?.port;
    console.log(
      `> Server listening at http://localhost:${actualPort} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
  });

  server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `❌ Port ${port} is already in use. Please stop the other process or use a different port.`
      );
    } else {
      console.error("⨯ Server failed to start:", err);
    }
    process.exit(1);
  });
});
