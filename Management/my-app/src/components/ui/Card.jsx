import { cn } from "../../lib/cn";

export default function Card({
  children,
  className,
  hover = true,
  ...props
}) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-5 shadow-md transition",
        hover && "hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
