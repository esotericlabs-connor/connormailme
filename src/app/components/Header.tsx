import { Moon, Sun, Shield, MapPin, Globe, Menu, X, Home, User, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { navLinks } from "../../config";

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
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const fetchIPInfo = async () => {
      try {
        // Step 1: get public IP from a highly-compatible endpoint
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipRes.json();

        // Step 2: location lookup using the explicit IP
        let location = "Unknown";
        try {
          const locRes = await fetch(`https://ipapi.co/${ip}/json/`);
          const locData = await locRes.json();
          const city: string = locData.city ?? "";
          const region: string = locData.region_code ?? locData.region ?? "";
          location =
            city && region
              ? `${city}, ${region}`
              : city || region || locData.country_name || "Unknown";
        } catch {
          // location lookup failed, leave as Unknown
        }

        // Step 3: VPN / proxy detection
        let vpnDetected = false;
        try {
          const vpnRes = await fetch(
            `https://proxycheck.io/v2/${ip}?vpn=1&asn=1`
          );
          const vpnData = await vpnRes.json();
          if (vpnData[ip]) {
            vpnDetected = vpnData[ip].proxy === "yes";
          }
        } catch {
          // VPN check failed, default to false
        }

        setIpInfo({ ip, location, vpnDetected });
      } catch {
        setIpInfo({ ip: "Unknown", location: "Unknown", vpnDetected: false });
      } finally {
        setIsLoading(false);
      }
    };

    fetchIPInfo();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  const isHome = location.pathname === "/";

  const vpnLabel = isLoading ? "..." : ipInfo.vpnDetected ? "VPN On" : "VPN Off";
  const vpnColor = ipInfo.vpnDetected ? "text-red-400" : "text-green-400";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#1a2332] dark:bg-[#0f1419] transition-colors duration-300 shadow-lg"
    >
      <nav className="container mx-auto px-4">
        {/* 3-column grid so nav is always truly centered */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16">

          {/* LEFT — IP info (desktop) / hamburger (mobile) */}
          <div className="flex items-center">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-200 hover:text-[#5a7fa4] transition-colors z-50"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* IP info — desktop only */}
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
                <Shield className={`w-3.5 h-3.5 ${vpnColor}`} />
                <span className={`font-semibold ${vpnColor}`}>{vpnLabel}</span>
              </div>
            </motion.div>
          </div>

          {/* CENTER — navigation */}
          <div className="lg:hidden absolute left-1/2 -translate-x-1/2 text-gray-200 font-bold text-lg">
            CR
          </div>
          <ul className="hidden lg:flex items-center gap-8">
            {isHome ? (
              <>
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 flex items-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    <span className="text-sm font-medium">Home</span>
                  </button>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 flex items-center gap-2"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">About</span>
                  </Link>
                </li>
                <li>
                  <a
                    href={navLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href={navLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 flex items-center gap-2"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href={navLinks.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 flex items-center gap-2"
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
                  className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-300 flex items-center gap-2 font-semibold"
                >
                  <Home className="w-5 h-5" />
                  <span className="text-sm">Back to Home</span>
                </Link>
              </li>
            )}
          </ul>

          {/* RIGHT — theme toggle */}
          <div className="flex justify-end">
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
        </div>
      </nav>

      {/* Mobile menu overlay */}
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
              {/* IP info in mobile menu */}
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
                    <Shield className={`w-3.5 h-3.5 ${vpnColor}`} />
                    <span className={`font-semibold ${vpnColor}`}>{vpnLabel}</span>
                  </div>
                </div>
              </div>

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
                        href={navLinks.github}
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
                        href={navLinks.linkedin}
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
                        href={navLinks.contact}
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
