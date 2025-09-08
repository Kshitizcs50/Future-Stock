import authMiddleware from "../middleware/auth";

// Helper to run middleware inside Vercel serverless
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // ✅ Run authMiddleware manually
    await runMiddleware(req, res, authMiddleware);

    // ✅ If middleware succeeds, req.user will be available
    res.status(200).json({
      message: "✅ You can trade now",
      user: req.user,
    });
  } catch (err) {
    console.error("❌ Auth failed:", err.message);
    res.status(401).json({ error: "Unauthorized" });
  }
}
import authMiddleware from "../middleware/auth";

// Helper to run middleware inside Vercel serverless
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // ✅ Run authMiddleware manually
    await runMiddleware(req, res, authMiddleware);

    // ✅ If middleware succeeds, req.user will be available
    res.status(200).json({
      message: "✅ You can trade now",
      user: req.user,
    });
  } catch (err) {
    console.error("❌ Auth failed:", err.message);
    res.status(401).json({ error: "Unauthorized" });
  }
}
