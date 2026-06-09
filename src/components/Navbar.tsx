import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-tight text-ink">
          Harika <span className="font-script text-2xl text-rose">Beauty</span> Saloon
        </Link>
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-sm tracking-wider uppercase text-foreground/70 hover:text-rose transition-colors"
                activeProps={{ className: "text-rose font-medium" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/booking" className="hidden md:inline-flex btn-primary !py-2 !px-5 !text-xs">
          Book Now
        </Link>
        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <ul className="flex flex-col p-6 gap-4">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block text-sm tracking-wider uppercase text-foreground/80"
                  activeProps={{ className: "text-rose font-medium" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/booking" onClick={() => setOpen(false)} className="btn-primary w-full mt-2">
                Book Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
