import { useEffect, useState } from "react";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => setVisible(false), 600);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <p className="font-script text-4xl text-rose tracking-wide animate-[fadeInUp_0.6s_ease-out_both]">
          Harika
        </p>
        <div className="h-[1px] w-24 bg-border overflow-hidden">
          <div className="h-full w-full bg-rose animate-[loadingBar_1.2s_ease-in-out_forwards]" />
        </div>
        <p
          className="eyebrow text-[10px] animate-[fadeIn_0.6s_ease-out_0.3s_both]"
        >
          Beauty Saloon
        </p>
      </div>
    </div>
  );
}
