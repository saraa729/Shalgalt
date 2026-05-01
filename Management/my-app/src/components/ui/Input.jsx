import { forwardRef } from "react";
import { cn } from "../../lib/cn";

const Input = forwardRef(function Input(
  { label, type = "text", error, className, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-400">{label}</label>}

      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full px-4 py-3 rounded-xl bg-[#1E293B] text-white outline-none",
          "focus:ring-2 focus:ring-primary",
          error && "ring-2 ring-red-500",
          className
        )}
        {...props}
      />

      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  );
});

export default Input;
