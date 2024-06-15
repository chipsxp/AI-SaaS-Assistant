const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-[#d2d7e0] flex overflow-auto py-2">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex-col-1 h-full">
        {children}
      </div>
    </main>
  );
};

export default LandingLayout;
