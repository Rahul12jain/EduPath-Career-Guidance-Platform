import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingAIAdvisor from "./FloatingAIAdvisor";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-4">
        <Outlet />
      </main>
      <FloatingAIAdvisor />
      <Footer />
    </>
  );
}

export default Layout;
