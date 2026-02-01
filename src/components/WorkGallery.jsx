"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink, ChevronRight } from "lucide-react";

const WorkGallery = ({ onVideoSelect }) => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Long-form", "Shorts", "Thumbnails"];

  const projects = [
    { title: "The Alpine Doc", cat: "Long-form", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059", id: "1" },
    { title: "Gym Hook Reel", cat: "Shorts", img: "https://images.unsplash.com/photo-1512428559083-a40ce903395b?q=80&w=2070", id: "2" },
    { title: "Finance Thumbnail", cat: "Thumbnails", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800", id: "3" },
    { title: "Tech Unboxing", cat: "Long-form", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800", id: "4" },
    { title: "Street Style", cat: "Shorts", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800", id: "5" },
    { title: "Gaming Concept", cat: "Thumbnails", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800", id: "6" },
  ];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.cat === filter);

  return (
    <section className="bg-[#080808] py-20 lg:py-32 px-6 lg:px-12">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-12 lg:mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase block">Archive</span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none">
              Browse <br/> 
              <span className="text-transparent outline-text" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>The Works.</span>
            </h2>
          </div>

          {/* Filters: Horizontal scroll on mobile, flex-wrap on desktop */}
          <div className="flex overflow-x-auto pb-4 lg:pb-0 lg:flex-wrap gap-3 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                  filter === c 
                    ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]" 
                    : "bg-white/5 border-white/5 text-zinc-500 hover:border-white/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer"
                onClick={() => onVideoSelect?.(project.id, project.title)}
              >
                {/* Background Image */}
                <img 
                  src={project.img} 
                  alt="" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100" 
                />
                
                {/* Overlay: Visible on hover (desktop) and always partially visible on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-6 lg:p-8">
                  <div className="flex justify-between items-start translate-y-2 lg:translate-y-0 lg:group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] font-mono text-blue-500 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                      {project.cat}
                    </span>
                    <div className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white hidden lg:block">
                        <ExternalLink size={14} />
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="space-y-1 translate-y-2 lg:translate-y-0 lg:group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-lg lg:text-xl font-bold uppercase tracking-tight leading-none text-white">
                        {project.title}
                      </h3>
                      <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                        View Project <ChevronRight size={10} />
                      </p>
                    </div>
                    <motion.div 
                      whileTap={{ scale: 0.9 }}
                      className="p-4 bg-white text-black rounded-full shadow-xl"
                    >
                      <Play size={18} fill="black" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">No projects found in this category.</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default WorkGallery;