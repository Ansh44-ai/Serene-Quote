"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Heart, Feather, Menu, Home, Sparkles, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useUser, useAuth } from '@/firebase';
import { getAuth } from 'firebase/auth';
import { ThemeToggle } from './theme-toggle';
import { Skeleton } from './ui/skeleton';

const navItems = [
  { href: '/', label: 'Daily Quote', icon: Home, auth: false },
  { href: '/generate', label: 'Generate', icon: Sparkles, auth: false },
  { href: '/library', label: 'Library', icon: BookOpen, auth: false },
  { href: '/favorites', label: 'Favorites', icon: Heart, auth: true },
];

const authNavItems = [
    { href: '/login', label: 'Login', icon: LogIn },
    { href: '/signup', label: 'Sign Up', icon: UserPlus },
];

export function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  
  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
  };

  const desktopNav = (
    <nav className="hidden items-center gap-1 text-sm md:flex">
      {navItems.map((item) => {
        if (item.auth && !user) return null;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors hover:text-primary px-3 py-2 rounded-md font-medium",
              pathname === item.href ? "bg-secondary text-primary" : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const authActions = (
    <div className="hidden items-center gap-2 md:flex">
      <ThemeToggle />
      {isUserLoading ? (
        <Skeleton className="h-9 w-24 rounded-md" />
      ) : user ? (
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      ) : (
        authNavItems.map((item) => (
          <Button key={item.href} asChild variant={pathname === item.href ? 'secondary' : 'ghost'} size="sm">
            <Link href={item.href}>
              {item.label}
            </Link>
          </Button>
        ))
      )}
    </div>
  );

  const mobileNav = (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader className='text-left'>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">Main menu for navigating the SereneQuote application.</SheetDescription>
            <div className="flex justify-between items-center pr-12 mt-4">
                <Link href="/" className="flex items-center space-x-2">
                    <Feather className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-lg sm:inline-block">
                    SereneQuote
                    </span>
                </Link>
                <ThemeToggle />
            </div>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-2">
          {navItems.map((item) => {
             if (item.auth && !user && !isUserLoading) return null;
             if (item.auth && isUserLoading) {
                return <Skeleton key={item.href} className="h-12 w-full rounded-lg" />;
             }
            return (
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
            )
          })}
          
          <div className="my-4 border-t border-border" />

          {isUserLoading ? (
             <Skeleton className="h-12 w-full rounded-lg" />
          ) : user ? (
            <SheetClose asChild>
              <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-4 rounded-lg p-3 text-lg font-medium text-muted-foreground hover:text-foreground justify-start">
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </SheetClose>
          ) : (
            authNavItems.map((item) => (
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
            ))
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );

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
          {desktopNav}
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          {authActions}
          <div className="md:hidden">
            {mobileNav}
          </div>
        </div>
      </div>
    </header>
  );
}
