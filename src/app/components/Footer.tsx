import { Github, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "./ThemeProvider";

export function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer className="relative text-gray-200 py-8 overflow-hidden">
      {/* Cross-fading Seattle background */}
      <motion.div
        animate={{ opacity: isDarkMode ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/seattle-night.jpg)" }}
      />
      <motion.div
        animate={{ opacity: isDarkMode ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/seattle-day.jpg)" }}
      />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-6 mb-4"
        >
          <motion.a
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/esotericlabs-connor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            href="https://www.linkedin.com/in/connor-remsen1199/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
        </motion.div>
        <p className="text-sm text-gray-300">
          &copy; 2026 Connor Remsen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}