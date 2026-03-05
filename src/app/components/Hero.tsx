import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider";
import seattleDay from "figma:asset/89770c053ab8d9f481051aa6755ec38b7b90eda6.png";
import seattleNight from "figma:asset/242c319a6863321a8ec66d8411d7da7476c955fd.png";

export function Hero() {
  const { isDarkMode } = useTheme();
  
  return (
    <section
      id="home"
      className="relative min-h-[80vh] flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background Images with Fade Transition */}
      <AnimatePresence mode="wait">
        {isDarkMode ? (
          <motion.div
            key="dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${seattleNight})`,
              backgroundPosition: "center center",
            }}
          />
        ) : (
          <motion.div
            key="light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${seattleDay})`,
              backgroundPosition: "center center",
            }}
          />
        )}
      </AnimatePresence>

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
          Connor Remsen
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl lg:text-2xl text-white mb-6 md:mb-8"
        >
          Freelance IT & Security Engineer
        </motion.p>
        <motion.a
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://form.jotform.com/260608732697063"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 md:px-8 py-2.5 md:py-3 bg-[#3d5a80] hover:bg-[#2d5a4a] text-white font-semibold rounded-lg transition-colors duration-300"
        >
          Request Support
        </motion.a>
      </motion.div>

      {/* Animated geometric decoration */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute right-10 bottom-10 w-32 h-32 border-4 border-white/20 rounded-lg opacity-30 hidden lg:block"
        style={{ transform: "rotate(45deg)" }}
      />
    </section>
  );
}
