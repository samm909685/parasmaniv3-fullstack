const API_BASE = (import.meta.env.VITE_API_BASE_URL || "https://api.parasmanijewelers.in/api").replace(/\/+$/, "");
export async function getManiCatalog(signal) {
  const response = await fetch(`${API_BASE}/mani`, { signal });
  let payload;
  try { payload = await response.json(); } catch { throw new Error("Our Mani collection is unavailable. Please try again shortly."); }
  if (!response.ok || payload.success !== true || !Array.isArray(payload.products)) {
    throw new Error("Our Mani collection is unavailable. Please try again shortly.");
  }
  return payload.products;
}
