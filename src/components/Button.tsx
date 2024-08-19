type ButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
};

export const Button = ({
  text,
  onClick,
  variant = 'primary',
  className,
}: ButtonProps) => {
  const colorClasses = {
    primary: 'bg-blue-500 hover:bg-blue-700',
    secondary: 'bg-slate-500 hover:bg-slate-700',
  };

  return (
    <button
      onClick={onClick}
      className={`${colorClasses[variant]} text-white md:py-2 md:px-4 rounded ${className}`}
    >
      {text}
    </button>
  );
};
