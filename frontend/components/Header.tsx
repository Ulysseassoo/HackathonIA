"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, User, CreditCard, Menu, X, Home } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/chat', label: 'Chat IA', icon: MessageCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-serenity-lavender/30 glass-effect">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => router.push('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-serenity-blue to-serenity-accent rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-oswald font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-oswald font-semibold text-serenity-navy group-hover:text-serenity-blue transition-colors">
              Sérénité
            </span>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => router.push(item.path)}
                className={
                  `flex items-center space-x-2 rounded-lg transition-all duration-200 ` +
                  (isActive(item.path)
                    ? 'bg-serenity-blue text-white shadow-sm'
                    : 'text-serenity-navy hover:bg-serenity-lavender/50 hover:text-serenity-blue')
                }
              >
                <item.icon className="w-4 h-4" />
                <span className="font-lato">{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* Auth Button Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/auth')}
              className="border-serenity-blue text-serenity-blue hover:bg-serenity-blue hover:text-white transition-all duration-200"
            >
              Connexion
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-serenity-lavender/30 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    router.push(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={
                    `flex items-center space-x-2 justify-start rounded-lg ` +
                    (isActive(item.path)
                      ? 'bg-serenity-blue text-white'
                      : 'text-serenity-navy hover:bg-serenity-lavender/50')
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-lato">{item.label}</span>
                </Button>
              ))}
              <div className="pt-2 border-t border-serenity-lavender/30">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    router.push('/auth');
                    setIsMenuOpen(false);
                  }}
                  className="w-full border-serenity-blue text-serenity-blue hover:bg-serenity-blue hover:text-white"
                >
                  Connexion
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 