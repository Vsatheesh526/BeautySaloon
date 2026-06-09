import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import g1 from "../assets/gallery-1.jpg";
import g2 from "../assets/gallery-2.jpg";
import g3 from "../assets/gallery-3.png";
import g4 from "../assets/gallery-4.jpg";
import g5 from "../assets/gallery-5.jpg";
import g6 from "../assets/gallery-6.jpg";
import g7 from "../assets/gallery-7.png";
import g8 from "../assets/gallery-8.jpg";
import g9 from "../assets/gallery-9.png";
import g10 from "../assets/gallery-10.png";
import g11 from "../assets/gallery-11.png";
import g12 from "../assets/gallery-12.png";
import g13 from "../assets/gallery-13.png";
import g14 from "../assets/gallery-14.png";
import g15 from "../assets/gallery-15.png";
import g16 from "../assets/gallery-16.png";
import g17 from "../assets/gallery-17.png";
import g18 from "../assets/gallery-18.png";
import g19 from "../assets/gallery-19.png";
import { SectionReveal } from "../components/SectionReveal";
import { Lightbox } from "../components/Lightbox";
import SALON_VIDEO_URL from "../assets/salon-tour.mp4?url";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Harika Beauty Saloon" },
      { name: "description", content: "Browse looks, transformations and behind-the-scenes from Harika Beauty Saloon." },
      { property: "og:title", content: "Gallery — Harika Beauty Saloon" },
      { property: "og:description", content: "A visual journey through our work." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const images = [
  { src: g2, alt: "Bridal bouquet", span: "row-span-2 md:col-span-2" },
  { src: g1, alt: "Nail polish flat lay", span: "" },
  { src: g3, alt: "Facial treatment", span: "" },
  { src: g4, alt: "Hair styling tools", span: "" },
  { src: g5, alt: "Hot stone spa", span: "row-span-2" },
  { src: g6, alt: "Skincare flat lay", span: "" },
  { src: g7, alt: "Hair styling session", span: "" },
  { src: g8, alt: "Makeup brush set", span: "" },
  { src: g9, alt: "Beauty product display", span: "" },
  { src: g10, alt: "Polished manicure detail", span: "row-span-2 md:col-span-2" },
  { src: g11, alt: "Relaxing spa treatment", span: "" },
  { src: g12, alt: "Salon interior design", span: "" },
  { src: g13, alt: "Styled hair closeup", span: "" },
  { src: g14, alt: "Glowing skin treatment", span: "row-span-2" },
  { src: g15, alt: "Bridal hair styling", span: "" },
  { src: g16, alt: "Color transformation", span: "" },
  { src: g17, alt: "Serene relaxation moment", span: "" },
  { src: g18, alt: "Floral beauty styling", span: "row-span-2 md:col-span-2" },
  { src: g19, alt: "",span: ""}
];

function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionReveal className="text-center mb-14">
          <p className="eyebrow">Gallery</p>
          <h1 className="font-display text-5xl md:text-6xl mt-4 text-ink">Moments of <span className="font-script text-rose">beauty</span></h1>
        </SectionReveal>

        {/* Featured HD Video */}
        <SectionReveal delay={0.1} className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-ink">
            <video
              ref={videoRef}
              src={SALON_VIDEO_URL}
              autoPlay
              muted
              loop
              playsInline
              className="w-full aspect-video object-cover"
            />
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
              <span className="text-white/80 text-sm font-medium tracking-wide uppercase">HD Experience</span>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-4 text-sm">Step inside our serene sanctuary — where beauty meets tranquility.</p>
        </SectionReveal>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] md:auto-rows-[260px] gap-4">
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`relative overflow-hidden group ${img.span}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" width={768} height={768} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={images}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
