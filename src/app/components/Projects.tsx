import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "OpenKeyFlow",
    description: "A free, open-source text expander that boosts productivity with customizable shortcuts and cross-platform support.",
    logo: "/assets/openkeyflow-logo.png",
    link: "https://github.com/esotericlabs-connor/OpenKeyFlow",
  },
  {
    title: "MONOLITH",
    description: "A secure Linux router solution focused on privacy, performance, and comprehensive network protection.",
    logo: "/assets/monolith-logo.png",
    link: "https://github.com/esotericlabs-connor/MONOLITH",
  },
];

export function Projects() {
  return (
    <section
      id="github"
      className="py-20 px-4 bg-gray-100 dark:bg-[#24293a] transition-colors duration-300"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white dark:bg-[#1a1f2e] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-300 dark:border-[#3d5a80]"
            >
              <div className="relative h-48 overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0f1419] dark:to-[#1a1f2e] p-8">
                <img
                  src={project.logo}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {project.title}
                  </h3>
                  <Github className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-[#3d5a80] dark:group-hover:text-[#5a7fa4] transition-colors" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex items-center text-[#3d5a80] dark:text-[#5a7fa4] font-semibold group-hover:gap-2 transition-all">
                  View on GitHub
                  <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}