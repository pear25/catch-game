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
  switch (variant) {
    case 'primary':
      return (
        <button
          onClick={onClick}
          className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ${className}`}
        >
          {text}
        </button>
      );
    case 'secondary':
      return (
        <button
          onClick={onClick}
          className="bg-slate-500 hover:bg-slate-700 text-white py-2 px-4 rounded"
        >
          {text}
        </button>
      );
  }
};
