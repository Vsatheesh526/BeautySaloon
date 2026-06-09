import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
    import heroImg from "@/assets/hero-botanical.jpg";

// import heroImg from "@/assets/logo2.png";
import { services, testimonials } from "@/data/services";
import { SectionReveal } from "@/components/SectionReveal";

const featuredServices = [
  "wine-facial",
  "full-leg-wax",
  "hd-makeup",
]
  .map((slug) => services.find((service) => service.slug === slug))
  .filter((service): service is (typeof services)[number] => Boolean(service));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harika Beauty Saloon — Enhancing Your Natural Beauty" },
      { name: "description", content: "Modern beauty saloon in San Francisco offering hair, makeup, facials, manicures and spa rituals." },
      { property: "og:title", content: "Harika Beauty Saloon" },
      { property: "og:description", content: "Enhancing your natural beauty." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-blush overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-8 items-center min-h-[85vh] py-16">
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="font-script text-7xl md:text-8xl text-white/90 leading-none mb-2"
            >Hello</motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
              className="font-display text-5xl md:text-7xl text-ink leading-[1.05] tracking-tight"
            >
              Harika Beauty<br />Saloon
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-6 text-lg text-foreground/70 max-w-md"
            >
              Your destination for beauty and relaxation. Enhancing your natural radiance with personalised, luxurious care.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link to="/booking" className="btn-primary">Schedule Your Visit</Link>
              <Link to="/services" className="btn-outline">View Services</Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}
            className="relative h-[420px] lg:h-[600px]"
          >
            <img src={heroImg} alt="Botanical illustration with peony and cotton" width={1000} height={1000} className="absolute inset-0  object-cover object-right rounded-sm" />
          </motion.div>
        </div>
      </section>

      {/* SERVICE HIGHLIGHTS */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionReveal className="text-center mb-16">
            <p className="eyebrow">Our Services</p>
            <h2 className="font-display text-4xl md:text-5xl mt-4 text-ink">Enhancing beauty with, <span className="font-script text-rose">timeless</span> care</h2>
          </SectionReveal>
          <div className="grid md:grid-cols-3 gap-10">
            {featuredServices.map((s, i) => (
              <SectionReveal key={s.slug} delay={i * 0.1} className="text-center group">
                <div className="aspect-square overflow-hidden mb-6 bg-blush/40">
                  <img src={s.image} alt={s.title} loading="lazy" width={768} height={768} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="font-display text-2xl text-ink">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-3">{s.duration} | Starting at {s.price}</p>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{s.description}</p>
              </SectionReveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/booking" className="btn-primary">Book Your Appointment</Link>
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="py-24 bg-blush/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <SectionReveal>
            <p className="eyebrow">About Harika Beauty Saloon</p>
            <h2 className="font-display text-4xl md:text-6xl mt-6 text-ink leading-tight">
              Welcome to your <br /><span className="italic">beauty haven</span>
            </h2>
            <p className="mt-8 max-w-2xl mx-auto text-foreground/70 leading-relaxed">
              At Harika Beauty Saloon, we believe in enhancing your natural beauty through personalised services.
              Our expert team is dedicated to providing you with a luxurious experience tailored to your needs —
              from hair styling to spa treatments, we help you look and feel your best.
            </p>
            <Link to="/about" className="btn-outline mt-8 inline-flex">Our Story</Link>
          </SectionReveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <SectionReveal className="text-center mb-14">
            <p className="eyebrow">Kind Words</p>
            <h2 className="font-display text-4xl md:text-5xl mt-4 text-ink">From our <span className="font-script text-rose">guests</span></h2>
          </SectionReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <SectionReveal key={t.name} delay={i * 0.1}>
                <div className="bg-blush/40 p-10 text-center h-full">
                  <p className="eyebrow">{t.name}</p>
                  <p className="font-display text-xl text-ink mt-6 leading-relaxed">“{t.quote}”</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
