// import rateLimit, { ipKeyGenerator } from "express-rate-limit";

// export const generalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 300, // 100 → 300
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: {
//     success: false,
//     message: "Too many requests. Try again after 15 minutes.",
//   },
// });

// export const chatLimiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 10,
//   standardHeaders: true,
//   legacyHeaders: false,
//   // ✅ Fixed: ipKeyGenerator IPv6-safe fallback
//   keyGenerator: (req) => req.user?.id ?? ipKeyGenerator(req),
//   message: {
//     success: false,
//     message: "Slow down! Max 10 messages per minute.",
//   },
// });
