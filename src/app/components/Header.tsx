import {
  Moon, Sun, MapPin, Globe, Menu, X,
  Home, User, Github, Mail,
  Clock, Wind, Cloud, CloudRain, CloudSnow, Zap, CloudDrizzle,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { navLinks } from "../../config";

interface IPInfo {
  ip: string;
  location: string;
}

interface WeatherInfo {
  temp: number;
  code: number;
}

function WeatherIcon({ code }: { code: number }) {
  const cls = "w-3.5 h-3.5";
  if (code <= 2)  return <Sun className={`${cls} text-yellow-500 dark:text-yellow-400`} />;
  if (code === 3) return <Cloud className={`${cls} text-[#3d5a80] dark:text-[#5a7fa4]`} />;
  if (code <= 48) return <Wind className={`${cls} text-[#3d5a80] dark:text-[#5a7fa4]`} />;
  if (code <= 57) return <CloudDrizzle className={`${cls} text-blue-500 dark:text-blue-400`} />;
  if (code <= 67) return <CloudRain className={`${cls} text-blue-500 dark:text-blue-400`} />;
  if (code <= 77) return <CloudSnow className={`${cls} text-blue-300 dark:text-blue-200`} />;
  if (code <= 82) return <CloudRain className={`${cls} text-blue-500 dark:text-blue-400`} />;
  if (code <= 86) return <CloudSnow className={`${cls} text-blue-300 dark:text-blue-200`} />;
  return <Zap className={`${cls} text-yellow-500 dark:text-yellow-400`} />;
}

function aqiColor(aqi: number) {
  if (aqi <= 50)  return "text-green-600 dark:text-green-400";
  if (aqi <= 100) return "text-yellow-600 dark:text-yellow-400";
  if (aqi <= 150) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
}

export function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [ipInfo, setIpInfo] = useState<IPInfo>({
    ip: "—",
    location: "—",
  });
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [aqi, setAqi] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Live clock — updates every second
  useEffect(() => {
    const tick = () =>
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipRes.json();

        let locationStr = "Unknown";
        let lat: number | null = null;
        let lon: number | null = null;
        try {
          const locRes = await fetch(`https://ipapi.co/${ip}/json/`);
          const locData = await locRes.json();
          const city: string = locData.city ?? "";
          const region: string = locData.region_code ?? locData.region ?? "";
          locationStr =
            city && region
              ? `${city}, ${region}`
              : city || region || locData.country_name || "Unknown";
          lat = locData.latitude;
          lon = locData.longitude;
        } catch { /* location failed */ }

        if (lat !== null && lon !== null) {
          try {
            const wRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`
            );
            const wData = await wRes.json();
            if (wData.current) {
              setWeather({ temp: Math.round(wData.current.temperature_2m), code: wData.current.weather_code });
            }
          } catch { /* weather failed */ }

          try {
            const aqiRes = await fetch(
              `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`
            );
            const aqiData = await aqiRes.json();
            if (aqiData.current?.us_aqi !== undefined) setAqi(aqiData.current.us_aqi);
          } catch { /* aqi failed */ }
        }

        setIpInfo({ ip, location: locationStr });
      } catch {
        setIpInfo({ ip: "—", location: "—" });
      }
    };
    fetchAll();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  };

  const isHome = location.pathname === "/";
  const navLinkClass =
    "text-[#1a2332] dark:text-gray-200 hover:text-[#3d5a80] dark:hover:text-[#5a7fa4] transition-colors duration-300 flex items-center gap-2";
  const mobileLinkClass =
    "flex items-center gap-3 text-[#1a2332] dark:text-gray-200 hover:text-[#3d5a80] dark:hover:text-[#5a7fa4] transition-colors duration-300 font-semibold py-2";
  const sharedNavItems = [
    { label: "About",   Icon: User,   to: "/about",        external: false },
    { label: "GitHub",  Icon: Github, to: navLinks.github,  external: true  },
    { label: "Contact", Icon: Mail,   to: navLinks.contact, external: true  },
  ] as const;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0f1419] border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 shadow-sm dark:shadow-lg"
    >
      <nav className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center min-h-[56px]">

          {/* LEFT — two-row status (desktop) / hamburger (mobile) */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#1a2332] dark:text-gray-200 hover:text-[#3d5a80] dark:hover:text-[#5a7fa4] transition-colors z-50"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:flex flex-col gap-1 text-xs text-[#1a2332] dark:text-gray-200"
            >
              {/* TOP ROW: Time, Weather, AQI */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#3d5a80] dark:text-[#5a7fa4]" />
                  <span className="font-mono">{currentTime}</span>
                </div>
                {weather ? (
                  <div className="flex items-center gap-1.5">
                    <WeatherIcon code={weather.code} />
                    <span>{weather.temp}°F</span>
                  </div>
                ) : (
                  <span>—°F</span>
                )}
                {aqi !== null ? (
                  <div className="flex items-center gap-1.5">
                    <Wind className={`w-3.5 h-3.5 ${aqiColor(aqi)}`} />
                    <span className={`font-semibold ${aqiColor(aqi)}`}>AQI {aqi}</span>
                  </div>
                ) : (
                  <span>AQI —</span>
                )}
              </div>

              {/* BOTTOM ROW: IP, Location */}
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
            </motion.div>
          </div>

          {/* CENTER — navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            <li>
              {isHome ? (
                <button onClick={() => scrollToSection("home")} className={navLinkClass}>
                  <Home className="w-5 h-5" />
                  <span className="text-sm font-medium">Home</span>
                </button>
              ) : (
                <Link to="/" className={navLinkClass}>
                  <Home className="w-5 h-5" />
                  <span className="text-sm font-medium">Home</span>
                </Link>
              )}
            </li>
            {sharedNavItems.map(({ label, Icon, to, external }) => (
              <li key={label}>
                {external ? (
                  <a href={to} target="_blank" rel="noopener noreferrer" className={navLinkClass}>
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{label}</span>
                  </a>
                ) : (
                  <Link to={to} className={navLinkClass}>
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* RIGHT — theme toggle */}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 text-[#1a2332] dark:text-gray-200 hover:text-[#3d5a80] dark:hover:text-[#5a7fa4] transition-colors duration-300"
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
            className="lg:hidden bg-white dark:bg-[#0f1419] border-t border-gray-200 dark:border-gray-700"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 flex flex-col gap-2 text-xs text-[#1a2332] dark:text-gray-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#3d5a80] dark:text-[#5a7fa4]" />
                  <span className="font-mono">{currentTime}</span>
                </div>
                {weather ? (
                  <div className="flex items-center gap-2">
                    <WeatherIcon code={weather.code} />
                    <span>{weather.temp}°F</span>
                  </div>
                ) : (
                  <span>—°F</span>
                )}
                {aqi !== null ? (
                  <div className="flex items-center gap-2">
                    <Wind className={`w-3.5 h-3.5 ${aqiColor(aqi)}`} />
                    <span className={`font-semibold ${aqiColor(aqi)}`}>AQI {aqi}</span>
                  </div>
                ) : (
                  <span>AQI —</span>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <Globe className="w-3.5 h-3.5 text-[#3d5a80] dark:text-[#5a7fa4]" />
                  <span className="font-mono">{ipInfo.ip}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#3d5a80] dark:text-[#5a7fa4]" />
                  <span>{ipInfo.location}</span>
                </div>
              </div>

              <ul className="flex flex-col gap-4">
                <li>
                  {isHome ? (
                    <button
                      onClick={() => scrollToSection("home")}
                      className="flex items-center gap-3 w-full text-left text-[#1a2332] dark:text-gray-200 hover:text-[#3d5a80] dark:hover:text-[#5a7fa4] transition-colors duration-300 font-semibold py-2"
                    >
                      <Home className="w-5 h-5" /><span>Home</span>
                    </button>
                  ) : (
                    <Link to="/" className="flex items-center gap-3 text-[#1a2332] dark:text-gray-200 hover:text-[#3d5a80] dark:hover:text-[#5a7fa4] transition-colors duration-300 font-semibold py-2">
                      <Home className="w-5 h-5" /><span>Home</span>
                    </Link>
                  )}
                </li>
                {sharedNavItems.map(({ label, Icon, to, external }) => (
                  <li key={label}>
                    {external ? (
                      <a href={to} target="_blank" rel="noopener noreferrer" className={mobileLinkClass}>
                        <Icon className="w-5 h-5" /><span>{label}</span>
                      </a>
                    ) : (
                      <Link to={to} className={mobileLinkClass}>
                        <Icon className="w-5 h-5" /><span>{label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
