"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Maximize2, Monitor, Smartphone, Layout } from "lucide-react";

const FilmSlateServices = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Robust check for screen size
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const slates = [
    {
      id: "01",
      title: "Long-form",
      subtitle: "YouTube & Documentaries",
      img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059",
      icon: <Monitor size={24} />,
      details: ["Narrative Flow", "4K Color Grading", "Sound Design"],
      description: "Crafting 10-30 minute cinematic experiences that sustain viewer attention through expert pacing."
    },
    {
      id: "02",
      title: "Short-form",
      subtitle: "Reels & TikToks",
      img: "https://images.unsplash.com/photo-1512428559083-a40ce903395b?q=80&w=2070",
      icon: <Smartphone size={24} />,
      details: ["High-Retention Hooks", "Dynamic Subtitles", "Beat Sync"],
      description: "Aggressive, fast-paced editing designed to stop the scroll and dominate the social algorithm."
    },
    {
      id: "03",
      title: "Thumbnails",
      subtitle: "Visual Hooks",
      img: "https://images.unsplash.com/photo-1542744095-2ad4870f608e?q=80&w=2070",
      icon: <Layout size={24} />,
      details: ["CTR Optimization", "Color Theory", "Custom Graphics"],
      description: "The first thing they see. High-impact designs that turn impressions into revenue-generating views."
    }
  ];

  return (
    <section className="bg-[#050505] py-20 lg:py-32 px-6 lg:px-12 overflow-hidden">
      <div className="container mx-auto">
        <div className="mb-12 lg:mb-20">
          <span className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase block mb-4">Select Workflow</span>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            Creative <br />
            <span className="text-transparent outline-text" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>Specialties.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[700px]">
          {slates.map((slate, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{
                height: isMobile ? (expandedIndex === index ? "450px" : "80px") : "100%",
                flex: isMobile ? "none" : (expandedIndex === index ? 3 : 0.6),
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              
              // 1. Hover for Desktop Mouse Users
              onMouseEnter={() => !isMobile && setExpandedIndex(index)}
              
              // 2. Click for Touch and Large Screens (accessibility)
              onClick={() => setExpandedIndex(index)}
              
              className={`relative rounded-3xl lg:rounded-[2.5rem] overflow-hidden cursor-pointer group bg-zinc-900 border transition-colors duration-500 ${
                expandedIndex === index ? "border-blue-500/50" : "border-white/5"
              }`}
            >
              {/* Image Background */}
              <motion.img
                src={slate.img}
                alt={slate.title}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 transition-all duration-700"
                animate={{
                  scale: expandedIndex === index ? 1.05 : 1.2,
                  filter: expandedIndex === index ? "grayscale(0%)" : "grayscale(100%)",
                  opacity: expandedIndex === index ? 0.4 : 0.2,
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* VERTICAL TITLE (Shows only when NOT expanded on Desktop) */}
              {!isMobile && (
                <AnimatePresence>
                  {expandedIndex !== index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-6"
                    >
                      <div className="text-white/20 font-black text-4xl font-mono uppercase rotate-90 whitespace-nowrap tracking-tighter">
                        {slate.title}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* HORIZONTAL TITLE (Shows only when NOT expanded on Mobile) */}
              {isMobile && expandedIndex !== index && (
                <div className="absolute inset-0 flex items-center justify-between px-8">
                  <span className="text-xs font-mono text-white/40">{slate.id}</span>
                  <h3 className="text-lg font-bold uppercase tracking-tight">{slate.title}</h3>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
              )}

              {/* EXPANDED CONTENT */}
              <div className="relative h-full p-8 lg:p-12 flex flex-col justify-between overflow-hidden">
                <motion.div 
                   animate={{ 
                     opacity: expandedIndex === index ? 1 : 0,
                     y: expandedIndex === index ? 0 : 20 
                   }}
                   className="space-y-6 lg:space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 lg:p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-blue-500">
                      {slate.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">{slate.id}</span>
                      <h3 className="text-xl lg:text-4xl font-black uppercase tracking-tight">{slate.title}</h3>
                    </div>
                  </div>

                  <div className="space-y-4 lg:space-y-6 max-w-md">
                    <p className="text-sm lg:text-lg text-zinc-300 leading-relaxed font-medium">
                      {slate.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {slate.details.map((detail, i) => (
                        <span key={i} className="text-[9px] lg:text-[11px] font-mono border border-white/10 bg-white/5 px-3 py-1 rounded-full text-zinc-400 uppercase">
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* BOTTOM ACTION BAR */}
                <div className={`flex items-center lg:items-end justify-between transition-all duration-700 ${
                  expandedIndex === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}>
                  <button className="flex items-center gap-3 bg-white text-black px-6 lg:px-10 py-3 lg:py-5 rounded-full text-xs lg:text-sm font-bold hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
                    Explore Work <Play size={14} fill="currentColor" />
                  </button>
                  <div className="hidden sm:flex items-center gap-4 text-white/30 font-mono text-[10px] uppercase tracking-[0.2em]">
                    <span>{slate.subtitle}</span>
                    <div className="p-2 border border-white/10 rounded-full"><Maximize2 size={14} /></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilmSlateServices;