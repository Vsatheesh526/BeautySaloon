import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import { PageLoader } from "../components/PageLoader";
import { ScrollProgress } from "../components/ScrollProgress";
import { BackToTop } from "../components/BackToTop";
import { PromotionalPopup } from "../components/PromotionalPopup";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-ink">404</h1>
        <p className="mt-4 text-muted-foreground">This page took a beauty break.</p>
        <Link to="/" className="btn-primary mt-6">Go Home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-ink">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="btn-primary mt-6"
        >Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
    
      { charSet: "utf-8" },
      { name: "google-site-verification", content: "XnIPD4-dVbKrFITvXXbqURHoJ1B8k6B6dB0iqdNiV-Q" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Harika Beauty Parlour in penumur,chittoor | Hair, Makeup, Bridal Services, Beauty Parlour " },
      { name: "description", content: "A modern beauty saloon offering hair styling, bridal makeup, facials, spa & more. Book your appointment today." },
      { name: "author", content: "Harika Beauty Saloon" },
      { property: "og:title", content: "Harika Beauty Saloon" },
      { property: "og:description", content: "Your destination for beauty and relaxation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    

    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&family=Dancing+Script:wght@500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PageLoader />
      <ScrollProgress />
      <PromotionalPopup />
      <div className={`transition-opacity duration-700 ease-out ${ready ? "opacity-100" : "opacity-0"}`}>
        <Navbar />
        <main className="min-h-screen pt-20">
          <Outlet />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
      </div>
    </QueryClientProvider>
  );
}
