import { Router } from "express";

const infoRouter = Router();

infoRouter.get("/", (req, res) => {
  res.json({
    argv: process.argv.slice(2),
    platform: process.platform,
    version: process.version,
    rss: process.memoryUsage(),
    cwd: process.cwd(),
    pe: process.execPath,
    pid: process.pid,
  });
});

export default infoRouter;
