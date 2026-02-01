"use client";

import { motion, } from "framer-motion";
import { Send, ArrowUpRight, Mail, Clock, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("hello@framelevel.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const contactInfo = [
    { icon: <Mail size={16} />, text: "hello@framelevel.com", action: copyEmailToClipboard },
    { icon: <Clock size={16} />, text: "Response: 12-24h" },
    { icon: <MapPin size={16} />, text: "Available Worldwide" },
  ];

  return (
    <section id="contact" className="bg-[#050505] py-32 lg:py-56 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      
      {/* 1. Background Ambiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full" />
        
        {/* Subtle Vertical Grid Lines */}
        <div className="absolute inset-0 opacity-[0.02]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`line-${i}`}
              className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-white to-transparent"
              style={{ left: `${i * 9.09}%` }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto relative z-10 text-center">
        
        {/* 2. Headline & Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase">
              Project Openings Available
            </span>
          </div>

          {/* Impact Heading */}
          <div className="space-y-8">
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none italic">
              LETS CREATE <br />
              <span className="text-transparent outline-text">TOGETHER.</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              Ready to elevate your narrative? Reach out for a custom quote or to discuss your visual goals.
            </p>
          </div>

          {/* Interactive Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="mailto:hello@framelevel.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-3">
                Start a Project <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <motion.div 
                className="absolute inset-0 bg-blue-600"
                initial={{ y: "100%" }}
                animate={{ y: isHovered ? "0%" : "100%" }}
              />
              {isHovered && <Sparkles size={16} className="absolute right-4 top-4 text-white z-20" />}
            </motion.a>

            <motion.a
              href="#projects"
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-[0.3em]"
            >
              View Full Portfolio <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </motion.div>

        {/* 3. Dynamic Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-24"
        >
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              onClick={info.action}
              className={`bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-center transition-all ${
                info.action ? 'cursor-pointer hover:border-blue-500/30 group' : ''
              }`}
            >
              <div className="text-blue-500 flex justify-center mb-3">
                {info.icon}
              </div>
              <p className="text-sm font-bold uppercase tracking-tight">{info.text}</p>
              {info.action && (
                <span className="text-[9px] font-mono text-zinc-600 uppercase mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">
                  {emailCopied ? 'Copied to Clipboard' : 'Click to Copy'}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;