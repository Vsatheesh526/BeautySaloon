import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-blush/40 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center mb-12">
          <p className="eyebrow">Let's get in touch</p>
          <h2 className="font-display text-4xl md:text-5xl mt-4 text-ink">
            Visit our <span className="font-script text-rose">studio</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          <div>
            <h4 className="font-display text-lg mb-3 text-ink">Harika Beauty Saloon</h4>
            <p className="text-muted-foreground leading-relaxed">
              A sanctuary for modern beauty, dedicated to enhancing your natural radiance.
            </p>
            <Link to="/booking" className="btn-primary mt-5 !py-2 !px-5 !text-xs">Book Now</Link>
          </div>
          <div>
            <h4 className="font-display text-lg mb-3 text-ink">Info</h4>
            <p className="text-muted-foreground">Lakshmi Nagar Street, Opp. M.R.O Office, Main Road, Penumuru</p>
            
            <p className="text-muted-foreground mt-2">Harika@beautyparlorstudio.com</p>
            <p className="text-muted-foreground">9490269754</p>
          </div>
          <div>
            <h4 className="font-display text-lg mb-3 text-ink">Opening Hours</h4>
            <p className="text-muted-foreground">Mon – Fri: 9am – 7pm</p>
            <p className="text-muted-foreground">Sat: 9am – 7pm</p>
            <p className="text-muted-foreground">Sun: 9am – pm</p>
          </div>
          <div>
            <h4 className="font-display text-lg mb-3 text-ink">Follow</h4>
            <div className="flex gap-4 text-ink">
              <a href="https://www.instagram.com/harikabeauty_parlour/" aria-label="Instagram" className="hover:text-rose transition-colors"><Instagram size={20} /></a>
              <a href="#" aria-label="Facebook" className="hover:text-rose transition-colors"><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter" className="hover:text-rose transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-6 text-center text-xs tracking-widest uppercase text-muted-foreground">
          © {new Date().getFullYear()} Harika Beauty Saloon. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
