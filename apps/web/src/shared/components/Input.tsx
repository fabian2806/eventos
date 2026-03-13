import { cn } from "@/shared/utils/cn";
import type { InputHTMLAttributes, ReactNode } from "react";

type InputVariant = "default" | "emphasis" | "error" | "success";
type InputSize = "md" | "lg" | "xl";

type InputProps = {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  wrapperClassName?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

const baseWrapper =
  "w-full flex flex-col gap-2 text-white";

const baseInputContainer =
  "group flex items-center gap-3 rounded-xl border backdrop-blur-md transition-all duration-300";

const variantStyles = {
  default:
    "border-white/20 bg-white/5 hover:border-white/30 focus-within:border-white/40 focus-within:bg-white/[0.07] focus-within:shadow-[0_10px_30px_-20px_rgba(255,255,255,0.25)]",

  emphasis:
    "border-white/50 bg-white/[0.12] shadow-[0_20px_45px_-22px_rgba(255,255,255,0.24)] hover:border-white/60 hover:bg-white/[0.14] focus-within:border-white/75 focus-within:bg-white/[0.16] focus-within:shadow-[0_24px_55px_-20px_rgba(255,255,255,0.34)]",

  error:
    "border-red-400/50 bg-red-500/[0.06] hover:border-red-300/60 focus-within:border-red-300/80 focus-within:bg-red-500/[0.08] focus-within:shadow-[0_18px_40px_-24px_rgba(248,113,113,0.30)]",

  success:
    "border-emerald-400/50 bg-emerald-500/[0.06] hover:border-emerald-300/60 focus-within:border-emerald-300/80 focus-within:bg-emerald-500/[0.08] focus-within:shadow-[0_18px_40px_-24px_rgba(52,211,153,0.28)]"
};

const sizeStyles = {
  md: "h-12 px-4",
  lg: "h-14 px-4",
  xl: "h-16 px-5"
};

const inputTextSizeStyles = {
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg"
};

const labelStyles =
  "text-sm font-semibold uppercase tracking-[0.18em] text-white/75";

const baseInputStyles =
  "w-full bg-transparent text-white placeholder:text-white/30 font-body outline-none disabled:cursor-not-allowed disabled:opacity-50";

const iconStyles =
  "shrink-0 text-white/45 transition-colors duration-200 group-focus-within:text-white/75";

const Input = ({
  variant = "default",
  size = "lg",
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  className,
  wrapperClassName,
  id,
  ...props
}: InputProps) => {
  const resolvedVariant: InputVariant = error ? "error" : variant;

  return (
    <div className={cn(baseWrapper, wrapperClassName)}>
      {label && (
        <label htmlFor={id} className={labelStyles}>
          {label}
        </label>
      )}

      <div
        className={cn(
          baseInputContainer,
          variantStyles[resolvedVariant],
          sizeStyles[size]
        )}
      >
        {leftIcon && <span className={iconStyles}>{leftIcon}</span>}

        <input
          id={id}
          className={cn(
            baseInputStyles,
            inputTextSizeStyles[size],
            className
          )}
          {...props}
        />

        {rightIcon && <span className={iconStyles}>{rightIcon}</span>}
      </div>

      {error ? (
        <p className="text-sm text-red-300/90">{error}</p>
      ) : hint ? (
        <p className="text-sm text-white/45">{hint}</p>
      ) : null}
    </div>
  );
};

export default Input;