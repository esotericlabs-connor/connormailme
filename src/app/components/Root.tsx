import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { motion } from "motion/react";

function BackgroundCanvas() {
  const { isDarkMode } = useTheme();
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10">
      <motion.div
        initial={{ opacity: isDarkMode ? 1 : 0 }}
        animate={{ opacity: isDarkMode ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: "url(/assets/seattle-night.jpg)", backgroundPosition: "center 40%" }}
      />
      <motion.div
        initial={{ opacity: isDarkMode ? 0 : 1 }}
        animate={{ opacity: isDarkMode ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: "url(/assets/seattle-day.jpg)", backgroundPosition: "center 40%" }}
      />
    </div>
  );
}

export function Root() {
  return (
    <ThemeProvider>
      <BackgroundCanvas />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
