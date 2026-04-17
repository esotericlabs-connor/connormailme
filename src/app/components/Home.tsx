import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { motion } from "motion/react";
import { personal } from "../../config";

export function Home() {
  return (
    <div>
      <Hero />

      <section className="py-16 px-4 bg-white dark:bg-[#1a1f2e] transition-colors duration-150">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto max-w-3xl text-center"
        >
          <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
            {personal.tagline}
          </p>
        </motion.div>
      </section>

      <Projects />
    </div>
  );
}
