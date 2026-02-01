"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play, Layers, Smartphone, Zap, ChevronRight } from "lucide-react";

const HorizontalServices = () => {
  const targetRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.2) setActiveIndex(0);
      else if (latest < 0.7) setActiveIndex(1);
      else setActiveIndex(2);
    });
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      unsubscribe();
    };
  }, [scrollYProgress]);

  // Desktop horizontal movement logic
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);
  const imageXParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const scrollToSection = (index) => {
    if (!targetRef.current) return;
    const totalHeight = targetRef.current.offsetHeight;
    const sectionHeight = totalHeight / (services.length + 1); 
    window.scrollTo({
      top: targetRef.current.offsetTop + (sectionHeight * index),
      behavior: "smooth"
    });
  };

  const services = [
    {
      id: "01",
      title: "Long-form Narrative",
      description: "Documentaries & YouTube Storytelling",
      details: "Pacing that keeps viewers watching until the last second. Expert assembly, sound design, and cinematic color grading.",
      icon: <Layers size={20} className="text-blue-400" />,
      img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059",
      aspect: "aspect-video",
      features: ["Pacing Analysis", "Sound Design", "Color Grading", "Narrative Structure"]
    },
    {
      id: "02",
      title: "Vertical Social",
      description: "Shorts, Reels & TikToks",
      details: "High-retention editing with dynamic captions and psychological hooks. Optimized for the 2026 social algorithm.",
      icon: <Smartphone size={20} className="text-purple-400" />,
      img: "https://images.unsplash.com/photo-1512428559083-a40ce903395b?q=80&w=2070",
      aspect: "aspect-[9/16] h-[50vh] lg:h-[70vh]",
      features: ["Algorithm Optimization", "Dynamic Captions", "Beat Sync", "Hook First 3s"]
    },
    {
      id: "03",
      title: "Visual Hooks",
      description: "Thumbnails & Branding",
      details: "Stopping the scroll before it starts. High-CTR designs that turn impressions into revenue-generating views.",
      icon: <Zap size={20} className="text-amber-400" />,
      img: "https://images.unsplash.com/photo-1542744095-2ad4870f608e?q=80&w=2070",
      aspect: "aspect-video",
      features: ["CTR Optimization", "Brand Consistency", "A/B Testing", "Platform Specific"]
    },
  ];

  return (
    <section 
      ref={targetRef} 
      className={`relative bg-[#050505] ${isMobile ? "h-auto py-20" : "h-[400vh]"}`}
    >
      
      {/* 1. UI Navigation (Desktop Only) */}
      {!isMobile && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="sticky top-8 left-8 right-8 z-[60] flex justify-between items-center px-8 mix-blend-difference pointer-events-auto">
            <div className="flex items-center gap-6">
              <div className="h-[1px] w-24 bg-zinc-800 relative">
                <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-0 bg-blue-500 origin-left" />
              </div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/60">
                {String(activeIndex + 1).padStart(2, '0')} / 03
              </span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-[10px] font-mono tracking-widest text-white/40 uppercase"
              >
                Expertise // {services[activeIndex].title}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="sticky top-1/2 -translate-y-1/2 right-10 z-50 flex flex-col gap-6 items-end pr-10 pointer-events-auto">
            {services.map((_, i) => (
              <button key={i} onClick={() => scrollToSection(i)} className="group flex items-center justify-end gap-4">
                <span className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-500 ${activeIndex === i ? "text-white opacity-100" : "text-white/0 opacity-0 group-hover:opacity-100 group-hover:text-white/40"}`}>
                  {services[i].title.split(' ')[0]}
                </span>
                <div className={`h-1.5 transition-all duration-500 rounded-full ${activeIndex === i ? "w-8 bg-blue-500" : "w-2 bg-zinc-800 group-hover:bg-zinc-600"}`} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Content Container */}
      <div className={`${isMobile ? "relative" : "sticky top-0 h-screen overflow-hidden"} flex items-center`}>
        <motion.div 
          style={{ x: isMobile ? 0 : x }} 
          className={`flex ${isMobile ? "flex-col w-full gap-32" : ""}`}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="relative flex h-screen w-screen flex-none items-center justify-center px-6 md:px-24"
            >
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full max-w-7xl">
                
                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6 lg:space-y-8 order-2 lg:order-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                        {service.icon}
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{service.description}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                      {service.title.split(' ')[0]} <br/>
                      <span className="text-zinc-800 outline-text">{service.title.split(' ')[1]}</span>
                    </h2>
                  </div>

                  <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md border-l-2 border-blue-500/20 pl-6">
                    {service.details}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {service.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold text-zinc-500 uppercase tracking-tight">
                        <ChevronRight size={14} className="text-blue-500" />
                        {f}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Media Side */}
                <div className="flex justify-center order-1 lg:order-2">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className={`relative ${service.aspect} w-full max-w-[500px] lg:max-w-none bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 group shadow-2xl`}
                  >
                    <motion.img 
                      style={{ scale: 1.1, x: isMobile ? 0 : imageXParallax }}
                      src={service.img} 
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-blue-500 transition-all">
                            <Play size={20} fill="white" className="ml-1" />
                        </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Decorative Number */}
              <div className="absolute bottom-4 right-6 lg:bottom-0 lg:right-10 text-[20vw] lg:text-[25vw] font-black text-white/[0.02] pointer-events-none select-none leading-none">
                {service.id}
              </div>
            </div>
          ))}
        </motion.div>
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

export default HorizontalServices;