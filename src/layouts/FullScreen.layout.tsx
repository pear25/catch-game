type FullScreenLayoutProps = {
  children: React.ReactNode;
};

export const FullScreenLayout = ({ children }: FullScreenLayoutProps) => {
  return (
    <div className="bg-main-menu bg-cover h-screen w-screen">{children}</div>
  );
};
