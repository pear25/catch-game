type FullScreenLayoutProps = {
  children: React.ReactNode;
  background?: string;
};

export const FullScreenLayout = ({
  children,
  background = 'main-menu',
}: FullScreenLayoutProps) => {
  return <div className="bg-main-menu h-screen w-screen">{children}</div>;
};
