import { timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const expectedToken = process.env.ADMIN_API_TOKEN;

  if (!expectedToken || expectedToken.length < 32) {
    return res.status(503).json({
      message: "Admin access is not configured",
    });
  }

  const authorization = req.get("authorization") ?? "";
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token || !safeEqual(token, expectedToken)) {
    return res.status(401).json({
      message: "Admin authentication required",
    });
  }

  next();
}
