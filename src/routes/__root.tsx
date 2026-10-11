import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { INDEX_HASH, INDEX_STATEMENT } from "@/dccp/index/statement";
import appCss from "../styles.css?url";

const APP_NAME = "DCCP World — the Unity playground";
const APP_ORIGIN = "https://dualiscapax.ai/";

export const Route = createRootRoute({
  head: ({ matches }) => {
    const identity = matches.some(match => match.pathname === '/id')
    if (identity) {
      return {
        meta: [
          { charSet: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
          { name: 'description', content: 'The same words for a person and for a robot.' },
          { name: 'robots', content: 'index, follow' },
          { name: 'theme-color', content: '#03050b' },
        ],
        links: [
          { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>' },
          { rel: 'stylesheet', href: appCss },
          { rel: 'preload', href: '/fonts/Sora-VF.subset.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
          { rel: 'preload', href: '/fonts/Figtree-VF.subset.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
        ],
      }
    }
    return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      { name: "description", content: INDEX_STATEMENT },
      { name: "robots", content: "index, follow" },
      { name: "dccp-statement-sha256", content: INDEX_HASH },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: INDEX_STATEMENT },
      { property: "og:url", content: APP_ORIGIN },
      { name: "theme-color", content: "#03050b" },
    ],
    links: [
      { rel: "canonical", href: APP_ORIGIN },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preload", href: "/fonts/Sora-VF.subset.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/Figtree-VF.subset.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: APP_NAME,
          description: INDEX_STATEMENT,
          identifier: `sha256:${INDEX_HASH}`,
        }),
      },
    ],
    }
  },
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
