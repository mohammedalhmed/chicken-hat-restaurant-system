import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart';
import { Menu, X, ShoppingCart, User, Bell, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { items } = useCart();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'الرئيسية', href: '/', icon: 'fas fa-home' },
    { name: 'قائمة الطعام', href: '/menu', icon: 'fas fa-utensils' },
    { name: 'العروض', href: '/offers', icon: 'fas fa-tags' },
    { name: 'الحجوزات', href: '/reservations', icon: 'fas fa-calendar-alt' },
    { name: 'عن المطعم', href: '/about', icon: 'fas fa-info-circle' },
    { name: 'تواصل معنا', href: '/contact', icon: 'fas fa-phone' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && location === '/') return true;
    if (href !== '/' && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className={cn(
      "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
      isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-chicken-orange/10"
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">

          {/* الشعار */}
          <Link href="/" className="flex items-center space-x-reverse space-x-3 hover:scale-105 transition-transform">
            <div className="relative">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-chicken-orange to-chicken-gold rounded-full flex items-center justify-center shadow-lg">
                <i className="fas fa-hat-chef text-white text-xl lg:text-2xl"></i>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-chicken-gold rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-chicken-orange to-chicken-gold bg-clip-text text-transparent">
                تشكن هات
              </h1>
              <p className="text-xs text-muted-foreground hidden lg:block">
                الطعم الأصيل منذ ١٩٩٥
              </p>
            </div>
          </Link>

          {/* قائمة التنقل للشاشات الكبيرة */}
          <div className="hidden lg:flex items-center space-x-reverse space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative group flex items-center space-x-reverse space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "text-chicken-orange bg-chicken-orange/5"
                    : "text-gray-700 hover:text-chicken-orange hover:bg-chicken-orange/5"
                )}
              >
                <i className={`${item.icon} text-sm`}></i>
                <span>{item.name}</span>
                {isActive(item.href) && (
                  <div className="absolute bottom-0 right-0 left-0 h-0.5 bg-gradient-to-r from-chicken-orange to-chicken-gold rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* أيقونات الإجراءات */}
          <div className="flex items-center space-x-reverse space-x-4">

            {/* المفضلة */}
            <Link href="/favorites" className="relative group">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-chicken-orange">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            {/* الإشعارات */}
            <Link href="/notifications" className="relative group">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-chicken-orange">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-chicken-orange text-white text-xs">
                  3
                </Badge>
              </Button>
            </Link>

            {/* سلة المشتريات */}
            <Link href="/cart" className="relative group">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-chicken-orange">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-chicken-orange text-white text-xs animate-pulse">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* تسجيل الدخول */}
            <div className="hidden sm:block">
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-chicken-orange text-chicken-orange hover:bg-chicken-orange hover:text-white transition-all duration-200"
                >
                  <User className="h-4 w-4 ml-2" />
                  دخول
                </Button>
              </Link>
            </div>

            {/* زر القائمة للهاتف */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* القائمة المنسدلة للهاتف */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-reverse space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                    isActive(item.href)
                      ? "text-chicken-orange bg-chicken-orange/10 border-r-4 border-chicken-orange"
                      : "text-gray-700 hover:text-chicken-orange hover:bg-gray-50"
                  )}
                >
                  <i className={`${item.icon} text-lg`}></i>
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* زر تسجيل الدخول للهاتف */}
              <div className="pt-4 border-t border-gray-100">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-chicken-orange hover:bg-chicken-orange/90">
                    <User className="h-4 w-4 ml-2" />
                    تسجيل الدخول
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}