// src/components/TheCuttingRoom.jsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  Play, Pause, Scissors, Film, Zap, Type, Palette, Volume2, VolumeX,
  Grid, MousePointer, Clock, Settings, Layers, Download, Heart, Eye, Camera, Mic,
  Music, Sparkles, ChevronRight, ChevronLeft, Maximize2, Minimize2,
  RotateCw, RotateCcw, Filter, Crop, AlertCircle, CheckCircle,
  HardDrive, Cpu, Smartphone, Tablet, Laptop, FilmStrip, Monitor,
  MoveLeft, MoveRight, Search, X, Check, Plus, Minus, ZoomIn, ZoomOut,
  BarChart3, TrendingUp, Shield, Cloud, Wifi, Battery, Radio,
  ArrowUpRight, ArrowDownRight, Settings2, Bell, User, HelpCircle,
  BatteryCharging, Activity, Disc3
} from "lucide-react";

const UNSHLASH_IMAGES = {
  wedding: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  ],
  documentary: [
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  ],
  commercial: [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1579389083046-92d3244a2a8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  ],
  music: [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  ]
};

const TheCuttingRoom = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(0);
  const [activeReel, setActiveReel] = useState(1);
  const [audioLevels, setAudioLevels] = useState(Array.from({ length: 16 }, () => Math.random() * 100));
  const [selectedClip, setSelectedClip] = useState(3);
  const [viewMode, setViewMode] = useState("timeline");
  const [isMuted, setIsMuted] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [activeTool, setActiveTool] = useState("cut");
  const [showWaveform, setShowWaveform] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const filmReels = [
    { 
      id: 1, name: "Golden Hour", frames: 240, color: "from-amber-600 to-yellow-500", 
      duration: "02:45", type: "wedding", images: UNSHLASH_IMAGES.wedding,
      description: "Cinematic wedding storytelling", stats: { views: "25K", likes: "1.2K", size: "4.2GB" },
      tags: ["4K", "60fps", "LOG"]
    },
    { 
      id: 2, name: "Urban Chronicles", frames: 180, color: "from-blue-600 to-cyan-500", 
      duration: "01:52", type: "documentary", images: UNSHLASH_IMAGES.documentary,
      description: "City life documentary", stats: { views: "18K", likes: "890", size: "3.8GB" },
      tags: ["4K", "24fps", "RAW"]
    },
    { 
      id: 3, name: "Brand Waves", frames: 360, color: "from-purple-600 to-pink-500", 
      duration: "04:10", type: "commercial", images: UNSHLASH_IMAGES.commercial,
      description: "Corporate brand film", stats: { views: "32K", likes: "2.1K", size: "5.6GB" },
      tags: ["8K", "30fps", "HDR"]
    },
    { 
      id: 4, name: "Sound Waves", frames: 420, color: "from-emerald-600 to-teal-500", 
      duration: "05:15", type: "music", images: UNSHLASH_IMAGES.music,
      description: "Music video with VFX", stats: { views: "150K", likes: "8.5K", size: "7.3GB" },
      tags: ["4K", "60fps", "10-bit"]
    },
  ];

  const timelineClips = [
    { id: 1, name: "OPEN", start: 0, end: 45, reel: 1, color: "#f59e0b", selected: false, type: "establishing" },
    { id: 2, name: "B-ROLL", start: 46, end: 120, reel: 2, color: "#3b82f6", selected: false, type: "coverage" },
    { id: 3, name: "DIALOGUE", start: 121, end: 210, reel: 3, color: "#8b5cf6", selected: true, type: "interview" },
    { id: 4, name: "MONTAGE", start: 211, end: 280, reel: 4, color: "#10b981", selected: false, type: "creative" },
    { id: 5, name: "CLOSE", start: 281, end: 320, reel: 1, color: "#f59e0b", selected: false, type: "conclusion" },
  ];

  // Editing tools
  const editingTools = [
    { icon: Scissors, tool: "cut", color: "text-red-400", bg: "bg-red-500/10" },
    { icon: Crop, tool: "crop", color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: Filter, tool: "color", color: "text-purple-400", bg: "bg-purple-500/10" },
    { icon: Type, tool: "text", color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { icon: Volume2, tool: "audio", color: "text-green-400", bg: "bg-green-500/10" },
    { icon: Grid, tool: "effects", color: "text-pink-400", bg: "bg-pink-500/10" },
    { icon: Zap, tool: "transitions", color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { icon: Layers, tool: "layers", color: "text-indigo-400", bg: "bg-indigo-500/10" },
  ];

  // Technical specs
  const techSpecs = [
    { label: "RESOLUTION", value: "4K", color: "text-blue-400", icon: Maximize2 },
    { label: "FPS", value: "24", color: "text-amber-400", icon: Activity },
    { label: "CODEC", value: "H.265", color: "text-purple-400", icon: Disc3 },
    { label: "BITRATE", value: "50Mbps", color: "text-emerald-400", icon: TrendingUp },
    { label: "COLOR", value: "10-bit", color: "text-pink-400", icon: Palette },
    { label: "AUDIO", value: "48kHz", color: "text-cyan-400", icon: Volume2 },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", checkMobile);
    checkMobile();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setPlayhead(prev => {
        if (prev >= 320) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 0.2;
      });

      if (!isMuted) {
        const newLevels = audioLevels.map(() => Math.random() * 100);
        setAudioLevels(newLevels);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, isMuted]);

  useEffect(() => {
    if (exportProgress > 0 && exportProgress < 100) {
      const timer = setTimeout(() => {
        setExportProgress(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
    if (exportProgress === 100) {
      const timer = setTimeout(() => {
        setExportProgress(0);
        setIsExporting(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [exportProgress]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExport = () => {
    setIsExporting(true);
    setExportProgress(1);
  };

  const handleToolSelect = (tool) => {
    setActiveTool(tool);
  };

  const renderViewMode = () => {
    switch(viewMode) {
      case 'timeline':
        return (
          <div className="h-full flex flex-col">
            {/* Timeline Header */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Film className="w-3 h-3 text-cyan-400" />
                TIMELINE
              </h3>
              <div className="flex items-center gap-2">
                <div className="text-xs font-mono text-stone-400">
                  {formatTime(playhead)} / 05:20
                </div>
                <button className="text-xs text-cyan-400 hover:text-cyan-300">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Timeline Visualization */}
            <div className="flex-1 relative rounded-lg border border-stone-800 bg-stone-900/30 overflow-hidden">
              {/* Time Ruler */}
              <div className="h-6 bg-gradient-to-b from-stone-900 to-stone-900/80 border-b border-stone-800">
                {Array.from({ length: 13 }).map((_, i) => (
                  <div key={i} className="absolute bottom-0 w-px bg-stone-700" style={{ left: `${i * 8}%` }}>
                    <div className="absolute top-1 left-0.5 text-[10px] text-stone-500">{i * 25}s</div>
                  </div>
                ))}
              </div>

              {/* Clips */}
              {timelineClips.map((clip) => {
                const left = (clip.start / 320) * 100;
                const width = ((clip.end - clip.start) / 320) * 100;
                
                return (
                  <motion.div
                    key={clip.id}
                    whileHover={{ y: -2 }}
                    onClick={() => setSelectedClip(clip.id)}
                    className={`absolute top-8 h-10 rounded-lg border cursor-pointer group ${
                      selectedClip === clip.id
                        ? 'border-cyan-500/70 shadow-lg shadow-cyan-500/20'
                        : 'border-stone-700 hover:border-stone-600'
                    }`}
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      background: `linear-gradient(135deg, ${clip.color}20, ${clip.color}10)`
                    }}
                  >
                    <div className="p-2 h-full flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: clip.color }} />
                        <div className="text-xs font-medium text-white">{clip.name}</div>
                        <div className="text-[10px] text-stone-400 hidden group-hover:block">
                          {clip.type}
                        </div>
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {formatTime(clip.start)}-{formatTime(clip.end)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Playhead */}
              <motion.div
                className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 z-10"
                style={{ left: `${(playhead / 320) * 100}%` }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400">
                  <div className="absolute inset-0 animate-ping bg-cyan-400 rounded-full opacity-50" />
                </div>
              </motion.div>
            </div>

            {/* Audio Tracks - Compact */}
            <div className="mt-2 space-y-1.5">
              {['DIALOGUE', 'MUSIC', 'SFX', 'AMBIENCE'].map((track, i) => (
                <div key={track} className="flex items-center">
                  <div className="w-16 text-xs text-stone-400 font-mono flex items-center gap-1">
                    <Volume2 className="w-3 h-3" />
                    {isMobile ? track.slice(0, 3) : track}
                  </div>
                  <div className="flex-1 h-4 bg-stone-900/50 rounded overflow-hidden">
                    <div className="flex h-full">
                      {audioLevels.slice(0, 12).map((level, idx) => (
                        <motion.div
                          key={idx}
                          animate={{ height: `${level}%` }}
                          className="flex-1 bg-gradient-to-t from-cyan-500 to-cyan-400/80"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="w-8 text-right text-xs font-mono text-stone-500">
                    {Math.max(...audioLevels.slice(0, 12)).toFixed(0)}dB
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="h-full rounded-lg border border-stone-800 bg-gradient-to-br from-stone-900 to-black overflow-hidden relative">
            <img
              src={filmReels.find(r => r.id === activeReel)?.images[0]}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <div className="absolute bottom-2 left-2 right-2">
                <div className="w-full h-1 bg-stone-800/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-500"
                    style={{ width: `${(playhead / 320) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-xs text-stone-300">
                    {filmReels.find(r => r.id === activeReel)?.name}
                  </div>
                  <div className="text-xs font-mono text-stone-400">
                    {formatTime(playhead)} / 05:20
                  </div>
                </div>
              </div>
            </div>
            
            {/* Preview Controls */}
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <button className="p-1.5 rounded bg-stone-900/80 backdrop-blur-sm border border-stone-700 hover:bg-stone-800/80">
                <Maximize2 className="w-3 h-3 text-stone-300" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 hover:bg-cyan-500/30"
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3 text-cyan-400" />
                ) : (
                  <Play className="w-3 h-3 text-cyan-400" />
                )}
              </button>
            </div>
          </div>
        );

      case 'reels':
        return (
          <div className="grid grid-cols-2 gap-2 h-full overflow-y-auto">
            {filmReels.map((reel) => (
              <motion.div
                key={reel.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveReel(reel.id)}
                className={`aspect-square rounded-lg border overflow-hidden cursor-pointer relative ${
                  activeReel === reel.id
                    ? 'border-cyan-500 shadow-lg shadow-cyan-500/20'
                    : 'border-stone-800 hover:border-stone-700'
                }`}
              >
                <img 
                  src={reel.images[1]} 
                  alt={reel.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="font-medium text-white text-sm">{reel.name}</div>
                    <div className="text-xs text-stone-400">{reel.type}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-black to-stone-950 p-3 sm:p-4 overflow-hidden">
      {/* Ultra-Compact Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-7 h-7 border border-cyan-400/30 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-900/20 to-cyan-900/5"
          >
            <Film className="w-3.5 h-3.5 text-cyan-400" />
          </motion.div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">
              <span className="text-cyan-400">CUTTING</span>ROOM
            </h1>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>{isPlaying ? 'PLAYING' : 'PAUSED'} • {formatTime(playhead)}</span>
              <div className="w-px h-3 bg-stone-700" />
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                <span>64%</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex gap-0.5 p-0.5 bg-stone-900/50 rounded border border-stone-800">
            {['timeline', 'preview', 'reels'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-2 py-1 text-xs rounded transition-all flex items-center gap-1 ${
                  viewMode === mode
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-stone-500 hover:text-stone-300 hover:bg-stone-800/30'
                }`}
              >
                {mode === 'timeline' && <Film className="w-3 h-3" />}
                {mode === 'preview' && <Monitor className="w-3 h-3" />}
                {mode === 'reels' && <Layers className="w-3 h-3" />}
                <span className="hidden sm:inline">{mode}</span>
                <span className="sm:hidden">{mode.charAt(0).toUpperCase()}</span>
              </button>
            ))}
          </div>
          
          {/* Mute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-1.5 rounded border ${
              isMuted 
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-stone-900/50 border-stone-800 text-cyan-400 hover:border-stone-700'
            }`}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Workspace - Ultra Compact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 h-[calc(100vh-160px)]">
        
        {/* Left Panel - Projects */}
        <div className="lg:col-span-1 space-y-2 overflow-y-auto pr-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-stone-300 flex items-center gap-1">
              <Film className="w-3.5 h-3.5 text-cyan-400" />
              PROJECTS
            </h3>
            <button className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
              <Plus className="w-3 h-3" />
              <span className="hidden sm:inline">New</span>
            </button>
          </div>
          
          {filmReels.map((reel) => (
            <motion.div
              key={reel.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => setActiveReel(reel.id)}
              className={`p-2 rounded-lg border cursor-pointer transition-all group ${
                activeReel === reel.id
                  ? 'border-cyan-500/50 bg-gradient-to-r from-stone-900/80 to-stone-900/40'
                  : 'border-stone-800 bg-stone-900/30 hover:bg-stone-900/50'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white text-sm truncate">{reel.name}</div>
                  <div className="text-xs text-stone-400 capitalize">{reel.type}</div>
                </div>
                <div className="text-xs font-mono px-1.5 py-0.5 rounded bg-stone-800/70 text-stone-300 ml-2 flex-shrink-0">
                  {reel.duration}
                </div>
              </div>
              
              {/* Image Thumbnails */}
              <div className="flex gap-1 mb-1">
                {reel.images.slice(0, 2).map((img, idx) => (
                  <div key={idx} className="flex-1 aspect-square rounded overflow-hidden border border-stone-700 group-hover:border-stone-600">
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
              
              {/* Stats and Tags */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-stone-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {reel.stats.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {reel.stats.likes}
                    </span>
                  </div>
                  <button className="text-cyan-400 hover:text-cyan-300 text-xs flex items-center gap-1">
                    Load <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {reel.tags.map((tag, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 text-[10px] rounded bg-stone-800/50 text-stone-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center Workspace - Takes 2 columns on desktop */}
        <div className="lg:col-span-2 flex flex-col space-y-2">
          {/* Main Editor Area */}
          <div className="flex-1 rounded-lg border border-stone-800 bg-stone-900/20 p-2">
            {renderViewMode()}
          </div>

          {/* Bottom Controls - Ultra Compact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Transport Controls */}
            <div className="flex items-center gap-1 p-1.5 rounded-lg border border-stone-800 bg-stone-900/30">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 flex-shrink-0"
              >
                {isPlaying ? 
                  <Pause className="w-3.5 h-3.5 text-white" /> : 
                  <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                }
              </button>
              
              <div className="flex-1 px-2">
                <div className="text-xs font-mono text-stone-300 text-center">{formatTime(playhead)}</div>
                <div className="text-[10px] text-stone-500 text-center">TIME</div>
              </div>
              
              <button className="p-1.5 hover:bg-stone-800/50 rounded">
                <ChevronLeft className="w-3.5 h-3.5 text-stone-400" />
              </button>
              <button className="p-1.5 hover:bg-stone-800/50 rounded">
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </button>
              
              <div className="w-px h-4 bg-stone-700" />
              
              <button 
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                className="p-1.5 hover:bg-stone-800/50 rounded"
              >
                <Minus className="w-3.5 h-3.5 text-stone-400" />
              </button>
              <div className="text-xs font-mono text-white w-10 text-center">{zoom}%</div>
              <button 
                onClick={() => setZoom(Math.min(200, zoom + 10))}
                className="p-1.5 hover:bg-stone-800/50 rounded"
              >
                <Plus className="w-3.5 h-3.5 text-stone-400" />
              </button>
            </div>

            {/* Tools Palette */}
            <div className="flex items-center gap-0.5 p-1.5 rounded-lg border border-stone-800 bg-stone-900/30 overflow-x-auto">
              {editingTools.map(({ icon: Icon, tool, color, bg }) => (
                <button
                  key={tool}
                  onClick={() => handleToolSelect(tool)}
                  className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${
                    activeTool === tool
                      ? `${bg} border border-stone-700 text-white`
                      : 'text-stone-400 hover:text-stone-300 hover:bg-stone-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>

            {/* Export and Settings */}
            <div className="flex items-center gap-1 p-1.5 rounded-lg border border-stone-800 bg-stone-900/30">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex-1 px-3 py-1.5 text-xs rounded bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                {isExporting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-3 h-3 border border-white/30 border-t-white rounded-full"
                    />
                    <span>{exportProgress}%</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>EXPORT</span>
                  </>
                )}
              </button>
              
              <div className="w-px h-4 bg-stone-700" />
              
              <button className="p-1.5 hover:bg-stone-800/50 rounded">
                <Settings className="w-3.5 h-3.5 text-stone-400" />
              </button>
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 hover:bg-stone-800/50 rounded"
              >
                {isFullscreen ? 
                  <Minimize2 className="w-3.5 h-3.5 text-stone-400" /> : 
                  <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Details & Settings */}
        <div className="lg:col-span-1 space-y-2 overflow-y-auto">
          {/* Active Project Info */}
          <div className="p-2 rounded-lg border border-stone-800 bg-stone-900/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1">
                <Film className="w-3.5 h-3.5 text-cyan-400" />
                ACTIVE
              </h3>
              <div className="text-xs font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400">
                ONLINE
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-600 to-blue-500 flex items-center justify-center">
                <Film className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white text-sm truncate">
                  {filmReels.find(r => r.id === activeReel)?.name}
                </div>
                <div className="text-xs text-stone-400 flex items-center gap-1">
                  <span>{filmReels.find(r => r.id === activeReel)?.duration}</span>
                  <span>•</span>
                  <span>{filmReels.find(r => r.id === activeReel)?.stats.size}</span>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-stone-500 mb-2 line-clamp-2">
              {filmReels.find(r => r.id === activeReel)?.description}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Progress</span>
                <span className="text-cyan-400 font-mono">{Math.round((playhead / 320) * 100)}%</span>
              </div>
              <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{ width: `${(playhead / 320) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Technical Stats */}
          <div className="p-2 rounded-lg border border-stone-800 bg-stone-900/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                SPECS
              </h3>
              <button className="text-xs text-cyan-400 hover:text-cyan-300">
                <Settings2 className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {techSpecs.map((spec) => (
                <div key={spec.label} className="flex items-center gap-2 p-1.5 rounded bg-stone-900/50">
                  <div className={`p-1 rounded ${spec.color.replace('text-', 'bg-')}/10`}>
                    <spec.icon className={`w-3 h-3 ${spec.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-bold ${spec.color}`}>{spec.value}</div>
                    <div className="text-[10px] text-stone-500 truncate">{spec.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Settings */}
          <div className="p-2 rounded-lg border border-stone-800 bg-stone-900/30">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1">
              <Settings className="w-3.5 h-3.5 text-cyan-400" />
              SETTINGS
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400">Waveform</span>
                <button
                  onClick={() => setShowWaveform(!showWaveform)}
                  className={`p-0.5 rounded ${showWaveform ? 'bg-emerald-500/20' : 'bg-stone-800'}`}
                >
                  {showWaveform ? (
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <X className="w-3 h-3 text-stone-400" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400">Snap to Grid</span>
                <button className="p-0.5 rounded bg-emerald-500/20">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400">Auto-Save</span>
                <button className="p-0.5 rounded bg-emerald-500/20">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400">Proxy Mode</span>
                <button className="p-0.5 rounded bg-stone-800">
                  <X className="w-3 h-3 text-stone-400" />
                </button>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="p-2 rounded-lg border border-stone-800 bg-stone-900/30">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              SYSTEM
            </h3>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">CPU</span>
                <span className="text-green-400 font-mono">64%</span>
              </div>
              <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400" style={{ width: '64%' }} />
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">GPU</span>
                <span className="text-blue-400 font-mono">42%</span>
              </div>
              <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: '42%' }} />
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">RAM</span>
                <span className="text-purple-400 font-mono">78%</span>
              </div>
              <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-400" style={{ width: '78%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra-Compact Bottom Status Bar */}
      <div className="mt-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-stone-400">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>LIVE</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Film className="w-3 h-3" />
            <span className="truncate max-w-[120px]">ACTIVE: {filmReels.find(r => r.id === activeReel)?.name}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{formatTime(playhead)} / 05:20</span>
          </div>
          
          <div className="flex items-center gap-1">
            <HardDrive className="w-3 h-3" />
            <span>12ms</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-stone-400 hidden sm:block">
            TOOL: <span className="text-cyan-400">{activeTool.toUpperCase()}</span>
          </div>
          
          <div className="w-24 h-1 bg-stone-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              style={{ width: `${(playhead / 320) * 100}%` }}
            />
          </div>
          
          <div className="text-xs font-mono text-stone-400">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheCuttingRoom;