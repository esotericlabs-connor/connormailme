import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "../../config";

export function Projects() {
  return (
    <section
      id="github"
      className="py-20 px-4 bg-gray-100 dark:bg-[#24293a] transition-colors duration-150"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100"
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-[#1a1f2e] rounded-lg overflow-hidden shadow-md border border-gray-300 dark:border-[#3d5a80] transition-all duration-300 hover:border-[#5a7fa4] hover:shadow-[0_0_18px_rgba(61,90,128,0.45)]"
            >
              <div className="relative h-48 overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0f1419] dark:to-[#1a1f2e] p-8">
                <img
                  src={project.logo}
                  alt={project.title}
                  loading="eager"
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {project.title}
                  </h3>
                  <Github className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-[#5a7fa4] transition-colors duration-150" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex items-center gap-1 text-[#3d5a80] dark:text-[#5a7fa4] font-semibold">
                  View on GitHub
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
