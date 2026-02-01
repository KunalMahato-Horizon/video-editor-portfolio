"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { Film, Zap, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ContentMarquee = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  // const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    if (isInView) controls.start("visible");
    return () => window.removeEventListener("resize", checkMobile);
  }, [isInView, controls]);

  const column1 = [
    { type: "Short", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000", title: "Tech Review", views: "2.4M", category: "Tech" },
    { type: "Long", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000", title: "Travel Doc", views: "1.1M", category: "Travel" },
    { type: "Short", img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000", title: "Fitness Hook", views: "5.7M", category: "Fitness" },
    // Duplicate for seamless loop
    { type: "Short", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000", title: "Tech Review", views: "2.4M", category: "Tech" },
    { type: "Long", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000", title: "Travel Doc", views: "1.1M", category: "Travel" },
  ];

  const column2 = [
    { type: "Thumb", img: "https://images.unsplash.com/photo-1542744173-8e7e5381be6e?q=80&w=1000", title: "Finance Hook", ctr: "12.4%", category: "Finance" },
    { type: "Thumb", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000", title: "Gaming UI", ctr: "14.2%", category: "Gaming" },
    { type: "Thumb", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000", title: "Podcast Cover", ctr: "11.8%", category: "Podcast" },
    // Duplicate for seamless loop
    { type: "Thumb", img: "https://images.unsplash.com/photo-1542744173-8e7e5381be6e?q=80&w=1000", title: "Finance Hook", ctr: "12.4%", category: "Finance" },
    { type: "Thumb", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000", title: "Gaming UI", ctr: "14.2%", category: "Gaming" },
  ];

  return (
    <section ref={containerRef} className="bg-[#050505] py-20 lg:py-32 overflow-hidden relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Side: Sticky Text */}
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:space-y-10"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-px bg-blue-500" />
                <span className="text-blue-500 font-mono text-xs tracking-[0.3em] uppercase">The Engine</span>
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                MASSIVE <br />
                <span className="text-transparent outline-text">VOLUME</span> <br />
                ELITE QUALITY.
              </h2>
            </div>

            <p className="text-zinc-400 text-base lg:text-lg max-w-sm leading-relaxed border-l-2 border-blue-500/20 pl-6">
              I build the high-retention visual assets that power modern creators across all platforms.
            </p>

            {/* Stats - Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-8 border-y border-white/5">
              {[
                { label: "Projects", value: "240+", icon: <Film size={14} /> },
                { label: "Views", value: "500M+", icon: <TrendingUp size={14} /> },
                { label: "CTR", value: "12.4%", icon: <Zap size={14} /> },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-blue-500 uppercase font-mono text-[10px] tracking-widest">
                    {stat.icon} {stat.label}
                  </div>
                  <div className="text-2xl font-black italic">{stat.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: The Moving Marquee */}
          <div className="relative h-[500px] lg:h-[800px] flex gap-4 lg:gap-6 overflow-hidden rounded-3xl p-2 lg:p-4 border border-white/5 bg-white/[0.02]">
            {/* Column 1: Up */}
            <div className="w-1/2 overflow-hidden rounded-2xl">
              <motion.div 
                animate={{ y: [0, -800] }}
                transition={{ duration: isMobile ? 25 : 35, repeat: Infinity, ease: "linear" }}
                className="flex flex-col gap-4 lg:gap-6"
              >
                {column1.map((item, idx) => (
                  <div key={idx} className="relative aspect-[9/16] rounded-xl lg:rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 group">
                    <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-4 flex flex-col justify-end">
                      <span className="text-[9px] font-mono text-blue-500 uppercase">{item.type}</span>
                      <h4 className="text-xs lg:text-sm font-bold uppercase">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Column 2: Down */}
            <div className="w-1/2 overflow-hidden rounded-2xl">
              <motion.div 
                animate={{ y: [-800, 0] }}
                transition={{ duration: isMobile ? 30 : 40, repeat: Infinity, ease: "linear" }}
                className="flex flex-col gap-4 lg:gap-6"
              >
                {column2.map((item, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-xl lg:rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 group">
                    <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-4 flex flex-col justify-end">
                      <span className="text-[9px] font-mono text-amber-500 uppercase">Thumb</span>
                      <h4 className="text-xs lg:text-sm font-bold uppercase">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.08);
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default ContentMarquee;