export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { TMDB_API_KEY } = process.env;

  if (!TMDB_API_KEY) {
    return res.status(500).json({ error: "TMDB API key is not configured" });
  }

  try {
    const query = new URL(req.url, `https://${req.headers.host}`).searchParams;

    const path = query.get("path");

    if (!path || !path.startsWith("/")) {
      return res.status(400).json({ error: "Missing TMDB path" });
    }

    query.delete("path");

    const tmdbUrl = new URL(`https://api.themoviedb.org/3${path}`);
    tmdbUrl.searchParams.set("api_key", TMDB_API_KEY);

    for (const [key, value] of query.entries()) {
      tmdbUrl.searchParams.set(key, value);
    }

    const response = await fetch(tmdbUrl.toString());
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "TMDB request failed" });
  }
}
