import Link from 'next/link';
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[#0077B6] text-white hover:bg-[#005f8e] active:bg-[#004f78]',
  secondary: 'bg-[#2D5A27] text-white hover:bg-[#234820] active:bg-[#1b3618]',
  ghost: 'bg-transparent border border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6]/10',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
};

const baseClasses =
  'inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type AsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AsAnchor = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string };

type ButtonProps = AsButton | AsAnchor;

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = [baseClasses, variantClasses[variant], sizeClasses[size], className]
    .filter(Boolean)
    .join(' ');

  if (href !== undefined) {
    return (
      <Link href={href} className={classes} {...(props as Omit<AsAnchor, 'href' | 'variant' | 'size' | 'className'>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
