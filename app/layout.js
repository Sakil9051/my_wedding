import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Wedding Invitation - Sahil & Thania",
  description: "Wedding Invitation - Sahil & Thania",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
