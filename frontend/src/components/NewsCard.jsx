export default function NewsCard({ article }) {
  return (
    <div className="group glass smooth-transition flex flex-col overflow-hidden rounded-lg md:flex-row">

      {/* Image */}
      <div className="relative h-48 w-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-[#286459] to-[#286459]/80 md:h-auto md:w-48">
        <img
          src={article.imageUrl || "https://via.placeholder.com/400x250"}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col bg-gradient-to-b from-[#286459]/20 to-[#286459]/10 px-4 py-3">

        {/* Source */}
        <span className="mb-1.5 w-fit rounded-full border border-[#FFE4BB]/60 bg-[#FFE4BB]/40 px-2.5 py-0.5 text-[11px] font-semibold text-[#286459]">
          {typeof article.source === "string"
            ? article.source
            : article.source?.name}
        </span>

        {/* Title */}
        <h3 className="text-base font-semibold text-white leading-snug">
          {article.title}
        </h3>

        {/* Description */}
        <p className="mt-1.5 rounded bg-[#FFFFC7]/90 px-3 py-1 text-sm text-black">
          {article.description || "No description available."}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-2">
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-[#FFE4BB] hover:text-white"
          >
            Read →
          </a>
        </div>

      </div>
    </div>
  );
}
