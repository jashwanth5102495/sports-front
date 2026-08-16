import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Camera, MessageCircle, PlayCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'HOME', href: '/#home' },
  { name: 'ABOUT', href: '/#about' },
  { name: 'CAREER', href: '/#career' },
  { name: 'STATS', href: '/#statistics' },
  { name: 'GALLERY', href: '/gallery' },
  { name: 'THE RIZE', href: 'https://therizelacrosse.com' },
  { name: 'CONTACT', href: '/#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll spy
  useEffect(() => {
    if (location.pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // 30% of the section must be visible to become active
    );

    const sectionIds = ['home', 'about', 'career', 'statistics', 'contact'];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const isLinkActive = (href: string) => {
    // Exact path matches (Gallery, Videos)
    if (href.startsWith('/') && !href.includes('#')) {
      return location.pathname === href;
    }
    // Scroll spy matches on home page
    if (location.pathname === '/') {
      return href === `/#${activeSection}`;
    }
    return false;
  };

  return (
    <>
      <nav className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-300 ease-in-out px-6 md:px-12",
        isScrolled ? "bg-black/95 backdrop-blur-md py-4 shadow-xl border-b border-white/5" : "bg-transparent py-6 md:py-8"
      )}>
        <div className="max-w-[1920px] mx-auto flex justify-between items-center">
          
          {/* Logo / Left Side (Name removed as requested) */}
          <Link to="/#home" className="flex items-center gap-1.5 z-50 group hover:opacity-90 transition-opacity">
            {/* Name text spans removed */}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-8 xl:gap-10 items-center absolute left-1/2 -translate-x-1/2 mt-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              const isExternal = link.href.startsWith('http');
              const linkClasses = cn(
                "group relative text-[13px] font-nav font-semibold uppercase tracking-[0.05em] transition-colors py-2",
                active ? "text-white" : "text-white/90 hover:text-white"
              );
              
              if (isExternal) {
                return (
                  <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                    {link.name}
                    <span className="absolute -bottom-1.5 left-0 h-[1.5px] bg-accent transition-all duration-300 ease-out w-0 group-hover:w-[28px]"></span>
                  </a>
                );
              }

              return (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className={linkClasses}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1.5 left-0 h-[1.5px] bg-accent transition-all duration-300 ease-out",
                    active ? "w-[28px]" : "w-0 group-hover:w-[28px]"
                  )}></span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Nav (Socials + CTA) */}
          <div className="hidden lg:flex items-center gap-7 z-50">
            <div className="flex items-center gap-5 text-white/90">
              <Link to="/gallery" className="hover:text-accent transition-colors"><Camera size={16} strokeWidth={2.5} /></Link>
              <a href="mailto:erincoykendalllax@gmail.com" className="hover:text-accent transition-colors"><MessageCircle size={16} strokeWidth={2.5} /></a>
              <Link to="/videos" className="hover:text-accent transition-colors"><PlayCircle size={17} strokeWidth={2.5} /></Link>
            </div>
            
            <Link 
              to="/#contact" 
              className={cn(
                "group flex items-center gap-2 px-[18px] py-[12px] border rounded-[3px] text-[13px] font-nav font-semibold uppercase tracking-[0.04em] transition-all duration-300",
                "border-white/30 text-white hover:bg-white hover:text-black"
              )}
            >
              GET IN TOUCH <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black flex flex-col justify-center items-center gap-8"
          >
            {navLinks.map((link, i) => {
              const isExternal = link.href.startsWith('http');
              const linkClasses = "text-2xl font-nav font-bold uppercase tracking-[0.1em] text-white hover:text-accent transition-colors";
              
              return (
                <motion.div key={link.name} custom={i}>
                  {isExternal ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className={linkClasses}>
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.href} onClick={() => setIsMobileMenuOpen(false)} className={linkClasses}>
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              );
            })}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-6 mt-4 text-white/80"
            >
              <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent"><Camera size={24} /></Link>
              <a href="mailto:erincoykendalllax@gmail.com" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent"><MessageCircle size={24} /></a>
              <Link to="/videos" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent"><PlayCircle size={26} /></Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
