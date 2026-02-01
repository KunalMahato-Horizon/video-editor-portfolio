"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play, ArrowRight, Monitor, Sparkles, Zap, Scissors } from "lucide-react";
import { useEffect, useState } from "react";

const VideoEditorHero = ({ onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mouse Parallax Logic for the Monitor Card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      x.set(moveX);
      y.set(moveY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  if (!mounted) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-white flex items-center justify-center overflow-hidden selection:bg-blue-600">
      
      {/* Texture & Atmospheric Lighting */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-orange-600/5 blur-[100px] rounded-full" />

      <main className="container mx-auto px-6 lg:px-12 relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">
          
          {/* Left Column: Typography & Action */}
          <motion.div variants={container} initial="hidden" animate="show" className="flex-1 space-y-10">
            <motion.div variants={item} className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-blue-500" />
                <span className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase">Status: Available for 2026</span>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-6xl md:text-8xl xl:text-[9rem] font-black tracking-tighter leading-[0.8] mix-blend-difference">
                  VISUAL <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>STORY</span> <br />
                  ARCHITECT.
                </h1>
                <div className="flex items-center gap-3 pt-4">
                    <Sparkles size={14} className="text-blue-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Precision Post-Production & Motion</span>
                </div>
              </div>
            </motion.div>

            <motion.p variants={item} className="text-zinc-400 text-lg md:text-xl max-w-sm leading-relaxed border-l-2 border-zinc-900 pl-6">
              I breathe life into <span className="text-zinc-100">raw footage</span> through 
              surgical cutting, high-end grading, and immersive audio.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-6 pt-4">
              <button 
                onClick={onPlay}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex items-center gap-4 bg-white text-black px-10 py-4.5 rounded-full font-bold overflow-hidden transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Play Showreel <Play size={16} fill="black" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-blue-600"
                  initial={{ y: "100%" }}
                  animate={{ y: isHovered ? "0%" : "100%" }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
              </button>
              
              <button className="group flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase transition-all">
                <span className="border-b border-zinc-800 pb-1 group-hover:border-white transition-colors">Inquiry</span>
                <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </button>
            </motion.div>

            {/* Tech Stack - Responsive Chips */}
            <motion.div variants={item} className="flex flex-wrap gap-2 pt-4">
                {["PR", "AE", "DR", "C4D"].map((tool) => (
                    <span key={tool} className="text-[9px] font-bold font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-md text-zinc-500">
                        {tool}
                    </span>
                ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Monitor */}
          <motion.div
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="flex-1 relative w-full lg:max-w-[500px]"
          >
            <div className="relative group">
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-blue-500/20 rounded-tl-[2rem] pointer-events-none" />
              
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 group-hover:border-white/20 transition-all duration-700 shadow-2xl">
                <div 
                  className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* HUD Elements */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-md border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                      <span className="text-[9px] font-mono uppercase text-white/80">LIVE_VIEW</span>
                   </div>
                   <div className="text-[10px] font-mono text-white/40">24.00 FPS</div>
                </div>

                <div className="absolute bottom-10 left-10 right-10 space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold tracking-tight uppercase">Project_Zero</h3>
                    <p className="text-[10px] text-zinc-500 font-mono tracking-[0.2em] uppercase">Colorist / Assembly</p>
                  </div>
                  
                  <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-500"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "68%" }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Float Badges */}
              <motion.div className="absolute -right-8 top-1/4 bg-[#111] border border-white/10 p-4 rounded-2xl shadow-2xl hidden lg:block">
                <Monitor size={18} className="text-blue-500 mb-2" />
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">Res: 8K Native</p>
              </motion.div>
              
              <motion.div className="absolute -left-8 bottom-1/4 bg-[#111] border border-white/10 p-4 rounded-2xl shadow-2xl hidden lg:block">
                <Scissors size={18} className="text-orange-500 mb-2" />
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">Cuts: Precision</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Atmospheric Background Text */}
      <div className="absolute bottom-[-2%] right-[-2%] text-[18vw] font-black text-white/[0.015] pointer-events-none select-none uppercase tracking-tighter italic">
        ALCHEMIST
      </div>
    </div>
  );
};

export default VideoEditorHero;