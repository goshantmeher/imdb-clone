function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className=" grid grid-cols-1 h-[calc(100vh-50px)] overflow-scroll">
      {children}
    </div>
  );
}

export default PageContainer;
