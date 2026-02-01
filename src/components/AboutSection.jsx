"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Instagram, Twitter, Mail, Linkedin, Play, Sparkles, Film, Clock, MapPin } from "lucide-react";

const AboutContact = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax movement for the big background text
  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textXReverse = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@framelevel.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const socialLinks = [
    { icon: <Instagram size={18} />, label: "Instagram", url: "#", color: "hover:text-[#E1306C]" },
    { icon: <Twitter size={18} />, label: "Twitter", url: "#", color: "hover:text-[#1DA1F2]" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", url: "#", color: "hover:text-[#0A66C2]" },
  ];

  const stats = [
    { icon: <Film size={16} />, value: "240+", label: "Projects" },
    { icon: <Clock size={16} />, value: "10K+", label: "Hours" },
    { icon: <MapPin size={16} />, value: "Global", label: "Reach" },
  ];

  return (
    <section ref={containerRef} className="bg-[#050505] relative overflow-hidden py-32 lg:py-48">
      
      {/* Background Text Layer */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-[0.03] select-none whitespace-nowrap">
        <motion.h2 style={{ x: textX }} className="text-[25vw] font-black italic leading-none uppercase tracking-tighter">
          Storyteller Storyteller Storyteller
        </motion.h2>
        <motion.h2 style={{ x: textXReverse }} className="text-[25vw] font-black leading-none uppercase outline-text">
          Alchemist Alchemist Alchemist
        </motion.h2>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-radial from-blue-500/5 via-transparent to-transparent opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          
          {/* Left Column: Philosophy */}
          <div className="space-y-24 lg:sticky lg:top-32">
            {/* Main Heading */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-10"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-px bg-gradient-to-r from-blue-500 to-transparent" />
                  <span className="text-blue-500 font-mono text-xs tracking-[0.3em] uppercase">The Persona</span>
                </div>
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                  Cutting <br /> 
                  Through <br />
                  <span className="text-blue-500 italic relative">
                    The Noise
                    <motion.span 
                      className="absolute -right-8 top-0 text-blue-500"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      .
                    </motion.span>
                  </span>
                </h2>
              </div>

              <p className="text-zinc-400 text-lg md:text-xl max-w-md leading-relaxed pl-6 border-l-2 border-white/10">
                I don't just edit. I architect emotions. Based in India, working with visionaries globally 
                to transform raw ideas into cinematic gold with precision and creative insight.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-6 pt-12 border-t border-white/5"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="text-blue-500">{stat.icon}</div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-8 pt-12 border-t border-white/5"
            >
              <p className="text-xs font-mono text-zinc-700 uppercase tracking-widest">Connect // Socials</p>
              <div className="flex flex-col gap-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    whileHover={{ x: 8 }}
                    className="group flex items-center justify-between text-sm font-medium uppercase tracking-widest py-3 border-b border-white/5"
                  >
                    <span className="text-zinc-400 group-hover:text-white transition-colors">{social.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-zinc-700 ${social.color} transition-colors`}>
                        {social.icon}
                      </span>
                      <ArrowUpRight size={14} className="text-zinc-700 group-hover:text-white transition-colors" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact & Image */}
          <div className="space-y-24 lg:pt-40">
            {/* Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group cursor-pointer"
            >
              {/* Sample Image - Creative Editor at Work */}
              <motion.img 
                style={{ y: imageY }}
                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070" 
                alt="Video Editor at workstation with multiple monitors showing editing software"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                  className="relative w-20 h-20 rounded-full border-2 border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center group/play"
                >
                  <Play size={24} fill="white" className="ml-1" />
                  <motion.div 
                    className="absolute inset-0 border-2 border-blue-500/50 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </div>
              
              {/* Image Label */}
              <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">Behind The Scenes</span>
              </div>
            </motion.div>

            {/* Contact Section */}
            <div className="space-y-16">
              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-transparent" />
                    <span className="text-blue-500 font-mono text-xs tracking-[0.3em] uppercase">Availability</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.9]">
                    Ready for <br /> 
                    <span className="text-transparent outline-text">Next Season.</span>
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                    Currently booking projects for Q1 2026. Limited slots available for long-term collaborations.
                  </p>
                  
                  {/* Email with Copy Function */}
                  <div className="relative group">
                    <button
                      onClick={copyEmail}
                      className="flex items-center gap-3 text-lg font-mono text-zinc-300 hover:text-white transition-colors"
                    >
                      <Mail size={18} className="text-blue-400" />
                      <span>hello@framelevel.com</span>
                      <span className="text-xs text-zinc-600 group-hover:text-blue-400 transition-colors">
                        {emailCopied ? "✓ Copied" : "Click to copy"}
                      </span>
                    </button>
                    <AnimatePresence>
                      {emailCopied && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute -top-8 left-0 text-xs text-green-500 font-mono"
                        >
                          Email copied to clipboard!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Start a conversation</span>
                <motion.a 
                  href="mailto:hello@framelevel.com"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex items-center gap-4 bg-white text-black px-10 py-6 rounded-full font-black uppercase tracking-widest text-lg shadow-2xl overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-zinc-200 group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-500" />
                  
                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-3">
                    Send Brief
                    <Mail size={20} className="group-hover:scale-110 transition-transform" />
                  </span>
                  
                  {/* Sparkle Effect */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute -right-2 -top-2"
                      >
                        <Sparkles size={20} className="text-blue-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 right-12 hidden lg:block"
      >
        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">Based in India • Remote First</span>
        </div>
      </motion.div>

      <style jsx global>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.12);
          color: transparent;
          text-shadow: 0 0 30px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </section>
  );
};

export default AboutContact;