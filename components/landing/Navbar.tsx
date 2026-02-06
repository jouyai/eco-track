"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X, ChevronDown, BarChart3, Building2, Globe, Users, FileText, Newspaper, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

const navItems = [
  {
    title: "Produk",
    items: [
      { title: "Fitur", href: "/features", icon: BarChart3, desc: "Lacak emisi dengan presisi" },
      { title: "Harga", href: "/pricing", icon: Globe, desc: "Paket untuk semua kebutuhan" },
      { title: "Enterprise", href: "/enterprise", icon: Building2, desc: "Solusi untuk korporasi" },
      { title: "Changelog", href: "/changelog", icon: FileText, desc: "Update terbaru sistem" },
    ]
  },
  {
    title: "Perusahaan",
    items: [
      { title: "Tentang", href: "/about", icon: Users, desc: "Misi dan tim kami" },
      { title: "Karir", href: "/careers", icon: ShieldCheck, desc: "Bergabung dengan kami" },
      { title: "Blog", href: "/blog", icon: Newspaper, desc: "Wawasan & berita" },
      { title: "Kontak", href: "/contact", icon: Phone, desc: "Hubungi tim support" },
    ]
  }
];

export function Navbar({ user: propUser }: { user?: any }) {
  const { data: session } = useSession();
  const user = propUser || session?.user;
  
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const pathname = usePathname();

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center gap-2 group z-50 relative" href="/">
            <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">EcoTrack</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((section) => (
              <div 
                key={section.title}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(section.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                  {section.title}
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", activeDropdown === section.title ? "rotate-180" : "")} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === section.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64"
                    >
                      <div className="bg-card border border-border rounded-xl shadow-lg p-2 overflow-hidden">
                        {section.items.map((item) => (
                          <Link 
                            key={item.href} 
                            href={item.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="mt-0.5 bg-primary/10 p-1.5 rounded-md text-primary">
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground">{item.title}</div>
                              <div className="text-xs text-muted-foreground leading-tight mt-0.5">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link href="/dashboard">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm font-medium">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="font-medium text-muted-foreground hover:text-foreground">
                    Masuk
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm font-medium">
                    Daftar Sekarang
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 p-2 -mr-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-16 bg-background z-40 md:hidden overflow-y-auto border-t border-border/40"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
              {navItems.map((section) => (
                <div key={section.title} className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {section.items.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                      >
                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-foreground">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="pt-6 mt-2 border-t border-border/50 flex flex-col gap-3">
                {user ? (
                  <Link href="/dashboard" className="w-full">
                    <Button size="lg" className="w-full justify-center bg-primary hover:bg-primary/90 text-primary-foreground">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="w-full">
                      <Button variant="outline" size="lg" className="w-full justify-center">
                        Masuk
                      </Button>
                    </Link>
                    <Link href="/signup" className="w-full">
                      <Button size="lg" className="w-full justify-center bg-primary hover:bg-primary/90 text-primary-foreground">
                        Daftar Sekarang
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
