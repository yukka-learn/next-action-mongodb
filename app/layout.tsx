import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blue Arhive",
  description: "A simple todo app built with Next.js and MongoDB.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="flex min-h-screen  flex-col items-center justify-between p-24">
          <header className="self-start">
            <nav className="text-4xl font-bold my-4">
              <Link href="/">Home</Link>
              <Link href="/login">Login</Link>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="py-4">
            <div className="flex flex-col items-center justify-center text-sm italic text-gray-600">
              <a href="">Copright &copy; {new Date().getFullYear()} arufars</a>
            </div>
          </footer>
        </section>
      </body>
    </html>
  );
}
