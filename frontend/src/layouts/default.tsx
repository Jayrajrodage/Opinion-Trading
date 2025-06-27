import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen max-w-xl mx-auto">
      <Navbar />
      <main className="container overflow-y-auto px-2 pt-1">{children}</main>
      <Footer />
    </div>
  );
}
