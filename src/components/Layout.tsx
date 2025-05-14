
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { usePageTransition } from "@/lib/animation";

export default function Layout() {
  // Apply page transition effect
  usePageTransition();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow opacity-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
