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
  "Waxing",
  "Facials",
  "Bleaches",
  "Packages",
  "Bridal",
  "Makeup",
] as const;

type Category = (typeof CATEGORIES)[number];

interface ServiceItem {
  name: string;
  price: string | null; // null for package items with no individual price
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
      { name: "Eyebrow Threading", price: "₹40" },
      { name: "Upper Lip", price: "₹10" },
      { name: "Chin", price: "₹30" },
      { name: "Full Face Threading", price: "₹100" },
    ],
  },
  {
    category: "Haircuts",
    emoji: "✂️",
    items: [
      { name: "Straight Cut", price: "₹70" },
      { name: "Light 'U' Cut", price: "₹100" },
      { name: "Deep 'U' Cut", price: "₹150" },
      { name: "'V' Cut", price: "₹150" },
      { name: "Step Cut", price: "₹400" },
      { name: "Layer Step", price: "₹450" },
      { name: "Feather Cut", price: "₹450" },
      { name: "Cutting & Setting", price: "₹750" },
      { name: "Front Layers", price: "₹100" },
      { name: "Baby Cut", price: "₹150" },
      { name: "Split Ends Cut", price: "₹250" },
    ],
  },
  {
    category: "Waxing",
    emoji: "🧴",
    items: [
      { name: "Hand Wax (Normal)", price: "₹250" },
      { name: "Hand Wax (Chocolate)", price: "₹300" },
      { name: "Half Leg Wax", price: "₹250" },
      { name: "Full Leg Wax", price: "₹400" },
      { name: "Underarms", price: "₹50" },
      { name: "Full Face Wax", price: "₹100" },
      { name: "Upper Lip Wax", price: "₹25" },
      { name: "Chin Wax", price: "₹50" },
    ],
  },
  {
    category: "Facials",
    emoji: "🌿",
    items: [
      { name: "Face Cleanup", price: "₹250" },
      { name: "Fruit Facial", price: "₹400" },
      { name: "Gel Facial", price: "₹500" },
      { name: "Wine Facial", price: "₹600" },
      { name: "Tea Tree Facial", price: "₹600" },
      { name: "Papaya Facial", price: "₹450" },
      { name: "Strawberry Facial", price: "₹450" },
      { name: "Mixed Fruit Facial", price: "₹500" },
      { name: "Galvanic Facial", price: "₹650" },
      { name: "Gold Facial", price: "₹1500" },
      { name: "Diamond Facial", price: "₹2000" },
      { name: "White Cleaning", price: "₹2500" },
      { name: "Bridal Facial", price: "₹2000" },
      { name: "D-Tan Facial", price: "₹650" },
    ],
  },
  {
    category: "Bleaches",
    emoji: "✨",
    items: [
      { name: "Cream Bleach", price: "₹250" },
      { name: "Fruit Bleach", price: "₹250" },
      { name: "Gel Bleach", price: "₹300" },
      { name: "Gold Bleach", price: "₹400" },
      { name: "Diamond Bleach", price: "₹500" },
      { name: "Oxy Bleach", price: "₹400" },
      { name: "Imported Bleach", price: "₹600" },
    ],
  },
  {
    category: "Packages",
    emoji: "📦",
    items: [
      {
        name: "₹1,500 Package",
        price: "₹1,500",
        note: "Fruit Facial · Manicure · Pedicure · Hand Wax · Head Massage",
      },
      {
        name: "₹2,000 Package",
        price: "₹2,000",
        note: "Fruit Facial · Leg Wax · Hand Wax · D-Tan · Manicure · Head Massage",
      },
      {
        name: "₹2,499 Package",
        price: "₹2,499",
        note: "Fruit Herbal Bleach · Wine Facial · Under Eye Treatment · Back Massage · Head Oil Massage · Basic Haircut · Eyebrows",
      },
      {
        name: "₹3,499 Package",
        price: "₹3,499",
        note: "Face D-Tan · Skin Brightening / Anti-Aging · Pimple / Pigmentation Treatment · Back Massage · Pedicure · Manicure · Head Massage & Hair Spa · Hand & Leg Wax · Advanced Hair Cut",
      },
    ],
  },
  {
    category: "Bridal",
    emoji: "👰",
    items: [
      {
        name: "₹10,000 Bridal Package",
        price: "₹10,000",
        note: "Facial · Hand & Leg Wax · Pedicure · Manicure · Eyebrow · Bridal Jewellery · Makeup",
      },
      {
        name: "₹15,000 Bridal Package",
        price: "₹15,000",
        note: "Makeup ×2 · Facial ×2 · Leg Wax ×2 · Hand Wax ×2 · Pedicure ×2 · Manicure ×2 · Jewellery ×2 · Mehendi ×2",
      },
    ],
  },
  {
    category: "Makeup",
    emoji: "💋",
    items: [
      { name: "Party Makeup", price: "₹1,500" },
      { name: "Engagement Makeup", price: "₹3,000" },
      { name: "Normal Bridal Makeup", price: "₹3,500" },
      { name: "M.A.C Makeup", price: "₹8,000" },
      { name: "H.D Makeup", price: "₹5,000" },
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

  // Show first 4 items collapsed, rest revealed on expand
  const PREVIEW = 4;
  const hasMore = group.items.length > PREVIEW;
  const visible = open ? group.items : group.items.slice(0, PREVIEW);

  return (
    <div className="bg-background border border-border flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border flex items-center gap-3 ">
        <span className="text-xl">{group.emoji}</span>
        <h3 className="font-display text-xl text-ink">{group.category}</h3>
        <span className="ml-auto text-xs text-muted-foreground">
          {group.items.length} services
        </span>
      </div>

      {/* Items */}
      <ul className="flex-1 divide-y divide-border">
        {visible.map((item) => (
          <li key={item.name} className="px-6 py-3">
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-ink leading-snug">{item.name}</span>
              <span className="text-sm font-medium text-rose shrink-0">
                {item.price}
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

      {/* Expand toggle */}
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
        {/* Hero text */}
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

        {/* Category filter */}
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        {/* Service cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((group, i) => (
            <SectionReveal key={group.category} delay={i * 0.06}>
              <ServiceCard group={group} />
            </SectionReveal>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/booking" className="btn-primary">
            Book Your Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}