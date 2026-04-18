import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NexFollio — AI-Powered Portfolio Builder",
  description:
    "Upload your resume and let AI craft a stunning developer portfolio in seconds. NexFollio extracts your skills, projects, and experience to build a professional web presence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* navbar yha likhenge jisse har page pe navbar  aaye */}

        <Navbar />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "rgba(14, 14, 36, 0.9)",
              backdropFilter: "blur(16px)",
              color: "#f1f5f9",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              fontSize: "0.875rem",
            },
          }}
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
