import { Github, Linkedin } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="bg-[#1a2332] dark:bg-[#0f1419] text-gray-200 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
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
            className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300"
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
            className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300"
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