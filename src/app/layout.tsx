import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import TikTokBootstrap from "@/components/analytics/TikTokBootstrap";
import { TIKTOK_PIXEL_ID } from "@/lib/tiktok";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GutGuard BioScan — Find Out Your Inflammatory Score",
  description:
    "Your inflammatory load is measurable. It has a direction. GutGuard BioScan gives it a number — reviewed by a licensed Philippine physician within 48 hours.",
  openGraph: {
    title: "GutGuard BioScan — Find Out Your Inflammatory Score",
    description:
      "Upload your existing blood panel. A GutGuard independent licensed physician reviews 8 inflammatory markers and calculates your GLIS score within 48 hours.",
    type: "website",
    locale: "en_PH",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0C1017",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        {TIKTOK_PIXEL_ID ? (
          <Script id="tiktok-pixel" strategy="afterInteractive">
            {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject = t;
                var ttq = w[t] = w[t] || [];
                ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
                ttq.setAndDefer = function (t, e) {
                  t[e] = function () {
                    t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                  };
                };
                for (var i = 0; i < ttq.methods.length; i += 1) {
                  ttq.setAndDefer(ttq, ttq.methods[i]);
                }
                ttq.instance = function (t) {
                  for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n += 1) {
                    ttq.setAndDefer(e, ttq.methods[n]);
                  }
                  return e;
                };
                ttq.load = function (e, n) {
                  var r = "https://analytics.tiktok.com/i18n/pixel/events.js";
                  ttq._i = ttq._i || {};
                  ttq._i[e] = [];
                  ttq._i[e]._u = r;
                  ttq._t = ttq._t || {};
                  ttq._t[e] = +new Date();
                  ttq._o = ttq._o || {};
                  ttq._o[e] = n || {};
                  n = d.createElement("script");
                  n.type = "text/javascript";
                  n.async = true;
                  n.src = r + "?sdkid=" + e + "&lib=" + t;
                  e = d.getElementsByTagName("script")[0];
                  e.parentNode.insertBefore(n, e);
                };
                ttq.load("${TIKTOK_PIXEL_ID}");
                ttq.page();
              }(window, document, "ttq");
            `}
          </Script>
        ) : null}
        <TikTokBootstrap />
        {children}
      </body>
    </html>
  );
}
