import { cn } from "../../lib/cn";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  const base =
    "rounded-xl font-medium transition-all duration-200 flex items-center justify-center";

  const variants = {
    primary: "bg-primary text-white hover:opacity-90",
    outline: "border border-gray-600 text-white hover:bg-white/10",
    ghost: "text-gray-300 hover:bg-white/10",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3",
    lg: "px-6 py-4 text-lg",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
