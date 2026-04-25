export default function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent px-4 pt-28 pb-6 md:flex md:items-center md:justify-center md:px-6 md:pt-24"> 
      {children}
    </div>
  );
}