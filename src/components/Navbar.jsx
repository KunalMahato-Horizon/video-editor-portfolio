"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Globe, Sparkles, Clock } from "lucide-react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Navbar visibility control
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Services", href: "#services", icon: "⚡" },
    { name: "Projects", href: "#projects", icon: "🎬" },
    { name: "Archive", href: "#gallery", icon: "📁" },
    { name: "About", href: "#about", icon: "👤" },
    { name: "Contact", href: "#contact", icon: "✉️" },
  ];

  const socialLinks = [
    { name: "IG", full: "Instagram", href: "#", color: "hover:text-pink-500" },
    { name: "TW", full: "Twitter", href: "#", color: "hover:text-blue-400" },
    { name: "YT", full: "YouTube", href: "#", color: "hover:text-red-500" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-[100] px-6 lg:px-12 py-4 transition-all duration-500 ${
          lastScrollY > 50 
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl" 
            : "bg-transparent py-6"
        }`}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent pointer-events-none" />

        {/* Scroll Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 origin-left z-[101]"
          style={{ scaleX }}
        />

        <div className="container mx-auto flex justify-between items-center relative z-10">
          {/* Logo & Brand */}
          <motion.div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-white/90 text-black rounded-xl flex items-center justify-center font-black italic transition-all group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:text-white shadow-xl shadow-black/20">
                F
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black tracking-[0.3em] uppercase leading-none">Frame Level</span>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Live</span>
                </div>
                <div className="h-3 w-px bg-white/10" />
                <div className="flex items-center gap-1">
                  <Clock size={8} className="text-zinc-500" />
                  <span className="text-[8px] font-mono text-zinc-500">{currentTime}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <div className="flex items-center gap-10 border-r border-white/10 pr-10">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                      {link.icon}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">
                      {link.name}
                    </span>
                  </div>
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-blue-500 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredLink === link.name ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
            
            {/* CTA Button */}
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group overflow-hidden"
            >
              <div className="flex items-center gap-3 bg-white text-black hover:text-white text-[10px] font-bold uppercase tracking-widest px-8 py-3 rounded-full transition-all shadow-xl shadow-blue-500/10">
                <span className="relative z-10 flex items-center gap-2">
                  Start Project
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowUpRight size={14} />
                  </motion.div>
                </span>
              </div>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button 
            className="lg:hidden relative w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 text-white active:scale-90 transition-all group"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute inset-0 rounded-xl border border-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/95 lg:hidden"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-500/10 rounded-full blur-md" />
              <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-cyan-500/10 rounded-full blur-md" />
            </div>

            <div className="relative h-full flex flex-col justify-between p-8 sm:p-16">
              {/* Main Menu Links */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-10">
                  <Sparkles size={12} className="text-blue-500" />
                  <p className="text-blue-400 font-mono text-[10px] tracking-[0.5em] uppercase">
                    NAVIGATION
                  </p>
                </div>
                
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center gap-4 py-4"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <span className="text-blue-500 text-sm">{link.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-4xl sm:text-5xl font-black uppercase tracking-tighter group-hover:text-blue-500 transition-colors">
                          {link.name}
                        </div>
                        <motion.div 
                          className="h-px bg-gradient-to-r from-blue-500 to-transparent"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowUpRight size={20} className="text-blue-500" />
                      </motion.div>
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="pt-12 border-t border-white/10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
                  {/* Social Links */}
                  <div className="space-y-4">
                    <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-widest">
                      SOCIAL CONNECTION
                    </p>
                    <div className="flex gap-6">
                      {socialLinks.map((link) => (
                        <motion.a
                          key={link.name}
                          href={link.href}
                          whileHover={{ y: -3 }}
                          className={`text-sm font-bold uppercase tracking-widest text-zinc-500 ${link.color} transition-colors`}
                        >
                          {link.name}
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Location & Time */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5">
                      <Globe size={14} className="text-blue-500" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-zinc-400">Guwahati, India</div>
                      <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">
                        {currentTime} • 2026
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile CTA */}
                <motion.a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl"
                >
                  Start A Project
                  <ArrowUpRight size={16} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;