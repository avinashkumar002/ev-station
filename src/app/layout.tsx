import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Parkly - Find Smart, Secure Parking | Verified Spaces & Hosting",
    template: "%s | Parkly",
  },
  description: "Find verified parking spaces or list your spot to earn. Smart, secure parking with real-time availability and instant booking.",
  keywords: [
    "parking app",
    "find parking near me",
    "private parking",
    "parking spaces",
    "driveway rental",
    "secure parking",
    "smart parking",
    "verified parking",
    "parking platform",
    "event parking",
    "host parking space",
    "earn from parking",
  ],
  authors: [{ name: "Parkly Team" }],
  creator: "Parkly",
  metadataBase: new URL("https://parklyco.com"),
  alternates: {
    canonical: "https://parklyco.com/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Parkly",
    title: "Parkly - Find Smart, Secure Parking",
    description: "Connect with verified parking spaces. Stop circling. Save time and money.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Parkly - Smart Parking Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@parkly",
    title: "Parkly - Find Smart, Secure Parking",
    description: "Connect with verified parking spaces nearby.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 500,
              padding: '16px',
            },
            success: {
              style: {
                background: '#2C7FFF',
                color: '#FFFFFF',
              },
              iconTheme: {
                primary: '#FFFFFF',
                secondary: '#2C7FFF',
              },
            },
            error: {
              style: {
                background: '#ff4b4b',
                color: '#FFFFFF',
              },
              iconTheme: {
                primary: '#FFFFFF',
                secondary: '#ff4b4b',
              },
            },
          }}
        />
        <Header />
        <div className="h-[72px] lg:h-22 w-full"></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}