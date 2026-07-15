import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* পাবলিক হেডার */}
      <main className="flex-grow">
        {children}
      </main>
      <Footer /> {/* পাবলিক ফুটার */}
    </div>
  );
}