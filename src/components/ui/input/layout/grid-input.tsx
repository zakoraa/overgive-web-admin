type GridInputProps = {
  children: React.ReactNode;
};

export const GridInput = ({ children }: GridInputProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
  );
};
