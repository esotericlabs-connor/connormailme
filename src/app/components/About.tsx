import { motion } from "motion/react";
import { Shield, Server, Brain, Lock, Code, Users, LucideIcon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { about, expertise } from "../../config";

const iconMap: Record<string, LucideIcon> = {
  Shield, Server, Brain, Lock, Code, Users,
};

export function About() {
  const { isDarkMode } = useTheme();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: isDarkMode ? 1 : 0 }}
          animate={{ opacity: isDarkMode ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/assets/seattle-night.jpg)`,
            backgroundPosition: "center 40%",
          }}
        />
        <motion.div
          initial={{ opacity: isDarkMode ? 0 : 1 }}
          animate={{ opacity: isDarkMode ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/seattle-day.jpg)`,
            backgroundPosition: "center 40%",
          }}
        />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
          >
            {about.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-lg md:text-xl text-white leading-relaxed px-4"
          >
            {about.subheading}
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-white dark:bg-[#1a1f2e] transition-colors duration-150">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              {about.storyHeading}
            </h2>
            {about.storyParagraphs.map((para, i) => (
              <p key={i} className="text-gray-700 dark:text-gray-300 mb-4">
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-[#24293a] transition-colors duration-150">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100"
          >
            Areas of Expertise
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertise.map((item, index) => {
              const Icon = iconMap[item.icon] ?? Shield;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-6 bg-white dark:bg-[#1a1f2e] rounded-lg shadow-md border border-gray-300 dark:border-[#3d5a80] transition-all duration-300 hover:border-[#5a7fa4] hover:shadow-[0_0_18px_rgba(61,90,128,0.45)]"
                >
                  <Icon className="w-12 h-12 text-[#3d5a80] dark:text-[#5a7fa4] mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white dark:bg-[#1a1f2e] transition-colors duration-150">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              {about.ctaHeading}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              {about.ctaBody}
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={about.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-[#3d5a80] hover:bg-[#2d5a4a] text-white font-semibold rounded-lg transition-colors duration-150"
            >
              {about.ctaText}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
