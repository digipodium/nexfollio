const Card = ({ title, value, icon, color = "#6366f1", trend, trendLabel }) => {
  return (
    <div className="glass-card-sm group relative overflow-hidden p-5 sm:p-6 min-w-0 flex-1 cursor-default transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-border-active hover:shadow-[0_8px_32px_rgba(99,102,241,0.1)]">
      {/* Subtle corner glow */}
      <div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${color}20, transparent 70%)`,
        }}
      />

      {/* Header row */}
      <div className="flex items-center justify-between mb-2.5 sm:mb-3">
        <span className="text-[0.625rem] sm:text-xs font-semibold text-txt-muted uppercase tracking-wider truncate pr-2">
          {title}
        </span>
        {icon && (
          <span
            className="text-base sm:text-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-110 transform shrink-0"
            style={{ color }}
          >
            {icon}
          </span>
        )}
      </div>

      {/* Value */}
      <p className="text-xl sm:text-2xl lg:text-[1.75rem] font-extrabold tracking-tight text-txt-primary leading-none">
        {value}
      </p>

      {/* Optional trend indicator */}
      {trend && (
        <div className="flex items-center gap-1 sm:gap-1.5 mt-2">
          <span
            className={`inline-flex items-center gap-0.5 text-[0.625rem] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full ${
              trend > 0
                ? "text-success bg-[rgba(34,197,94,0.1)]"
                : "text-error bg-[rgba(248,113,113,0.1)]"
            }`}
          >
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
          {trendLabel && (
            <span className="text-[0.5625rem] sm:text-[0.6875rem] text-txt-muted truncate">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;