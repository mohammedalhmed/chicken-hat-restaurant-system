import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { WebsiteSettings } from "@shared/schema";

export default function HeroSection() {
  const { data: settings } = useQuery<WebsiteSettings>({
    queryKey: ["/api/website-settings"],
  });

  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    menuSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToReservations = () => {
    const reservationsSection = document.getElementById("reservations");
    reservationsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative h-screen bg-gradient-to-br from-chicken-orange via-orange-500 to-chicken-gold overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 transform rotate-12">
          <i className="fas fa-drumstick-bite text-8xl text-white"></i>
        </div>
        <div className="absolute top-32 right-16 transform -rotate-12">
          <i className="fas fa-hamburger text-6xl text-white"></i>
        </div>
        <div className="absolute bottom-24 left-20 transform rotate-45">
          <i className="fas fa-pizza-slice text-7xl text-white"></i>
        </div>
        <div className="absolute bottom-16 right-12 transform -rotate-45">
          <i className="fas fa-utensils text-5xl text-white"></i>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-4 space-x-reverse bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <div className="bg-white text-chicken-orange p-4 rounded-xl shadow-lg">
                <i className="fas fa-drumstick-bite text-4xl"></i>
              </div>
              <h1 className="font-amiri font-bold text-6xl md:text-8xl">
                {settings?.logoText || 'تشكن هات'}
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-relaxed">
            {settings?.heroTitle || 'وجهتكم الأولى لأشهى أنواع الدجاج المقلي والبروستد'}
          </h2>

          <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed whitespace-pre-line">
            {settings?.heroSubtitle || 'نقدم لكم أجود أنواع الدجاج المقرمش بأفضل المكونات والنكهات الأصيلة\nمع خدمة توصيل سريعة وجودة لا تُضاهى'}
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 md:space-x-reverse">
            <Button
              onClick={scrollToMenu}
              className="bg-white text-chicken-orange hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300 w-full md:w-auto"
            >
              <i className="fas fa-utensils ml-2"></i>
              تصفح قائمة الطعام
            </Button>

            <Button
              onClick={scrollToReservations}
              className="bg-chicken-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300 w-full md:w-auto"
            >
              <i className="fas fa-calendar-check ml-2"></i>
              احجز طاولتك
            </Button>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
              <i className="fas fa-shipping-fast text-4xl mb-4"></i>
              <h3 className="font-bold text-xl mb-2">توصيل سريع</h3>
              <p className="opacity-90">{settings?.deliveryTime ? `خدمة توصيل في ${settings.deliveryTime}` : 'خدمة توصيل في أقل من 30 دقيقة'}</p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
              <i className="fas fa-award text-4xl mb-4"></i>
              <h3 className="font-bold text-xl mb-2">جودة عالية</h3>
              <p className="opacity-90">أفضل المكونات والنكهات الأصيلة</p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
              <i className="fas fa-clock text-4xl mb-4"></i>
              <h3 className="font-bold text-xl mb-2">خدمة 24/7</h3>
              <p className="opacity-90">نفتح طوال أيام الأسبوع</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <i className="fas fa-chevron-down text-2xl"></i>
      </div>
    </section>
  );
}