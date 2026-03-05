import { motion, AnimatePresence } from "motion/react";
import { Shield, Server, Brain, Lock, Code, Users } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import seattleDay from "figma:asset/89770c053ab8d9f481051aa6755ec38b7b90eda6.png";
import seattleNight from "figma:asset/242c319a6863321a8ec66d8411d7da7476c955fd.png";

const expertise = [
  {
    icon: Shield,
    title: "Security Operations",
    description: "Comprehensive security audits, threat detection, and incident response",
  },
  {
    icon: Server,
    title: "IT Infrastructure",
    description: "Design and implementation of scalable, reliable infrastructure solutions",
  },
  {
    icon: Brain,
    title: "Private AI Intelligence",
    description: "Secure, on-premise AI systems that protect your data sovereignty",
  },
  {
    icon: Lock,
    title: "Data Protection",
    description: "Advanced encryption and access control strategies",
  },
  {
    icon: Code,
    title: "System Automation",
    description: "Efficient workflows and infrastructure as code",
  },
  {
    icon: Users,
    title: "Consulting Services",
    description: "Expert guidance on security best practices and compliance",
  },
];

export function About() {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16"
    >
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        {/* Background Images with Fade Transition */}
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="dark-about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${seattleNight})`,
                backgroundPosition: "center center",
              }}
            />
          ) : (
            <motion.div
              key="light-about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${seattleDay})`,
                backgroundPosition: "center center",
              }}
            />
          )}
        </AnimatePresence>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
          >
            About Me
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white leading-relaxed px-4"
          >
            Passionate about building secure, resilient systems that empower businesses
            to thrive in an increasingly complex digital landscape.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-white dark:bg-[#1a1f2e] transition-colors duration-300">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Building Secure Solutions
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Based in Seattle, I specialize in creating robust IT infrastructure and security
              solutions that meet the challenges of modern enterprises. With years of experience
              in security operations, network architecture, and private AI systems, I help
              organizations protect their most valuable assets while maintaining operational
              efficiency.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              My approach combines deep technical expertise with a practical understanding of
              business needs. Whether you're looking to secure your infrastructure, implement
              private AI solutions, or streamline your operations, I deliver solutions that are
              both technically sound and business-aligned.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              I believe in the power of open-source software and contribute to the community
              through projects like OpenKeyFlow and MONOLITH, helping others build more secure
              and efficient systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-[#24293a] transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100"
          >
            Areas of Expertise
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="p-6 bg-white dark:bg-[#1a1f2e] rounded-lg shadow-md hover:shadow-lg border border-gray-300 dark:border-[#3d5a80] transition-all duration-300"
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
      <section className="py-20 px-4 bg-white dark:bg-[#1a1f2e] transition-colors duration-300">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Let's Work Together
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Ready to enhance your security posture or optimize your infrastructure?
              Get in touch to discuss how I can help your organization succeed.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://form.jotform.com/260608732697063"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-[#3d5a80] hover:bg-[#2d5a4a] text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}