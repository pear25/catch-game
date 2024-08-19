import { ClipLoader } from 'react-spinners';

type SpinnerProps = {
  color?: string;
  size?: number;
};

export const Spinner = ({ color = 'white', size = 50 }: SpinnerProps) => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <ClipLoader
        color={color}
        loading={true}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
