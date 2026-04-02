/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Music, User, Mail, Instagram, Youtube, ShoppingBag, ArrowRight, Music2, X, Ship } from "lucide-react";

const mainPicSource = "/v3_test.png";
const hthyCover = "/v2_hthy.jpg";
const nextToYouCover = "/v2_next.jpg";
const bioPic = "/v2_bio.jpg";


type Tab = "Home" | "Music" | "About" | "Contact";

/**
 * A component that uses CSS masking and atmospheric glow to blend the image into the background.
 * This preserves the original image quality while creating a high-end, integrated look.
 */
function CutoutImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [status, setStatus] = useState("Loading...");
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div 
      className={`relative ${className} border-4 border-red-500 flex items-center justify-center`}
      style={{ backgroundColor: '#e4e4e7' }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-[10px] text-black font-mono z-50 pointer-events-none">
        {status}
      </div>
      <img 
        ref={imgRef}
        src={src} 
        alt={alt} 
        className="w-full h-full object-contain relative z-10"
        onLoad={() => setStatus(`Loaded: ${imgRef.current?.naturalWidth}x${imgRef.current?.naturalHeight}`)}
        onError={() => setStatus("Failed to load")}
      />
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs: { id: Tab; icon: any }[] = [
    { id: "Home", icon: Home },
    { id: "Music", icon: Music },
    { id: "About", icon: User },
    { id: "Contact", icon: Mail },
  ];

  const handleTabChange = (tabId: Tab) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    console.log("Main Pic Source:", mainPicSource);
  }, []);

  return (
    <div className="min-h-screen bg-bg-light text-black font-sans selection:bg-pink-accent selection:text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => handleTabChange("Home")}
            className="font-logo text-xl tracking-[0.15em] font-bold uppercase cursor-pointer"
          >
            HAVIE <span className="text-pink-accent">ERA</span>
          </motion.div>
          
          <div className="hidden md:flex gap-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative py-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:text-pink-accent ${
                  activeTab === tab.id ? "text-pink-accent" : "text-black"
                }`}
              >
                {tab.id}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-pink-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="md:hidden">
             <button 
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               className="relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
             >
               <motion.div 
                 animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                 className="w-6 h-0.5 bg-black"
               />
               <motion.div 
                 animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                 className="w-6 h-0.5 bg-black"
               />
               <motion.div 
                 animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                 className="w-6 h-0.5 bg-black"
               />
             </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Dimmer backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-30 md:hidden"
              />
              
              {/* Dropdown Content */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-20 left-0 right-0 bg-white shadow-2xl border-b border-black/5 z-40 flex flex-col items-center py-10 gap-6 md:hidden"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`text-xs font-logo uppercase tracking-[0.8em] font-bold transition-all duration-300 py-2 border-b-2 ${
                      activeTab === tab.id ? "text-pink-accent border-pink-accent" : "text-black border-transparent"
                    }`}
                  >
                    {tab.id}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === "Home" && (
              <section id="home-section" className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-white px-6">
                {/* Main Visual Composition */}
                <div className="relative w-full max-w-7xl flex flex-col items-center justify-center">
                  {/* Surrounding Text Layer */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center select-none pointer-events-none -translate-y-12">
                    {/* Outer Ring - Clockwise */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="absolute w-[95vh] h-[95vh] md:w-[115vh] md:h-[115vh] flex items-center justify-center opacity-20"
                    >
                      <svg viewBox="0 0 500 500" className="w-full h-full">
                        <path
                          id="outerCircle"
                          d="M 250, 250 m -220, 0 a 220, 220 0 1, 1 440, 0 a 220, 220 0 1, 1 -440, 0"
                          fill="transparent"
                        />
                        <text className="font-logo text-[20px] fill-pink-accent uppercase tracking-[0.5em]">
                          <textPath xlinkHref="#outerCircle">
                            HAVIE ERA • HAVIE ERA • HAVIE ERA • HAVIE ERA • HAVIE ERA • HAVIE ERA • 
                          </textPath>
                        </text>
                      </svg>
                    </motion.div>

                    {/* Inner Ring - Counter Clockwise */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute w-[80vh] h-[80vh] md:w-[100vh] md:h-[100vh] flex items-center justify-center opacity-40"
                    >
                      <svg viewBox="0 0 500 500" className="w-full h-full">
                        <path
                          id="innerCircle"
                          d="M 250, 250 m -180, 0 a 180, 180 0 1, 1 360, 0 a 180, 180 0 1, 1 -360, 0"
                          fill="transparent"
                        />
                        <text className="font-logo text-[24px] fill-pink-accent uppercase tracking-[0.3em]">
                          <textPath xlinkHref="#innerCircle">
                            HAVIE ERA • HAVIE ERA • HAVIE ERA • HAVIE ERA • HAVIE ERA • HAVIE ERA • 
                          </textPath>
                        </text>
                      </svg>
                    </motion.div>
                  </div>

                  {/* Person Image Layer */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center -translate-y-12">
                    <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 1, type: "spring", stiffness: 50 }}
                      className="relative h-[75vh] md:h-[90vh] aspect-[3/4]"
                    >
                      <CutoutImage 
                        src={mainPicSource} 
                        alt="HAVIE ERA"
                        className="w-full h-full"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom Metadata */}
                <div className="absolute bottom-12 left-8 max-w-xs z-30">
                  <p className="text-[11px] leading-relaxed opacity-70 uppercase tracking-wider font-medium">
                    Not an ARTIST. But I make art anyway.
                  </p>
                </div>

                {/* CTA Button */}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("Music")}
                  className="absolute bottom-12 right-8 z-30 flex items-center gap-4 group"
                >
                  <span className="text-xs font-bold uppercase tracking-widest group-hover:text-pink-accent transition-colors">
                    Enter Studio
                  </span>
                  <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-pink-accent group-hover:border-pink-accent transition-all">
                    <ArrowRight size={16} />
                  </div>
                </motion.button>
              </section>
            )}

            {activeTab === "Music" && (
              <div className="bg-black text-white min-h-screen py-24 px-6">
                <div className="max-w-7xl mx-auto space-y-32">
                  {/* Streaming Section */}
                  <section className="space-y-16">
                    <div className="flex items-baseline gap-4">
                      <h2 className="font-display text-6xl md:text-8xl uppercase italic">Stream</h2>
                      <span className="font-serif italic text-2xl text-pink-accent">My Music</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {[
                        { name: "Spotify", url: "https://open.spotify.com/artist/00BPqSgMeY3R3oItQWmn38?si=kC38eA-GT3qdQFMpamDzpw" },
                        { name: "Apple Music", url: "https://music.apple.com/us/artist/havie-era/1868346778" },
                        { name: "YouTube", url: "https://youtube.com/@havieera9924?si=P9NtME-iLhwYSDQL" },
                        { name: "TikTok", url: "https://www.tiktok.com/@havieera?_r=1&_t=ZS-956uUWcQCJx" },
                        { name: "OpenSea", url: "https://opensea.io/profile/listings" }
                      ].map((platform, index) => (
                        <motion.a
                          key={platform.name}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          className="aspect-square border border-white/20 flex flex-col items-center justify-center group hover:border-pink-accent transition-colors"
                        >
                          <span className="text-[10px] uppercase tracking-[0.3em] font-bold group-hover:text-pink-accent">
                            {platform.name}
                          </span>
                        </motion.a>
                      ))}
                    </div>
                  </section>

                  {/* Latest Releases */}
                  <section className="space-y-16">
                    <h2 className="font-display text-6xl md:text-8xl uppercase italic text-right">Releases</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                      {[
                        { title: "HAVE TO HAVE YOU", image: hthyCover, type: "New Release" },
                        { title: "Next To You", image: nextToYouCover, type: "Single" }
                      ].map((release, index) => (
                        <div key={index} className="group cursor-pointer">
                          <div className="aspect-square bg-zinc-900 mb-6 overflow-hidden relative">
                            <img 
                              src={release.image || (('seed' in release) ? `https://picsum.photos/seed/${(release as any).seed}/800/800` : '')} 
                              alt={release.title}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-pink-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <h3 className="font-display text-2xl uppercase">{release.title}</h3>
                          <p className="font-serif italic text-pink-accent">{release.type} / 2026</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}

            {activeTab === "About" && (
              <section className="min-h-screen flex items-center py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                  <div className="w-full max-w-md mx-auto aspect-[3/4] bg-zinc-100 overflow-hidden">
                    <img 
                      src={bioPic} 
                      alt="About"
                      className="w-full h-full object-cover grayscale"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-12">
                    <h2 className="font-display text-7xl uppercase leading-none">
                      Not a <br />
                      <span className="text-pink-accent">Singer.</span>
                    </h2>
                    <div className="space-y-6 text-xl leading-relaxed text-gray-600">
                      <p className="font-bold text-black">Not a songwriter.</p>
                      <p>But I wrote songs without knowing how.</p>
                      <p className="font-serif italic">All I have is me, myself, and my feelings.</p>
                    </div>
                    <div className="pt-6">
                      <div className="inline-block px-8 py-4 border-2 border-black font-display text-xs uppercase tracking-widest">
                        [ Pure Emotion ]
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Contact" && (
              <section className="min-h-screen flex items-center bg-bg-light py-24 px-6">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <div className="space-y-8">
                    <motion.h2 
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="font-logo text-7xl md:text-9xl uppercase leading-none tracking-tighter"
                    >
                      GET IN <br />
                      <span className="text-pink-accent">TOUCH</span>
                    </motion.h2>
                    <p className="text-lg text-gray-600 max-w-md font-serif italic">
                      For bookings, collaborations, or just to say hello. I'm always open to new creative energies.
                    </p>
                  </div>

                  <div className="space-y-16">
                    <div className="space-y-4">
                      <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-gray-400">Direct Email</p>
                      <motion.a 
                        href="mailto:havieera@outlook.com" 
                        whileHover={{ x: 10 }}
                        className="text-[16px] sm:text-2xl md:text-4xl font-logo uppercase block hover:text-pink-accent transition-colors"
                      >
                        havieera@outlook.com
                      </motion.a>
                    </div>

                    <div className="space-y-6">
                      <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-gray-400">Social Presence</p>
                      <div className="flex flex-wrap gap-6">
                        {[
                          { icon: X, url: "https://x.com/havieera?s=21", label: "X" },
                          { icon: Instagram, url: "https://www.instagram.com/havie_era?igsh=bWgxdTFkdWU5c3Yz&utm_source=qr", label: "Instagram" },
                          { icon: Youtube, url: "https://youtube.com/@havieera9924?si=P9NtME-iLhwYSDQL", label: "YouTube" },
                          { icon: Music2, url: "https://www.tiktok.com/@havieera?_r=1&_t=ZS-956uUWcQCJx", label: "TikTok" },
                          { icon: Ship, url: "https://opensea.io/profile/listings", label: "OpenSea" }
                        ].map((social, i) => (
                          <motion.a 
                            key={i} 
                            href={social.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            whileHover={{ y: -5 }}
                            className="flex items-center gap-3 group"
                          >
                            <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                              <social.icon size={20} />
                            </div>
                            <span className="text-[10px] uppercase font-bold tracking-widest hidden md:block">{social.label}</span>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 border-t border-black/5">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
                        Based in the Digital Era • Available Worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">
            © 2026 HAVIE ERA | All Rights Reserved
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: <X size={16} />, url: "https://x.com/havieera?s=21" },
              { icon: <Instagram size={16} />, url: "https://www.instagram.com/havie_era?igsh=bWgxdTFkdWU5c3Yz&utm_source=qr" },
              { icon: <Youtube size={16} />, url: "https://youtube.com/@havieera9924?si=P9NtME-iLhwYSDQL" },
              { icon: <Music2 size={16} />, url: "https://www.tiktok.com/@havieera?_r=1&_t=ZS-956uUWcQCJx" },
              { icon: <Ship size={16} />, url: "https://opensea.io/profile/listings" }
            ].map((s, i) => (
              <a 
                key={i} 
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-pink-accent cursor-pointer transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
