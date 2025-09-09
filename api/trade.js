import authMiddleware from "../backend/middleware/auth";

// Helper to run Express-style middleware in Vercel serverless
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    // Run authMiddleware manually
    await runMiddleware(req, res, authMiddleware);

    // ✅ Auth passed
    return res.status(200).json({
      message: "✅ You can trade now",
      user: req.user,
    });
  } catch (err) {
    console.error("❌ Auth failed:", err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
}
