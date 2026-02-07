const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/news";

export async function fetchNews() {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("News API Error:", error.message);
    return [];
  }
}
