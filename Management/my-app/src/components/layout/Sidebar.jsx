import { cn } from "../../lib/cn";

export default function Sidebar({
  title = "МонСургууль",
  items = [],
  activeItem,
  onItemClick,
  className,
  footer,
}) {
  return (
    <aside
      className={cn(
        "flex min-h-screen w-full max-w-[280px] flex-col border-r border-[#2E2D45] bg-[#181824] px-4 py-5 text-white",
        className
      )}
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-b from-[#8C79FF] to-[#6F5DE7] text-xl font-semibold text-white">
          M
        </div>
        <div>
          <div className="text-lg font-semibold text-[#ECEAF6]">{title}</div>
          <div className="text-sm text-[#8D8AAF]">Удирдлагын самбар</div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {items.map((item) => {
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onItemClick?.(item)}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition",
                "text-[#A7A4C2] hover:bg-[#232234] hover:text-white",
                isActive && "bg-[#232234] text-white shadow-[0_0_0_1px_rgba(139,124,255,0.18)]"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {footer ? <div className="pt-4">{footer}</div> : null}
    </aside>
  );
}
