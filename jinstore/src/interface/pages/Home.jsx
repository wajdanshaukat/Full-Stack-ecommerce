import HeroBanner from "../../interface/components/HeroBanner";
import CategoryRow from "../../interface/components/CategoryRow";
import PromoBanner from "../../interface/components/PromoBanner";
import CategoryProductsSection from "../../interface/components/CategoryProducts";
import BestSellersSection from "../../interface/components/BestSeller";
import BlogSection from "../../interface/components/BlogSection";
import CategorySidebar from "../../interface/components/CategorySidebar";
import ServiceHighlights from "../../interface/components/ServiceHighlights";

function Home() {
  return (
    <div className="font-sans text-gray-800">
      <div className="flex gap-6 px-4 mt-4">
        <CategorySidebar />
        <HeroBanner />
      </div>
      <ServiceHighlights />
      <CategoryRow />
      <BestSellersSection />
      <PromoBanner />
      <CategoryProductsSection />
      <BlogSection />
    </div>
  );
}

export default Home;
