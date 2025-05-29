import { useState, useEffect } from "react";
import HeroBanner from "../../interface/components/HeroBanner";
import CategoryRow from "../../interface/components/CategoryRow";
import PromoBanner from "../../interface/components/PromoBanner";
import CategoryProductsSection from "../../interface/components/CategoryProducts";
import BestSellersSection from "../../interface/components/BestSeller";
import BlogSection from "../../interface/components/BlogSection";
import CategorySidebar from "../../interface/components/CategorySidebar";
import ServiceHighlights from "../../interface/components/ServiceHighlights";
import { Menu } from "lucide-react";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  return (
    <div className="font-sans text-gray-800">
      {/* Hamburger for small screens */}
      <div className="lg:hidden flex justify-between items-center px-4 mt-4">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-700">
          <Menu size={28} />
        </button>
      </div>

      {/* Layout */}
      <div className="flex gap-6 px-4 mt-4">
        {/* Sidebar for large screens */}
        <div className="hidden lg:block">
          <CategorySidebar />
        </div>
        <HeroBanner />
      </div>

      <ServiceHighlights />
      <CategoryRow />
      <BestSellersSection />
      <PromoBanner />
      <CategoryProductsSection />
      <BlogSection />

      {/* Sidebar overlay for small screens */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
          <div className="fixed top-0 left-0 w-64 h-full bg-white p-4 shadow-md z-50 overflow-y-auto">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 text-2xl"
            >
              ✕
            </button>
            <CategorySidebar />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
