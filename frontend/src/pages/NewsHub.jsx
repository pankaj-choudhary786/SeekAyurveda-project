import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import Header from "../components/Header";
import { fetchNews } from "../services/newsApi";

export default function NewsHub() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [externalArticles, setExternalArticles] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchNews();
        setExternalArticles(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
        setExternalArticles([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-cream  px-6 py-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className=" bg-deep-teal p-3 px-6 py-5 md:px-4 md:py-3 mb-6 rounded-lg">
            {/* Title Row */}
            <div className="flex items-center  gap-3">
              <span className="text-xl font-bold tracking-widest text-cream uppercase">
                Ayurveda
              </span>
              <span className="h-px w-8 bg-cream/60" />
              <h1 className=" text-sm md:text-xl lg:text-xl font-extrabold text-white leading-tight">
                News Hub
              </h1>
            </div>

            {/* Subtitle */}
            <p className="mt-2 max-w-2xl text-white/85 text-sm md:text-base">
              Verified updates and scientific developments from trusted
              Ayurvedic and medical institutions.
            </p>
          </div>

          {/* Content */}
          <div className="mt-8 bg-deep-teal rounded-lg p-8">
            {loading ? (
              <p className="text-white/80 text-lg">Loading updates...</p>
            ) : error ? (
              <div className="glass p-6 rounded-lg border-l-4 border-cream">
                <p className="text-cream font-semibold">{error}</p>
              </div>
            ) : externalArticles.length === 0 ? (
              <p className="text-white/80 text-lg">No articles available.</p>
            ) : (
              <div className="h-[70vh] overflow-y-auto cream-scrollbar pr-3">
                <div className="flex flex-col gap-6">
                  {externalArticles.map((article) => (
                    <NewsCard key={article._id} article={article} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
