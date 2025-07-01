import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function DefaultLayout({
  children,
  title,
  showBackButton = false,
}: {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
}) {
  return (
    <div className="relative flex flex-col h-screen max-w-xl mx-auto">
      <Navbar showBackButton={showBackButton} title={title} />
      <main className="container overflow-y-auto px-2 pt-1 pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
