import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = ["/", "/services", "/about", "/gallery", "/contact", "/booking"];
        const BASE_URL = "https://beauty-saloon-dusky.vercel.app/";

        const urls = paths.map((p) => {
          const loc = new URL(p, BASE_URL).href;
          const priority = p === "/" ? "1.0" : "0.8";
          return `
  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
        });

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});