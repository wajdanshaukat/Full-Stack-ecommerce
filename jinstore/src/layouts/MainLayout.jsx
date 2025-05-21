import { Outlet } from "react-router-dom";
import Navbar from "../interface/components/Navbar";
import Footer from "../interface/components/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
