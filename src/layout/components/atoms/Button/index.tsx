import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "danger" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-[var(--theme-accent-current)] hover:opacity-90 text-White",
    danger: "bg-Red-500 hover:bg-Red-400 text-White",
    secondary:
      "bg-[var(--theme-secondary-current)] hover:opacity-90 text-White",
  };

  return (
    <button
      className={twMerge(
        "flex items-center justify-center gap-2.5 px-16 py-4 rounded-xl font-bold text-sm leading-[1.2] cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
