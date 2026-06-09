import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { MapPin, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Harika Beauty Saloon" },
      { name: "description", content: "Get in touch with Harika Beauty Saloon. Visit us in San Francisco or message us anytime." },
      { property: "og:title", content: "Contact — Harika Beauty Saloon" },
      { property: "og:description", content: "Let's get in touch." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    // Get form values directly from form elements
    const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
    const messageInput = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    
    const name = nameInput?.value.trim() ?? "";
    const email = emailInput?.value.trim() ?? "";
    const message = messageInput?.value.trim() ?? "";

    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    const whatsappMessage = `Hello Harika Beauty Saloon,\n\nI have a message for you:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nPlease get back to me.`;
    const whatsappUrl = `https://wa.me/919490269754?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    form.reset();
  }
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionReveal className="text-center mb-14">
          <p className="eyebrow">Let's Get In Touch</p>
          <h1 className="font-display text-5xl md:text-6xl mt-4 text-ink">Say <span className="font-script text-rose">hello</span></h1>
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          <SectionReveal>
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="eyebrow block mb-2">Name</label>
                <input required name="name" type="text" className="w-full bg-transparent border-b border-border py-3 focus:border-rose outline-none transition-colors" />
              </div>
              <div>
                <label className="eyebrow block mb-2">Email</label>
                <input required name="email" type="email" className="w-full bg-transparent border-b border-border py-3 focus:border-rose outline-none transition-colors" />
              </div>
              <div>
                <label className="eyebrow block mb-2">Message</label>
                <textarea required name="message" rows={5} className="w-full bg-transparent border-b border-border py-3 focus:border-rose outline-none transition-colors resize-none" />
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
              {sent && <p className="text-rose text-sm">Thank you — we'll be in touch shortly.</p>}
            </form>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="bg-blush/40 p-8 space-y-5">
              <div className="flex gap-4">
                <MapPin className="text-rose shrink-0 mt-1" size={20} />
                <div>
                  <p className="eyebrow">Visit</p>
                  <p className="text-foreground/80 mt-1">Lakshmi Nagar Street, Opp. M.R.O Office, Main Road, Penumuru</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="text-rose shrink-0 mt-1" size={20} />
                <div>
                  <p className="eyebrow">Email</p>
                  <p className="text-foreground/80 mt-1">Harika@beautyparlorstudio.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="text-rose shrink-0 mt-1" size={20} />
                <div>
                  <p className="eyebrow">Call</p>
                  <p className="text-foreground/80 mt-1">94902 69754, 80745 26743</p>
                </div>
              </div>
            </div>
            <div className="mt-6 aspect-video">
              <iframe
                title="Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2744.514624287083!2d79.19358810866449!3d13.366160506054864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb2a7f7d8860a63%3A0x280c0c7fc746e5b!2sHarika%20beauty%20parlour!5e1!3m2!1sen!2sin!4v1780983191810!5m2!1sen!2sin"
                className="w-full h-full border-0 filter saturate-125 contrast-110"
                loading="lazy"
              />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
