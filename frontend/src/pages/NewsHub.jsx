import React, { useEffect, useState } from "react";
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
        console.error(err);
        setError("Failed to load news.");
        setExternalArticles([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen mt-15 bg-[#FFE4BB] px-6 py-10">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-6 rounded-lg bg-[#286459] px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold tracking-widest text-[#FFE4BB] uppercase">
                Ayurveda
              </span>
              <span className="h-px w-8 bg-[#FFE4BB]/60" />
              <h1 className="text-xl font-extrabold text-white">
                News Hub
              </h1>
            </div>

            <p className="mt-2 max-w-2xl text-white/85">
              Verified updates and scientific developments from trusted
              Ayurvedic and medical institutions.
            </p>
          </div>

          {/* Content */}
          <div className="mt-8 rounded-lg bg-[#286459] p-8">
            {loading ? (
              <p className="text-white/80 text-lg">Loading updates...</p>
            ) : error ? (
              <div className="glass rounded-lg border-l-4 border-[#FFE4BB] p-6">
                <p className="font-semibold text-[#FFE4BB]">{error}</p>
              </div>
            ) : externalArticles.length === 0 ? (
              <p className="text-white/80 text-lg">No articles available.</p>
            ) : (
              <div className="h-[70vh] overflow-y-auto pr-3 cream-scrollbar">
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
