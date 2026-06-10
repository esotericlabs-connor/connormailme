import { motion } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { personal, hero } from "../../config";

export function Hero() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="home"
      className="relative min-h-[80vh] flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Day image — base layer, always mounted */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/assets/seattle-day.jpg)`,
        }}
      />
      {/* Night image — fades over the day image in dark mode */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/assets/seattle-night.jpg)`,
          opacity: isDarkMode ? 1 : 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 max-w-2xl mx-4 md:mx-auto px-6 md:px-8 py-8 md:py-12 text-center bg-white/10 dark:bg-black/30 rounded-lg backdrop-blur-md border border-white/20"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        >
          {personal.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl lg:text-2xl text-white mb-2"
        >
          {personal.title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="text-base md:text-lg text-white/70 mb-6 md:mb-8"
        >
          {personal.subtitle}
        </motion.p>
        <motion.a
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={hero.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 md:px-8 py-2.5 md:py-3 bg-[#3d5a80] hover:bg-[#2d4a6a] text-white font-semibold rounded-lg transition-colors duration-150"
        >
          {hero.ctaText}
        </motion.a>
      </motion.div>

    </section>
  );
}
