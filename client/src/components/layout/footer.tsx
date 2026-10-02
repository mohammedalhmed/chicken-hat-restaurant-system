
import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'قائمة الطعام', href: '/menu' },
    { name: 'العروض الخاصة', href: '/offers' },
    { name: 'الحجوزات', href: '/reservations' },
    { name: 'تتبع الطلب', href: '/track-order' },
  ];

  const customerService = [
    { name: 'الأسئلة الشائعة', href: '/faq' },
    { name: 'سياسة الإرجاع', href: '/return-policy' },
    { name: 'شروط الخدمة', href: '/terms' },
    { name: 'سياسة الخصوصية', href: '/privacy' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* خلفية تزيينية */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 bg-chicken-orange rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-chicken-gold rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* القسم الرئيسي */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* معلومات المطعم */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-reverse space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-chicken-orange to-chicken-gold rounded-full flex items-center justify-center shadow-xl">
                  <i className="fas fa-hat-chef text-white text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-chicken-orange to-chicken-gold bg-clip-text text-transparent">
                    تشكن هات
                  </h3>
                  <p className="text-gray-400 text-sm">الطعم الأصيل منذ ١٩٩٥</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                مطعم تشكن هات يقدم أشهى وجبات الدجاج المقلي بالطريقة الأصيلة. 
                نحن ملتزمون بتقديم أعلى جودة من المكونات الطازجة والخدمة المميزة.
              </p>

              {/* النشرة البريدية */}
              <div className="space-y-3">
                <h4 className="font-semibold text-chicken-gold">اشترك في نشرتنا البريدية</h4>
                <div className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder="أدخل بريدك الإلكتروني"
                    className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  />
                  <Button className="bg-chicken-orange hover:bg-chicken-orange/90 px-6">
                    اشتراك
                  </Button>
                </div>
              </div>
            </div>

            {/* روابط سريعة */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-chicken-gold">روابط سريعة</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-chicken-orange transition-colors duration-200 flex items-center group"
                    >
                      <i className="fas fa-angle-left ml-2 group-hover:translate-x-1 transition-transform"></i>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* خدمة العملاء */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-chicken-gold">خدمة العملاء</h4>
              <ul className="space-y-3">
                {customerService.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-chicken-orange transition-colors duration-200 flex items-center group"
                    >
                      <i className="fas fa-angle-left ml-2 group-hover:translate-x-1 transition-transform"></i>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="my-12 bg-gray-800" />

          {/* معلومات التواصل */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* العنوان */}
            <div className="flex items-start space-x-reverse space-x-3">
              <div className="w-10 h-10 bg-chicken-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-chicken-orange" />
              </div>
              <div>
                <h5 className="font-semibold text-chicken-gold mb-1">العنوان</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  شارع الملك فهد، حي الصحافة<br />
                  الرياض ١١٤٧٦، المملكة العربية السعودية
                </p>
              </div>
            </div>

            {/* الهاتف */}
            <div className="flex items-start space-x-reverse space-x-3">
              <div className="w-10 h-10 bg-chicken-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-chicken-gold" />
              </div>
              <div>
                <h5 className="font-semibold text-chicken-gold mb-1">هاتف الطلبات</h5>
                <p className="text-gray-300 text-sm">
                  ٩٢٠٠٠٤٤٤٤<br />
                  ٠١١-٤٥٦-٧٨٩٠
                </p>
              </div>
            </div>

            {/* البريد الإلكتروني */}
            <div className="flex items-start space-x-reverse space-x-3">
              <div className="w-10 h-10 bg-chicken-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-chicken-orange" />
              </div>
              <div>
                <h5 className="font-semibold text-chicken-gold mb-1">البريد الإلكتروني</h5>
                <p className="text-gray-300 text-sm">
                  info@chickenhat.sa<br />
                  orders@chickenhat.sa
                </p>
              </div>
            </div>

            {/* ساعات العمل */}
            <div className="flex items-start space-x-reverse space-x-3">
              <div className="w-10 h-10 bg-chicken-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-chicken-gold" />
              </div>
              <div>
                <h5 className="font-semibold text-chicken-gold mb-1">ساعات العمل</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  السبت - الخميس: ١٠:٠٠ ص - ١٢:٠٠ م<br />
                  الجمعة: ٢:٠٠ م - ١٢:٠٠ م
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* الجزء السفلي */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* حقوق النشر */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {currentYear} تشكن هات. جميع الحقوق محفوظة.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                تم التطوير بواسطة فريق تشكن هات التقني
              </p>
            </div>

            {/* وسائل التواصل الاجتماعي */}
            <div className="flex items-center space-x-reverse space-x-4">
              <span className="text-gray-400 text-sm ml-4">تابعونا:</span>
              
              <a 
                href="https://facebook.com/chickenhat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              
              <a 
                href="https://instagram.com/chickenhat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              
              <a 
                href="https://twitter.com/chickenhat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
