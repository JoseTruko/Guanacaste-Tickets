type Variant = 'featured' | 'free-cancellation' | 'default';

const variantClasses: Record<Variant, string> = {
  featured: 'bg-[#FFB347] text-gray-900',
  'free-cancellation': 'bg-[#2D5A27] text-white',
  default: 'bg-gray-100 text-gray-700',
};

type BadgeProps = {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const classes = [
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
}
