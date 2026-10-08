import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.webworxstudio.au"),
  title: "Webworx Studio — Websites, Web Apps, Mobile Apps & Design",
  description:
    "Melbourne digital studio building websites, custom web apps and mobile apps — plus graphic design, social media management and specialist thermal optics repairs.",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
  openGraph: {
    title: "Webworx Studio — Websites, Web Apps, Mobile Apps & Design",
    description:
      "Websites · Custom Web Apps · Mobile Apps · Graphic Design · Social Media · Device Repairs. A Melbourne studio that designs, builds and ships.",
    url: "https://www.webworxstudio.au/",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Webworx Studio",
  url: "https://www.webworxstudio.au/",
  logo: "https://www.webworxstudio.au/assets/apple-touch-icon.png",
  image: "https://www.webworxstudio.au/assets/og-image.png",
  description:
    "Digital studio building websites, custom web apps and mobile apps, with graphic design, social media management and specialist thermal optics repairs.",
  email: "hello@moali.co.za",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  areaServed: ["Australia", "South Africa"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${archivo.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col overflow-x-clip">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TYN55PQ4T0"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TYN55PQ4T0');`}
        </Script>
      </body>
    </html>
  );
}
