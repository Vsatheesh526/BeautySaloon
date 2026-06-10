import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Harika Beauty Saloon" },
      { name: "description", content: "Explore our full menu of beauty services — threading, haircuts, wax, facials, bleaches, packages & bridal." },
      { property: "og:title", content: "Services — Harika Beauty Saloon" },
      { property: "og:description", content: "Crafted beauty rituals for every occasion." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "Threading",
  "Haircuts",
  "Hair Treatments",
  "Waxing",
  "Massages",
  "Nail Care",
  "Facials",
  "Bleaches",
  "Makeup",
  "Bridal",
] as const;

type Category = (typeof CATEGORIES)[number];

interface ServiceItem {
  name: string;
  price: string | null;
  note?: string;
}

interface ServiceGroup {
  category: Category;
  emoji: string;
  items: ServiceItem[];
}

const SERVICE_DATA: ServiceGroup[] = [
  {
    category: "Threading",
    emoji: "🪶",
    items: [
      { name: "Eyebrow shape", price: "₹50" },
      { name: "Upper Lip", price: "₹30" },
      { name: "Chin", price: "₹40" },
      { name: "Full Face", price: "₹150" },
    ],
  },
  {
    category: "Haircuts",
    emoji: "✂️",
    items: [
      { name: "Hair split ends", price: "₹350" },
      { name: "Baby Hair cut", price: "₹200" },
      { name: "Straight cut", price: "₹200" },
      { name: "Light U cut", price: "₹250" },
      { name: "Deep U cut", price: "₹250" },
      { name: "Step cut", price: "₹550" },
      { name: "Layer cut", price: "₹550" },
      { name: "Father cut", price: "₹600" },
      { name: "Step with layers", price: "₹650" },
      { name: "Butterfly cut", price: "₹650" },
      { name: "Blow dry setting", price: "₹400" },
    ],
  },
  {
    category: "Hair Treatments",
    emoji: "💆‍♀️",
    items: [
      { name: "Hair wash & conditioning", price: "₹250" },
      { name: "Hair Spa", price: "₹700 / ₹800 / ₹1000" },
      { name: "Hair Conditioning pack", price: "₹500 / ₹700" },
      { name: "Henna", price: "₹400+" },
      { name: "Hair Coloring", price: "₹350+" },
      { name: "Hair Re-growth treatment", price: "₹1000" },
      { name: "Hair Dandruff treatment", price: "₹1000" },
      { name: "Temporary Hair Straightening", price: null, note: "Price on request" },
      { name: "Noodles Hair curing", price: null, note: "Price on request" },
    ],
  },
  {
    category: "Waxing",
    emoji: "🧴",
    items: [
      { name: "Face wax", price: "₹200" },
      { name: "Upper Lip wax", price: "₹50" },
      { name: "Chin wax", price: "₹100" },
      { name: "Under arm wax", price: "₹100" },
      { name: "Hand wax", price: "₹350" },
      { name: "Half leg wax", price: "₹350" },
      { name: "Full leg wax", price: "₹600" },
    ],
  },
  {
    category: "Massages",
    emoji: "🖐️",
    items: [
      { name: "Relaxing face massage", price: "₹400" },
      { name: "Head Massage (oil)", price: "₹400" },
      { name: "Neck Massage (oil)", price: "₹400" },
    ],
  },
  {
    category: "Nail Care",
    emoji: "💅",
    items: [
      { name: "Pedicure", price: "₹650" },
      { name: "Manicure", price: "₹600" },
    ],
  },
  {
    category: "Facials",
    emoji: "🌿",
    items: [
      { name: "Regular Cleanup", price: "₹350" },
      { name: "Fruit Cleanup", price: "₹400" },
      { name: "Oil Remove cleanup", price: "₹500" },
      { name: "Dry skin cleanup", price: "₹400" },
      { name: "Gold cleanup", price: "₹600" },
      { name: "Pimple cleanup", price: "₹500" },
      { name: "Basic facial", price: "₹500" },
      { name: "Mixed fruit facial", price: "₹600" },
      { name: "Papaya facial", price: "₹650" },
      { name: "Tea tree facial", price: "₹650" },
      { name: "Strawberry facial", price: "₹600" },
      { name: "Gel facial", price: "₹750" },
      { name: "Wine facial", price: "₹750" },
      { name: "Pearl facial", price: "₹1000" },
      { name: "Cucumber facial", price: "₹1200" },
      { name: "Dtan facial", price: "₹1400" },
      { name: "7 step facial", price: "₹1500" },
      { name: "8 step facial", price: "₹2000" },
      { name: "Gold facial", price: "₹2000" },
      { name: "Diamond facial", price: "₹2500" },
      { name: "O3 facial", price: "₹2500" },
      { name: "Skin miracle", price: "₹2000" },
      { name: "Whitening facial", price: "₹2500" },
      { name: "Anti-aging facial", price: "₹2000" },
      { name: "Shanhaz facial", price: "₹1500" },
      { name: "Galvanic facial", price: "₹800" },
    ],
  },
  {
    category: "Bleaches",
    emoji: "✨",
    items: [
      { name: "Cream Bleach", price: "₹300" },
      { name: "Fruit Bleach", price: "₹350" },
      { name: "Haldi chandan", price: "₹400" },
      { name: "O3 Gel Bleach", price: "₹400" },
      { name: "Gold Bleach", price: "₹450" },
      { name: "Diamond Bleach", price: "₹450" },
      { name: "Oxy Bleach", price: "₹500" },
      { name: "Dtan (face & neck)", price: "₹500" },
      { name: "Under arm dtan", price: "₹500" },
      { name: "Neck Bleach", price: "₹550" },
      { name: "Neck Dtan", price: "₹550" },
      { name: "Face Dtan", price: "₹600" },
      { name: "Face, Hands & Legs Bleach", price: "₹600" },
    ],
  },
  {
    category: "Makeup",
    emoji: "💋",
    items: [
      { name: "Basic Makeup", price: "₹6000" },
      { name: "Bridal guest makeup", price: "₹2500" },
      { name: "Bridal H.D. makeup", price: "₹7000" },
      { name: "Glossy & No makeup look", price: "₹7500" },
      { name: "Engagement Makeup", price: "₹6000" },
    ],
  },
  {
    category: "Bridal",
    emoji: "👰",
    items: [
      {
        name: "Silver Package",
        price: "₹12,000",
        note: "Reception Makeup + Muhurtham Makeup · Reception Jewelry Free · 2 Saree Box folding Free",
      },
      {
        name: "Golden Package",
        price: "₹18,000",
        note: "Reception Makeup + Muhurtham Makeup + Naluu Makeup · Reception & Muhurtham Jewelry Free · 2 Sarees Box folding Free",
      },
      {
        name: "Platinum Package",
        price: "₹25,000",
        note: "Reception + Muhurtham + Engagement + Nalugu Makeup · 3 Bridal Jewelry Free · Complimentary one guest makeup · 4 Sarees Box folding Free",
      },
      { name: "Bridal Jewellery", price: "₹2,000 – ₹5,000" },
      { name: "Bridal Mehendi", price: "₹2,000 – ₹7,000" },
      { name: "Saree Box folding", price: "₹350 – ₹500" },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryTabs({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={[
            "px-4 py-1.5 text-sm rounded-full border transition-colors duration-200 cursor-pointer",
            active === cat
              ? "bg-rose text-white border-rose"
              : "bg-background text-muted-foreground border-border hover:border-rose hover:text-rose",
          ].join(" ")}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function ServiceCard({ group }: { group: ServiceGroup }) {
  const [open, setOpen] = useState(false);

  const PREVIEW = 4;
  const hasMore = group.items.length > PREVIEW;
  const visible = open ? group.items : group.items.slice(0, PREVIEW);

  return (
    <div className="bg-background border border-border flex flex-col">
      <div className="px-6 pt-6 pb-4 border-b border-border flex items-center gap-3">
        <span className="text-xl">{group.emoji}</span>
        <h3 className="font-display text-xl text-ink">{group.category}</h3>
        <span className="ml-auto text-xs text-muted-foreground">
          {group.items.length} services
        </span>
      </div>

      <ul className="flex-1 divide-y divide-border">
        {visible.map((item) => (
          <li key={item.name} className="px-6 py-3">
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-ink leading-snug">{item.name}</span>
              <span className="text-sm font-medium text-rose shrink-0">
                {item.price ?? "—"}
              </span>
            </div>
            {item.note && (
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {item.note}
              </p>
            )}
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full px-6 py-3 text-xs text-rose border-t border-border hover:bg-blush/20 transition-colors text-left cursor-pointer"
        >
          {open
            ? "Show less ↑"
            : `Show ${group.items.length - PREVIEW} more ↓`}
        </button>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? SERVICE_DATA
      : SERVICE_DATA.filter((g) => g.category === activeCategory);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionReveal className="text-center mb-12">
          <p className="eyebrow">Our Services</p>
          <h1 className="font-display text-5xl md:text-6xl mt-4 text-ink">
            Beauty,{" "}
            <span className="font-script text-rose">curated</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground">
            Every service is performed by certified specialists using premium,
            skin-loving products.
          </p>
        </SectionReveal>

        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((group, i) => (
            <SectionReveal key={group.category} delay={i * 0.06}>
              <ServiceCard group={group} />
            </SectionReveal>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/booking" className="btn-primary">
            Book Your Appointment
          </Link>
        </div>

        {/* Contact & Address from original poster */}
        <div className="mt-20 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="font-medium text-ink">📞 Call us: 99517 12604</p>
          <p className="mt-1">
            17-427, Beside Royalaseema Dental Clinic, Sundarayyar Street, Chittoor.
          </p>
        </div>
      </div>
    </section>
  );
}