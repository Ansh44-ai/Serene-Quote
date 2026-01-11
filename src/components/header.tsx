"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Heart, Feather, Menu, Home, Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Daily Quote', icon: Home },
  { href: '/generate', label: 'Generate', icon: Sparkles },
  { href: '/library', label: 'Library', icon: BookOpen },
  { href: '/favorites', label: 'Favorites', icon: Heart },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Feather className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg sm:inline-block">
              SereneQuote
            </span>
          </Link>
          <nav className="hidden items-center gap-2 text-sm md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-primary px-4 py-2 rounded-md font-medium",
                  pathname === item.href ? "bg-secondary text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="mt-8 flex flex-col gap-2">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-4 rounded-lg p-3 text-lg font-medium transition-colors hover:bg-accent/80",
                        pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.icon && <item.icon className="h-5 w-5" />}
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
