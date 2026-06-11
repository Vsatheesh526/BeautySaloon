import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919490269754?text=Hi%20Harika%20Beauty%20Saloon%2C%20I'd%20like%20to%20book%20an%20appointment%20Please%20share%20Menu"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
    >
      <MessageCircle size={26} />
    </a>
  );
}
