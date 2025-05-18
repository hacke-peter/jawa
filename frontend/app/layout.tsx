import type { Metadata } from 'next';
import './globals.css';

import { Heart } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Just Another weather app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold">
              <Heart className="h-6 w-6 text-teal-500" />
              <span>HealthyTravel</span>
            </Link>
            <nav className="ml-auto flex gap-2">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  Home
                </Button>
              </Link>

              <Link href="/destinations">
                <Button variant="ghost" size="sm">
                  Destinations
                </Button>
              </Link>

              <Button variant="ghost" size="sm">
                Resources
              </Button>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
