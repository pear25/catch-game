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
    primary: 'bg-blue-500 hover:bg-blue-600',
    secondary: 'bg-yellow-500 hover:bg-yellow-600',
  };

  return (
    <button
      onClick={onClick}
      className={`${colorClasses[variant]} text-white py-1 px-2 md:py-2 md:px-4 rounded ${className}`}
    >
      {text}
    </button>
  );
};
