"use client"

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Menu, X, Home, User, LogOut, ChevronDown } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from './AuthProvider';
import { logout } from '@/lib/auth';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthContext();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/chat', label: 'Chat IA', icon: MessageCircle },
    { path: '/profile', label: 'Profil', icon: User },
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-serenity-lavender/30 glass-effect">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => router.push('/')}
          >
            <Image src="/logo-black.png" alt="Logo" width={36} height={36} className="w-9 h-9 object-contain rounded-xl group-hover:scale-105 transition-transform duration-200" />
          </div>

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

          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-serenity-navy hover:bg-serenity-lavender/50"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-serenity-blue to-serenity-accent rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-lato font-medium">{user?.fullname}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-serenity-lavender/30 py-2 z-50">
                    <div className="px-4 py-2 border-b border-serenity-lavender/30">
                      <p className="text-sm font-medium text-serenity-navy">{user?.fullname}</p>
                      <p className="text-xs text-serenity-navy/60">{user?.email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        router.push('/profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full justify-start text-serenity-navy hover:bg-serenity-lavender/50"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Mon Profil
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Se déconnecter
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/auth')}
                className="border-serenity-blue text-serenity-blue hover:bg-serenity-blue hover:text-white transition-all duration-200"
              >
                <Image src="/mini-logo-black.png" alt="Connexion" width={20} height={20} className="inline-block mr-2 align-middle" />
                Connexion
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

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
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 bg-serenity-lavender/20 rounded-lg">
                      <p className="text-sm font-medium text-serenity-navy">{user?.fullname}</p>
                      <p className="text-xs text-serenity-navy/60">{user?.email}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Se déconnecter
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      router.push('/auth');
                      setIsMenuOpen(false);
                    }}
                    className="w-full border-serenity-blue text-serenity-blue hover:bg-serenity-blue hover:text-white"
                  >
                    <Image src="/mini-logo-black.png" alt="Connexion" width={20} height={20} className="inline-block mr-2 align-middle" />
                    Connexion
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 