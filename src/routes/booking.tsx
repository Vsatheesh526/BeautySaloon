import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";

// ─── Real service data from the WhatsApp poster ─────────────────────────────

// Flatten all services into a list of { slug, title, price, category }
const REAL_SERVICES = [
  // Threading
  { slug: "eyebrow-shape", title: "Eyebrow shape", price: "₹50", category: "Threading" },
  { slug: "upper-lip", title: "Upper Lip", price: "₹30", category: "Threading" },
  { slug: "chin", title: "Chin", price: "₹40", category: "Threading" },
  { slug: "full-face-threading", title: "Full Face", price: "₹150", category: "Threading" },
  // Haircuts
  { slug: "hair-split-ends", title: "Hair split ends", price: "₹350", category: "Haircuts" },
  { slug: "baby-hair-cut", title: "Baby Hair cut", price: "₹200", category: "Haircuts" },
  { slug: "straight-cut", title: "Straight cut", price: "₹200", category: "Haircuts" },
  { slug: "light-u-cut", title: "Light U cut", price: "₹250", category: "Haircuts" },
  { slug: "deep-u-cut", title: "Deep U cut", price: "₹250", category: "Haircuts" },
  { slug: "step-cut", title: "Step cut", price: "₹550", category: "Haircuts" },
  { slug: "layer-cut", title: "Layer cut", price: "₹550", category: "Haircuts" },
  { slug: "father-cut", title: "Father cut", price: "₹600", category: "Haircuts" },
  { slug: "step-with-layers", title: "Step with layers", price: "₹650", category: "Haircuts" },
  { slug: "butterfly-cut", title: "Butterfly cut", price: "₹650", category: "Haircuts" },
  { slug: "blow-dry-setting", title: "Blow dry setting", price: "₹400", category: "Haircuts" },
  // Hair Treatments
  { slug: "hair-wash-conditioning", title: "Hair wash & conditioning", price: "₹250", category: "Hair Treatments" },
  { slug: "hair-spa", title: "Hair Spa", price: "₹700 / ₹800 / ₹1000", category: "Hair Treatments" },
  { slug: "hair-conditioning-pack", title: "Hair Conditioning pack", price: "₹500 / ₹700", category: "Hair Treatments" },
  { slug: "henna", title: "Henna", price: "₹400+", category: "Hair Treatments" },
  { slug: "hair-coloring", title: "Hair Coloring", price: "₹350+", category: "Hair Treatments" },
  { slug: "hair-regrowth", title: "Hair Re-growth treatment", price: "₹1000", category: "Hair Treatments" },
  { slug: "hair-dandruff", title: "Hair Dandruff treatment", price: "₹1000", category: "Hair Treatments" },
  // Waxing
  { slug: "face-wax", title: "Face wax", price: "₹200", category: "Waxing" },
  { slug: "upper-lip-wax", title: "Upper Lip wax", price: "₹50", category: "Waxing" },
  { slug: "chin-wax", title: "Chin wax", price: "₹100", category: "Waxing" },
  { slug: "under-arm-wax", title: "Under arm wax", price: "₹100", category: "Waxing" },
  { slug: "hand-wax", title: "Hand wax", price: "₹350", category: "Waxing" },
  { slug: "half-leg-wax", title: "Half leg wax", price: "₹350", category: "Waxing" },
  { slug: "full-leg-wax", title: "Full leg wax", price: "₹600", category: "Waxing" },
  // Massages
  { slug: "relaxing-face-massage", title: "Relaxing face massage", price: "₹400", category: "Massages" },
  { slug: "head-massage-oil", title: "Head Massage (oil)", price: "₹400", category: "Massages" },
  { slug: "neck-massage-oil", title: "Neck Massage (oil)", price: "₹400", category: "Massages" },
  // Nail Care
  { slug: "pedicure", title: "Pedicure", price: "₹650", category: "Nail Care" },
  { slug: "manicure", title: "Manicure", price: "₹600", category: "Nail Care" },
  // Facials & Cleanups
  { slug: "regular-cleanup", title: "Regular Cleanup", price: "₹350", category: "Facials" },
  { slug: "fruit-cleanup", title: "Fruit Cleanup", price: "₹400", category: "Facials" },
  { slug: "oil-remove-cleanup", title: "Oil Remove cleanup", price: "₹500", category: "Facials" },
  { slug: "dry-skin-cleanup", title: "Dry skin cleanup", price: "₹400", category: "Facials" },
  { slug: "gold-cleanup", title: "Gold cleanup", price: "₹600", category: "Facials" },
  { slug: "pimple-cleanup", title: "Pimple cleanup", price: "₹500", category: "Facials" },
  { slug: "basic-facial", title: "Basic facial", price: "₹500", category: "Facials" },
  { slug: "mixed-fruit-facial", title: "Mixed fruit facial", price: "₹600", category: "Facials" },
  { slug: "papaya-facial", title: "Papaya facial", price: "₹650", category: "Facials" },
  { slug: "tea-tree-facial", title: "Tea tree facial", price: "₹650", category: "Facials" },
  { slug: "strawberry-facial", title: "Strawberry facial", price: "₹600", category: "Facials" },
  { slug: "gel-facial", title: "Gel facial", price: "₹750", category: "Facials" },
  { slug: "wine-facial", title: "Wine facial", price: "₹750", category: "Facials" },
  { slug: "pearl-facial", title: "Pearl facial", price: "₹1000", category: "Facials" },
  { slug: "cucumber-facial", title: "Cucumber facial", price: "₹1200", category: "Facials" },
  { slug: "dtan-facial", title: "Dtan facial", price: "₹1400", category: "Facials" },
  { slug: "7step-facial", title: "7 step facial", price: "₹1500", category: "Facials" },
  { slug: "8step-facial", title: "8 step facial", price: "₹2000", category: "Facials" },
  { slug: "gold-facial", title: "Gold facial", price: "₹2000", category: "Facials" },
  { slug: "diamond-facial", title: "Diamond facial", price: "₹2500", category: "Facials" },
  { slug: "o3-facial", title: "O3 facial", price: "₹2500", category: "Facials" },
  { slug: "skin-miracle", title: "Skin miracle", price: "₹2000", category: "Facials" },
  { slug: "whitening-facial", title: "Whitening facial", price: "₹2500", category: "Facials" },
  { slug: "antiaging-facial", title: "Anti-aging facial", price: "₹2000", category: "Facials" },
  { slug: "shanhaz-facial", title: "Shanhaz facial", price: "₹1500", category: "Facials" },
  { slug: "galvanic-facial", title: "Galvanic facial", price: "₹800", category: "Facials" },
  // Bleaches
  { slug: "cream-bleach", title: "Cream Bleach", price: "₹300", category: "Bleaches" },
  { slug: "fruit-bleach", title: "Fruit Bleach", price: "₹350", category: "Bleaches" },
  { slug: "haldi-chandan", title: "Haldi chandan", price: "₹400", category: "Bleaches" },
  { slug: "o3-gel-bleach", title: "O3 Gel Bleach", price: "₹400", category: "Bleaches" },
  { slug: "gold-bleach", title: "Gold Bleach", price: "₹450", category: "Bleaches" },
  { slug: "diamond-bleach", title: "Diamond Bleach", price: "₹450", category: "Bleaches" },
  { slug: "oxy-bleach", title: "Oxy Bleach", price: "₹500", category: "Bleaches" },
  { slug: "dtan-face-neck", title: "Dtan (face & neck)", price: "₹500", category: "Bleaches" },
  { slug: "underarm-dtan", title: "Under arm dtan", price: "₹500", category: "Bleaches" },
  { slug: "neck-bleach", title: "Neck Bleach", price: "₹550", category: "Bleaches" },
  { slug: "neck-dtan", title: "Neck Dtan", price: "₹550", category: "Bleaches" },
  { slug: "face-dtan", title: "Face Dtan", price: "₹600", category: "Bleaches" },
  { slug: "face-hands-legs-bleach", title: "Face, Hands & Legs Bleach", price: "₹600", category: "Bleaches" },
  // Makeup
  { slug: "basic-makeup", title: "Basic Makeup", price: "₹6000", category: "Makeup" },
  { slug: "bridal-guest-makeup", title: "Bridal guest makeup", price: "₹2500", category: "Makeup" },
  { slug: "bridal-hd-makeup", title: "Bridal H.D. makeup", price: "₹7000", category: "Makeup" },
  { slug: "glossy-no-makeup", title: "Glossy & No makeup look", price: "₹7500", category: "Makeup" },
  { slug: "engagement-makeup", title: "Engagement Makeup", price: "₹6000", category: "Makeup" },
  // Bridal Packages
  { slug: "silver-package", title: "Silver Package", price: "₹12,000", category: "Bridal" },
  { slug: "golden-package", title: "Golden Package", price: "₹18,000", category: "Bridal" },
  { slug: "platinum-package", title: "Platinum Package", price: "₹25,000", category: "Bridal" },
  { slug: "bridal-jewellery", title: "Bridal Jewellery", price: "₹2,000 – ₹5,000", category: "Bridal" },
  { slug: "bridal-mehendi", title: "Bridal Mehendi", price: "₹2,000 – ₹7,000", category: "Bridal" },
  { slug: "saree-box-folding", title: "Saree Box folding", price: "₹350 – ₹500", category: "Bridal" },
];

// Categories with emojis & styling (matches services page)
const SERVICE_CATEGORIES = [
  { name: "Threading", emoji: "🪶", textClass: "text-rose", bgClass: "bg-pink-100" },
  { name: "Haircuts", emoji: "✂️", textClass: "text-violet-600", bgClass: "bg-emerald-100" },
  { name: "Hair Treatments", emoji: "💆‍♀️", textClass: "text-indigo-600", bgClass: "bg-indigo-100" },
  { name: "Waxing", emoji: "🧴", textClass: "text-amber-700", bgClass: "bg-amber-100" },
  { name: "Massages", emoji: "🖐️", textClass: "text-teal-600", bgClass: "bg-teal-100" },
  { name: "Nail Care", emoji: "💅", textClass: "text-pink-600", bgClass: "bg-pink-100" },
  { name: "Facials", emoji: "🌿", textClass: "text-emerald-700", bgClass: "bg-emerald-100" },
  { name: "Bleaches", emoji: "✨", textClass: "text-sky-700", bgClass: "bg-sky-100" },
  { name: "Makeup", emoji: "💋", textClass: "text-rose-700", bgClass: "bg-rose-100" },
  { name: "Bridal", emoji: "👰", textClass: "text-fuchsia-700", bgClass: "bg-fuchsia-100" },
];

function groupServicesByCategory() {
  const grouped: Record<string, typeof REAL_SERVICES> = {};
  for (const service of REAL_SERVICES) {
    if (!grouped[service.category]) grouped[service.category] = [];
    grouped[service.category].push(service);
  }
  return grouped;
}

// Dropdown component (unchanged except using REAL_SERVICES)
function ServiceDropdown({ 
  value, 
  onChange 
}: { 
  value: string; 
  onChange: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const grouped = groupServicesByCategory();
  const selectedService = REAL_SERVICES.find((s) => s.slug === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-transparent border-b border-border py-2.5 focus:border-rose outline-none text-left flex items-center justify-between group"
      >
        <span className="text-foreground">
          {selectedService ? `${selectedService.title} — ${selectedService.price}` : "Select a service…"}
        </span>
        <ChevronDown 
          size={18} 
          className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            {Object.entries(grouped).map(([category, categoryServices]) => {
              const catInfo = SERVICE_CATEGORIES.find((c) => c.name === category);
              const emoji = catInfo?.emoji || "•";
              const textClass = catInfo?.textClass || "text-muted-foreground";
              const bgClass = catInfo?.bgClass || "bg-blush/10";

              return (
                <div key={category}>
                  <div className={`px-4 py-2 text-xs font-display uppercase tracking-widest border-b border-border/50 sticky top-0 ${bgClass}`}>
                    <span className={textClass}>{emoji} {category}</span>
                  </div>
                  {categoryServices.map((service) => (
                    <button
                      key={service.slug}
                      type="button"
                      onClick={() => {
                        onChange(service.slug);
                        setOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-sm text-left hover:bg-blush/40 transition-colors border-b border-border/50 last:border-b-0 ${
                        value === service.slug ? "bg-rose/10 text-rose font-medium" : "text-foreground"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{service.title}</span>
                        <span className="text-xs font-medium">{service.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Harika Beauty Saloon" },
      { name: "description", content: "Schedule your visit to Harika Beauty Saloon. Quick and easy online booking." },
      { property: "og:title", content: "Book — Harika Beauty Saloon" },
      { property: "og:description", content: "Schedule your visit." },
      { property: "og:url", content: "/booking" },
    ],
    links: [{ rel: "canonical", href: "/booking" }],
  }),
  component: BookingPage,
});

function BookingPage() {
  const [success, setSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() ?? "";
    const phone = formData.get("phone")?.toString().trim() ?? "";
    const serviceSlug = formData.get("service")?.toString().trim() ?? "";
    const date = formData.get("date")?.toString().trim() ?? "";
    const time = formData.get("time")?.toString().trim() ?? "";
    const notes = formData.get("notes")?.toString().trim() ?? "None";
    const selectedServiceItem = REAL_SERVICES.find((s) => s.slug === serviceSlug);
    const serviceLabel = selectedServiceItem ? `${selectedServiceItem.title} — ${selectedServiceItem.price}` : serviceSlug;

    const message = `Hello Harika Beauty Saloon,\n\nI would like to book an appointment with the following details:\n- Name: ${name}\n- Phone: ${phone}\n- Service: ${serviceLabel}\n- Date: ${date}\n- Time: ${time}\n- Notes: ${notes}\n\nPlease confirm.`;
  const whatsappUrl = `https://wa.me/919490269754?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
  setSuccess(true);
  form.reset();
  setSelectedService("");
}

  return (
    <section className="py-20 bg-blush/30 min-h-[80vh]">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <SectionReveal className="text-center mb-12">
          <p className="eyebrow">Booking</p>
          <h1 className="font-display text-5xl md:text-6xl mt-4 text-ink">Schedule your <span className="font-script text-rose">visit</span></h1>
          <p className="mt-4 text-muted-foreground">We'll confirm your appointment within the hour.</p>
        </SectionReveal>

        <SectionReveal>
          <form onSubmit={onSubmit} className="bg-background p-8 md:p-12 space-y-6 border border-border">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="eyebrow block mb-2">Full Name</label>
                <input required name="name" type="text" className="w-full bg-transparent border-b border-border py-2.5 focus:border-rose outline-none" />
              </div>
              <div>
                <label className="eyebrow block mb-2">Phone</label>
                <input required name="phone" type="tel" className="w-full bg-transparent border-b border-border py-2.5 focus:border-rose outline-none" />
              </div>
            </div>
            <div>
              <label className="eyebrow block mb-2">Service</label>
              <ServiceDropdown value={selectedService} onChange={setSelectedService} />
              <input type="hidden" name="service" value={selectedService} required />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="eyebrow block mb-2">Date</label>
                <input required name="date" type="date" className="w-full bg-transparent border-b border-border py-2.5 focus:border-rose outline-none" />
              </div>
              <div>
                <label className="eyebrow block mb-2">Time</label>
                <input required name="time" type="time" className="w-full bg-transparent border-b border-border py-2.5 focus:border-rose outline-none" />
              </div>
            </div>
            <div>
              <label className="eyebrow block mb-2">Notes (optional)</label>
              <textarea name="notes" rows={3} className="w-full bg-transparent border-b border-border py-2.5 focus:border-rose outline-none resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full">Confirm Appointment</button>
          </form>
        </SectionReveal>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/70 flex items-center justify-center p-6"
            onClick={() => setSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="bg-background p-10 max-w-md text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <CheckCircle2 size={56} className="mx-auto text-rose mb-4" />
              <h2 className="font-display text-3xl text-ink">Appointment requested</h2>
              <p className="mt-3 text-muted-foreground">Thank you! We'll text you a confirmation shortly.</p>
              <button onClick={() => setSuccess(false)} className="btn-primary mt-6">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}