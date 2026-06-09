import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { services } from "@/data/services";
import { SectionReveal } from "@/components/SectionReveal";

// Service categories with emojis
const SERVICE_CATEGORIES = [
  { name: "Threading", emoji: "💁‍♀️", textClass: "text-rose", bgClass: "bg-pink-100" },
  { name: "Haircuts", emoji: "✂️", textClass: "text-violet-600", bgClass: "bg-emerald-100" },
  { name: "Waxing", emoji: "🧴", textClass: "text-amber-700", bgClass: "bg-amber-100" },
  { name: "Facials", emoji: "🌿", textClass: "text-emerald-700", bgClass: "bg-emerald-100" },
  { name: "Bleaches", emoji: "✨", textClass: "text-sky-700", bgClass: "bg-sky-100" },
  { name: "Packages", emoji: "📦", textClass: "text-fuchsia-700", bgClass: "bg-fuchsia-100" },
  { name: "Bridal", emoji: "👰", textClass: "text-pink-700", bgClass: "bg-pink-100" },
  { name: "Makeup", emoji: "💋", textClass: "text-rose-700", bgClass: "bg-rose-100" },
];

function groupServicesByCategory() {
  const grouped: Record<string, typeof services> = {};
  
  services.forEach((service) => {
    let category = "";
    
    if (service.slug.includes("threading")) category = "Threading";
    else if (service.slug.includes("cut") || service.slug.includes("layer") || service.slug.includes("feather") || service.slug.includes("step")) category = "Haircuts";
    else if (service.slug.includes("wax")) category = "Waxing";
    else if (service.slug.includes("facial") || service.slug.includes("cleanup") || service.slug.includes("d-tan")) category = "Facials";
    else if (service.slug.includes("bleach")) category = "Bleaches";
    else if (service.slug.includes("pkg")) category = "Packages";
    else if (service.slug.includes("bridal")) category = "Bridal";
    else if (service.slug.includes("makeup")) category = "Makeup";
    
    if (!category) return;
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(service);
  });
  
  return grouped;
}

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
  const selectedService = services.find((s) => s.slug === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
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
              const categoryEmoji = SERVICE_CATEGORIES.find(
                (c) => c.name === category
              )?.emoji || "•";

              return (
                <div key={category}>
                  <div className={`px-4 py-2 text-xs font-display uppercase tracking-widest border-b border-border/50 sticky top-0 ${SERVICE_CATEGORIES.find((c) => c.name === category)?.bgClass ?? "bg-blush/10"}`}>
                    <span className={`${SERVICE_CATEGORIES.find((c) => c.name === category)?.textClass ?? "text-muted-foreground"}`}>
                      {categoryEmoji} {category}
                    </span>
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
    const selectedServiceItem = services.find((s) => s.slug === serviceSlug);
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
