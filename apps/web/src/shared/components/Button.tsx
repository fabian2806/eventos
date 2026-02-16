import { cn } from "@/shared/utils/cn";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;  
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
//React.Button... extiende los props nativos de button (onClick, disabled, etc.)

/*Estilo del botón:*/
const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:opacity-50 disabled:pointer-events-none";

const variantStyles = {
  primary:
    "bg-white text-black hover:bg-white/90 active:scale-[0.98] shadow-[0_10px_30px_-15px_rgba(255,255,255,0.6)]",
  outline:
    "border border-white/20 bg-white/5 text-white hover:bg-white/10 active:scale-[0.98]",
  ghost:
    "bg-transparent text-white/70 hover:bg-white/10 active:scale-[0.98]",
};

const sizeStyles = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};
//Considerar agregar sizeStyle 'nav'


const Button = ({
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    className,
    ...props
}: ButtonProps) => {
    
    
    return(
        <button className={cn(
                base,
                variantStyles[variant],
                sizeStyles[size],
                className
            )} {...props}
        >
                {leftIcon}
                {props.children}
                {rightIcon}
        </button>
    );

}

export default Button;