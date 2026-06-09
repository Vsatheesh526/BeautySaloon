import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, Heart } from "lucide-react";

interface PromoService {
  name: string;
  originalPrice: string;
  price: string;
  discount: string;
  emoji: string;
}

const TRENDING_SERVICES: PromoService[] = [
  { name: "Wine Facial",  originalPrice: "₹750",  price: "₹600",   discount: "20% OFF", emoji: "🌿" },
  { name: "Gold Bleach",  originalPrice: "₹530",  price: "₹400",   discount: "25% OFF", emoji: "✨" },
  { name: "HD Makeup",    originalPrice: "₹5,900", price: "₹5,000", discount: "15% OFF", emoji: "💋" },
];

const INITIAL_SECONDS = 2 * 3600 + 45 * 60 + 30;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function PromotionalPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [totalSec, setTotalSec] = useState(INITIAL_SECONDS);

  // Auto-open after 3 s
  useEffect(() => {
    const t = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Countdown
  useEffect(() => {
    if (!isOpen) return;
    const id = setInterval(() => {
      setTotalSec((s) => {
        if (s <= 0) { setIsOpen(false); return INITIAL_SECONDS; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isOpen]);

  const hours   = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  function handleClose() {
    setIsOpen(false);
    setDismissed(true);
  }

  function handleBookPromoService() {
    if (selectedIdx === null) return;
    const svc = TRENDING_SERVICES[selectedIdx];
    const message = `Hello Harika Beauty Saloon,\n\nI would like to book this promotional offer:\n\nService: ${svc.name}\nSpecial Price: ${svc.price}\nDiscount: ${svc.discount}\n\nPlease confirm the appointment.\n\nThank you!`;
    const whatsappUrl = `https://wa.me/919490269754?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    handleClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative bg-background border border-border rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Banner ── */}
            <div className="bg-rose px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-center gap-2 relative">
              <Sparkles size={14} className="text-white/80" />
              <p className="font-display text-xs sm:text-sm text-white tracking-wide">
                Trending This Week
              </p>
              <span className="text-[9px] sm:text-[10px] font-medium bg-white/20 text-white px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-widest">
                Limited
              </span>
            </div>

            {/* ── Close ── */}
            <button
              onClick={handleClose}
              aria-label="Close"
               className="absolute top-2 sm:top-2.5 right-2 sm:right-3 w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10 cursor-pointer"
            >
              <X size={13} className="sm:w-3.5 sm:h-3.5" />
            </button>

            {/* ── Body ── */}
            {dismissed ? (
              <div className="flex flex-col items-center gap-2 sm:gap-3 py-6 sm:py-10 px-4 sm:px-6 text-center">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-rose/10 flex items-center justify-center">
                  <Heart size={20} className="text-rose" />
                </div>
                <p className="font-display text-sm sm:text-base text-ink">See you soon!</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Visit us to claim your offer.</p>
                <button
                  onClick={() => { setDismissed(false); setIsOpen(true); }}
                  className="mt-1 text-xs sm:text-sm border border-border rounded-lg px-4 sm:px-5 py-1.5 sm:py-2 hover:bg-blush/20 transition-colors"
                >
                  View offers again
                </button>
              </div>
            ) : (
              <div className="p-3 sm:p-5 space-y-2 sm:space-y-3">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-muted-foreground">
                  Select a service to book
                </p>

                {/* ── Service cards ── */}
                <div className="space-y-1.5 sm:space-y-2">
                  {TRENDING_SERVICES.map((svc, i) => (
                    <motion.button
                      key={svc.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => setSelectedIdx(i === selectedIdx ? null : i)}
                      className={[
                        "w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border text-left transition-all duration-150",
                        selectedIdx === i
                          ? "border-rose bg-background shadow-sm"
                          : "border-border bg-blush/10 hover:border-rose/40 hover:bg-background",
                      ].join(" ")}
                    >
                      <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-rose/10 flex items-center justify-center text-sm sm:text-base shrink-0">
                        {svc.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-xs text-ink leading-tight">
                          {svc.name}
                        </p>
                        <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                          <s className="text-border mr-1">{svc.originalPrice}</s>
                          {svc.price}
                        </p>
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-medium bg-rose/10 text-rose px-1.5 sm:px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                        {svc.discount}
                      </span>
                      <div
                        className={[
                          "w-4 sm:w-5 h-4 sm:h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-150",
                          selectedIdx === i
                            ? "bg-rose scale-100"
                            : "bg-border/40 scale-90",
                        ].join(" ")}
                      >
                        <Check size={10} className="text-white" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* ── Timer ── */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-blush/20 border border-rose/20 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2"
                >
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                    Offer expires
                  </p>
                  <div className="flex items-end gap-0.5 sm:gap-1">
                    {[
                      { val: hours,   lbl: "hrs" },
                      { val: minutes, lbl: "min" },
                      { val: seconds, lbl: "sec" },
                    ].map((unit, i) => (
                      <div key={unit.lbl} className="flex items-end gap-0.5 sm:gap-1">
                        {i > 0 && (
                          <span className="text-rose font-display text-sm sm:text-base mb-1 sm:mb-2.5">:</span>
                        )}
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="bg-rose text-white font-display text-xs sm:text-sm w-7 sm:w-9 h-6 sm:h-7 rounded-md flex items-center justify-center">
                            {pad(unit.val)}
                          </div>
                          <span className="text-[8px] sm:text-[9px] uppercase tracking-wide text-muted-foreground">
                            {unit.lbl}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* ── CTA ── */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {selectedIdx !== null ? (
                    <button
                      onClick={handleBookPromoService}
                      className="block w-full bg-rose hover:bg-rose/90 active:scale-[0.98] text-white font-display py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-center text-xs sm:text-sm transition-all duration-200 cursor-pointer"
                    >
                      Book {TRENDING_SERVICES[selectedIdx].name} →
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-blush/30 text-muted-foreground font-display py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-center text-xs sm:text-sm cursor-not-allowed"
                    >
                      Select a service above
                    </button>
                  )}
                </motion.div>

                <p className="text-[10px] sm:text-[11px] text-center text-muted-foreground">
                  Today only &nbsp;·&nbsp;
                <button
  onClick={handleClose}
  className="text-rose hover:underline cursor-pointer"
>
  No thanks
</button>
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}