import "./globals.css";

export const metadata = {
  title: "Promise Place Community Center",
  description: "Promise Place Community Center — website coming soon.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
