import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { motion } from "motion/react";

export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      <section className="py-16 px-4 bg-white dark:bg-[#1a1f2e] transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-3xl text-center"
        >
          <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
            Seattle-based specialist in IT infrastructure, security operations, and private AI intelligence.
            With a focus on robust, efficient solutions, I help clients streamline their systems, maintain control,
            and protect their digital assets with cutting-edge security practices.
          </p>
        </motion.div>
      </section>

      <Projects />
    </motion.div>
  );
}