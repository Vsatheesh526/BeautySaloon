import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/about-portrait.jpg";
import { team } from "@/data/services";
import { SectionReveal } from "@/components/SectionReveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Harika Beauty Saloon" },
      { name: "description", content: "Meet the team behind Harika Beauty Saloon and discover our story." },
      { property: "og:title", content: "About — Harika Beauty Saloon" },
      { property: "og:description", content: "Our story, our team, our craft." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="py-20 bg-blush/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-center">
          <SectionReveal>
            <img src={portrait} alt="Beautician portrait" width={896} height={1152} className="w-full object-cover" />
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="eyebrow">About Harika Beauty Saloon</p>
            <h1 className="font-display text-5xl md:text-6xl mt-4 text-ink leading-tight">
              Welcome to your <br />Beauty <span className="font-script text-rose">Haven</span>
            </h1>
            <p className="mt-6 text-foreground/70 leading-relaxed">
              Founded in 2015, Harika Beauty Saloon was born from a love of considered, modern beauty.
              We believe true luxury is personal — a quiet hour, a perfect cut, a flawless glow.
            </p>
            <p className="mt-4 text-foreground/70 leading-relaxed">
              Our certified team brings together decades of editorial, bridal and clinical skincare
              experience, all under one calm, sunlit roof in the heart of San Francisco.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { n: "16+", l: "Years" },
                { n: "500+", l: "Happy Guests" },
                { n: "12", l: "Specialists" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl text-rose">{s.n}</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <SectionReveal className="text-center mb-14">
            <p className="eyebrow">Our Team</p>
            <h2 className="font-display text-4xl md:text-5xl mt-4 text-ink">Meet the <span className="font-script text-rose">specialists</span></h2>
          </SectionReveal>
          <div className="grid md:grid-cols-3 gap-10">
            {team.map((m, i) => (
              <SectionReveal key={m.name} delay={i * 0.1} className="text-center">
                <div className="aspect-square bg-blush/50 mb-6 flex items-center justify-center">
                  <span className="font-script text-7xl text-rose">{m.name[0]}</span>
                </div>
                <h3 className="font-display text-2xl text-ink">{m.name}</h3>
                <p className="eyebrow mt-2">{m.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
