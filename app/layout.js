import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const DESCRIPTION =
  "Promise Place Community Center provides community-based outpatient mental health services for children, adults, and families throughout Indiana, including therapy, telehealth, case management, school-based services, assessments, and more.";

export const metadata = {
  title: "Promise Place Community Center | Mental Health Services in Indiana",
  description: DESCRIPTION,
  keywords: [
    "mental health services Indiana",
    "outpatient mental health",
    "family therapy Indiana",
    "school-based mental health",
    "telehealth therapy",
    "community mental health center",
  ],
  openGraph: {
    title: "Promise Place Community Center | Mental Health Services in Indiana",
    description: DESCRIPTION,
    siteName: "Promise Place Community Center",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Promise Place Community Center",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0F766E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
