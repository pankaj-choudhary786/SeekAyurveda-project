export default function NewsCard({ article }) {
  return (
    <div className="group glass smooth-transition hover:-translate-y-0.5 flex flex-col md:flex-row items-stretch overflow-hidden rounded-lg">

      {/* Image Section (TOP on mobile, LEFT on md+) */}
      <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden bg-gradient-to-br from-deep-teal to-deep-teal/80">
        <img
          src={article.imageUrl || "https://via.placeholder.com/400x250"}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0  from-deep-teal/70 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col px-4 py-3 md:px-4 md:py-3 bg-gradient-to-b from-deep-teal/20 to-deep-teal/10">

        {/* Source */}
        <span className="mb-1.5 w-fit rounded-full bg-cream/40 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-deep-teal border border-cream/60">
          {typeof article.source === "string"
            ? article.source
            : article.source?.name}
        </span>

        {/* Title */}
        <h3 className="text-base font-semibold leading-snug line-clamp-2">
          {article.title}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-sm p-1 rounded px-7 bg-[#FFFFC7]/90 text-black line-clamp-2">
          {article.description || "No description available."}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-2">
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-cream hover:text-white"
          >
            Read →
          </a>
        </div>
      </div>

    </div>
  );
}
