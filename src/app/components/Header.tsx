import { Moon, Sun, MapPin, Globe, Menu, X, Home, User, Github, Linkedin, Mail, Cloud, CloudRain, CloudSnow, CloudSun, CloudLightning, Clock } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useEffect, useState, type ComponentType } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { navLinks } from "../../config";

interface IPInfo {
  ip: string;
  location: string;
  timezone: string;
  latitude: number;
  longitude: number;
}

interface WeatherInfo {
  tempF: number;
  code: number;
}

function weatherIcon(code: number): ComponentType<{ className?: string }> {
  if (code === 0) return Sun;
  if (code <= 2) return CloudSun;
  if (code === 3 || (code >= 45 && code <= 48)) return Cloud;
  if (code >= 51 && code <= 67) return CloudRain;
  if (code >= 80 && code <= 82) return CloudRain;
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return CloudSnow;
  return CloudLightning;
}

export function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [ipInfo, setIpInfo] = useState<IPInfo>({
    ip: "Loading...",
    location: "Loading...",
    timezone: "",
    latitude: 0,
    longitude: 0,
  });
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [localTime, setLocalTime] = useState<string>("");
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
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipRes.json();

        let location = "Unknown";
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let latitude = 0;
        let longitude = 0;
        try {
          const locRes = await fetch(`https://ipapi.co/${ip}/json/`);
          const locData = await locRes.json();
          const city: string = locData.city ?? "";
          const region: string = locData.region_code ?? locData.region ?? "";
          location =
            city && region
              ? `${city}, ${region}`
              : city || region || locData.country_name || "Unknown";
          timezone = locData.timezone || timezone;
          latitude = locData.latitude ?? 0;
          longitude = locData.longitude ?? 0;
        } catch {
          // location lookup failed
        }

        setIpInfo({ ip, location, timezone, latitude, longitude });

        // Fetch weather from Open-Meteo (free, no key required)
        if (latitude && longitude) {
          try {
            const wRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`
            );
            const wData = await wRes.json();
            if (wData.current_weather) {
              setWeather({
                tempF: Math.round(wData.current_weather.temperature),
                code: wData.current_weather.weathercode,
              });
            }
          } catch {
            // weather fetch failed, show nothing
          }
        }
      } catch {
        setIpInfo({ ip: "Unknown", location: "Unknown", timezone: "", latitude: 0, longitude: 0 });
      }
    };

    fetchIPInfo();
  }, []);

  // Live clock ticking in the visitor's detected timezone
  useEffect(() => {
    const tick = () => {
      if (!ipInfo.timezone) return;
      setLocalTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: ipInfo.timezone,
        }).format(new Date())
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [ipInfo.timezone]);

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
      className="fixed top-0 left-0 right-0 z-50 bg-[#1a2332] dark:bg-[#0f1419] transition-colors duration-150 shadow-lg"
    >
      <nav className="px-4 md:px-6">
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

            {/* IP info — desktop only, 2-row stacked layout */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:flex flex-col justify-center gap-0.5 text-sm text-gray-200"
            >
              {/* Row 1: IP + Location */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#3d5a80] dark:text-[#5a7fa4]" />
                  <span className="font-mono">{ipInfo.ip}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#3d5a80] dark:text-[#5a7fa4]" />
                  <span>{ipInfo.location}</span>
                </div>
              </div>
              {/* Row 2: Time + Weather (renders once loaded) */}
              {(localTime || weather) && (
                <div className="flex items-center gap-4">
                  {localTime && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#3d5a80] dark:text-[#5a7fa4]" />
                      <span className="font-mono">{localTime}</span>
                    </div>
                  )}
                  {weather && (() => {
                    const WeatherIcon = weatherIcon(weather.code);
                    return (
                      <div className="flex items-center gap-1.5">
                        <WeatherIcon className="w-3.5 h-3.5 text-[#3d5a80] dark:text-[#5a7fa4]" />
                        <span>{weather.tempF}°F</span>
                      </div>
                    );
                  })()}
                </div>
              )}
            </motion.div>
          </div>

          {/* CENTER — navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            <li>
              {isHome ? (
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150 flex items-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  <span className="text-sm font-medium">Home</span>
                </button>
              ) : (
                <Link
                  to="/"
                  className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150 flex items-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  <span className="text-sm font-medium">Home</span>
                </Link>
              )}
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150 flex items-center gap-2"
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
                className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150 flex items-center gap-2"
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
                className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150 flex items-center gap-2"
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
                className="text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm font-medium">Contact</span>
              </a>
            </li>
          </ul>

          {/* RIGHT — theme toggle (col-start-3 keeps it right on mobile when center nav is hidden) */}
          <div className="flex justify-end col-start-3">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150"
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
                  {localTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#3d5a80] dark:text-[#5a7fa4]" />
                      <span className="font-mono">{localTime}</span>
                    </div>
                  )}
                  {weather && (() => {
                    const WeatherIcon = weatherIcon(weather.code);
                    return (
                      <div className="flex items-center gap-2">
                        <WeatherIcon className="w-3.5 h-3.5 text-[#3d5a80] dark:text-[#5a7fa4]" />
                        <span>{weather.tempF}°F</span>
                      </div>
                    );
                  })()}
                </div>
              </div>

              <ul className="flex flex-col gap-4">
                <li>
                  {isHome ? (
                    <button
                      onClick={() => scrollToSection("home")}
                      className="flex items-center gap-3 w-full text-left text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150 font-semibold py-2"
                    >
                      <Home className="w-5 h-5" />
                      <span>Home</span>
                    </button>
                  ) : (
                    <Link
                      to="/"
                      className="flex items-center gap-3 text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150 font-semibold py-2"
                    >
                      <Home className="w-5 h-5" />
                      <span>Home</span>
                    </Link>
                  )}
                </li>
                <li>
                  <Link
                    to="/about"
                    className="flex items-center gap-3 text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150 font-semibold py-2"
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
                    className="flex items-center gap-3 text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150 font-semibold py-2"
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
                    className="flex items-center gap-3 text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150 font-semibold py-2"
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
                    className="flex items-center gap-3 text-gray-200 hover:text-[#5a7fa4] transition-colors duration-150 font-semibold py-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Contact</span>
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
