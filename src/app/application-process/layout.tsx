export default function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent pt-10 md:pt-0"> 
      {children}
    </div>
  );
}