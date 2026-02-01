// src/App.js
import Navbar from "./components/Navbar";
import HeroSection from "./components/VideoEditorHero";
import ServiceSlates from "./components/FilmSlateServices";
import Projects from "./components/HorizontalServices";
import MarqueeShowcase from "./components/ContentMarquee"; 
import WorkGallery from "./components/WorkGallery"; 
import InteractiveAboutContact from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer"; // Added new Footer component

function App() {
  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-blue-600 selection:text-white">
      
      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Portfolio Journey */}
      <main>
        {/* HERO: The Entrance */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* SERVICES: What you specialize in */}
        <section id="services">
          <ServiceSlates />
        </section>

        {/* PROJECTS: Deep dives into featured work */}
        <section id="projects">
          <Projects />
        </section>

        {/* MARQUEE: The volume of your output */}
        <section id="marquee">
          <MarqueeShowcase />
        </section>

        {/* GALLERY: Filterable archive of all work */}
        <section id="gallery" className="border-t border-white/5">
          <WorkGallery />
        </section>

        {/* ABOUT: Your philosophy and technical specs */}
        <section id="about">
          <InteractiveAboutContact />
        </section>

        {/* CONTACT: The final call to action */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* 3. Global Footer: End Credits & Signature */}
      <Footer />
      
    </div>
  );
}

export default App;