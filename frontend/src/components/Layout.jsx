import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;

// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { Outlet } from "react-router-dom";

// function Layout() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Top Navbar */}
//       <Navbar />

//       {/* Page Content */}
//       <main className="flex-grow p-4">
//         <Outlet />
//       </main>

//       {/* Bottom Footer */}
//       <Footer />
//     </div>
//   );
// }

// export default Layout;

