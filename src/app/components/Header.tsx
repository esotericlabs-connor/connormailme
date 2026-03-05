import { Moon, Sun, Shield, MapPin, Globe, Menu, X, Home, User, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";

interface IPInfo {
  ip: string;
  location: string;
  vpnDetected: boolean;
}

export function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [ipInfo, setIpInfo] = useState<IPInfo>({
    ip: "Loading...",
    location: "Loading...",
    vpnDetected: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Simulate fetching IP info
    // In production, this would call an actual API like ipapi.co or similar
    setTimeout(() => {
      setIpInfo({
        ip: "192.168.1.100",
        location: "Seattle, WA",
        vpnDetected: false,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  const isHome = location.pathname === "/";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#1a2332] dark:bg-[#0f1419] transition-colors duration-300 shadow-lg"
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Hamburger Menu Button - Mobile Only */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-200 hover:text-[#5a7fa4] transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* IP Info - Left side on desktop, hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex items-center gap-4 text-xs text-gray-200"
          >
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#3d5a80] dark:text-[#5a7fa4]" />
              <span className="font-mono">{ipInfo.ip}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#3d5a80] dark:text-[#5a7fa4]" />
              <span>{ipInfo.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield
                className={`w-3.5 h-3.5 ${
                  ipInfo.vpnDetected ? "text-red-400" : "text-green-400"
                }`}
              />
              <span
                className={`font-semibold ${
                  ipInfo.vpnDetected ? "text-red-400" : "text-green-400"
                }`}
              >
                {isLoading ? "..." : ipInfo.vpnDetected ? "VPN" : "Direct"}
              </span>
            </div>
          </motion.div>

          {/* Navigation - Center on desktop, mobile menu */}
          <ul className="hidden lg:flex items-center gap-8">
            {isHome ? (
              <>
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 flex items-center gap-2 group"
                    title="Home"
                  >
                    <Home className="w-5 h-5" />
                    <span className="text-sm font-medium">Home</span>
                  </button>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 flex items-center gap-2 group"
                    title="About"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">About</span>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/esotericlabs-connor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 flex items-center gap-2 group"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/connor-remsen1199/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 flex items-center gap-2 group"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://form.jotform.com/260608732697063"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 flex items-center gap-2 group"
                    title="Contact"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm font-medium">Contact</span>
                  </a>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/"
                  className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 flex items-center gap-2 group font-semibold"
                >
                  <Home className="w-5 h-5" />
                  <span className="text-sm">Back to Home</span>
                </Link>
              </li>
            )}
          </ul>

          {/* Logo/Title - Center on mobile */}
          <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2 text-gray-200 font-bold text-lg">
            CR
          </div>

          {/* Theme Toggle - Right side */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#1a2332] dark:bg-[#0f1419] border-t border-gray-700"
          >
            <div className="container mx-auto px-4 py-4">
              {/* IP Info in mobile menu */}
              <div className="mb-4 pb-4 border-b border-gray-700">
                <div className="flex flex-col gap-2 text-xs text-gray-200">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[#3d5a80] dark:text-[#5a7fa4]" />
                    <span className="font-mono">{ipInfo.ip}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#3d5a80] dark:text-[#5a7fa4]" />
                    <span>{ipInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield
                      className={`w-3.5 h-3.5 ${
                        ipInfo.vpnDetected ? "text-red-400" : "text-green-400"
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        ipInfo.vpnDetected ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {isLoading ? "..." : ipInfo.vpnDetected ? "VPN" : "Direct"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <ul className="flex flex-col gap-4">
                {isHome ? (
                  <>
                    <li>
                      <button
                        onClick={() => scrollToSection("home")}
                        className="flex items-center gap-3 w-full text-left text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 font-semibold py-2"
                      >
                        <Home className="w-5 h-5" />
                        <span>Home</span>
                      </button>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        className="flex items-center gap-3 text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 font-semibold py-2"
                      >
                        <User className="w-5 h-5" />
                        <span>About</span>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://github.com/esotericlabs-connor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 font-semibold py-2"
                      >
                        <Github className="w-5 h-5" />
                        <span>GitHub</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/connor-remsen1199/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 font-semibold py-2"
                      >
                        <Linkedin className="w-5 h-5" />
                        <span>LinkedIn</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://form.jotform.com/260608732697063"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 font-semibold py-2"
                      >
                        <Mail className="w-5 h-5" />
                        <span>Contact</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      to="/"
                      className="flex items-center gap-3 text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 font-semibold py-2"
                    >
                      <Home className="w-5 h-5" />
                      <span>Back to Home</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
