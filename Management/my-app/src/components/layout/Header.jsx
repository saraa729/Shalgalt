import { cn } from "../../lib/cn";

export default function Header({
  title = "Хяналтын самбар",
  subtitle,
  actions,
  className,
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 rounded-[22px] border border-[#2E2D45] bg-[#181824] px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[#ECEAF6]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-[#8D8AAF]">{subtitle}</p>
        ) : null}
      </div>

      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </header>
  );
}
