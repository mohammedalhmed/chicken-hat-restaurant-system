import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import type { WebsiteSettings } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function AboutSection() {
  const { data: settings } = useQuery<WebsiteSettings>({
    queryKey: ["/api/website-settings"],
  });

  const stats = [
    { number: "15+", label: "سنوات خبرة", icon: "fas fa-calendar" },
    { number: "100K+", label: "عميل سعيد", icon: "fas fa-users" },
    { number: "500K+", label: "وجبة مقدمة", icon: "fas fa-utensils" },
    { number: "4.9", label: "تقييم العملاء", icon: "fas fa-star" }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 text-chicken-orange text-6xl">
          <i className="fas fa-drumstick-bite"></i>
        </div>
        <div className="absolute bottom-20 left-20 text-chicken-orange text-4xl">
          <i className="fas fa-pepper-hot"></i>
        </div>
        <div className="absolute top-1/2 left-1/4 text-chicken-orange text-5xl">
          <i className="fas fa-fire"></i>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-amiri font-bold text-4xl md:text-5xl text-chicken-black mb-6">
            {settings?.aboutTitle || 'عن تشكن هات'}
          </h2>
          <div className="w-24 h-1 bg-chicken-orange mx-auto mb-6"></div>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed font-cairo">
            {settings?.aboutDescription || 'رحلة طعم مميزة بدأت من شغفنا بتقديم أجود أنواع الدجاج المقرمش'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-r-4 border-chicken-orange">
                <h3 className="font-cairo font-bold text-xl text-chicken-black mb-3 flex items-center">
                  <i className="fas fa-heart text-chicken-orange ml-3"></i>
                  قصتنا
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed font-cairo">
                  تشكن هات هو أكثر من مجرد مطعم، إنه تجربة طعام استثنائية. منذ تأسيسنا عام 2008، 
                  نحن ملتزمون بتقديم أشهى وألذ الوجبات من الدجاج المقرمش والبروستد المميز.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-r-4 border-chicken-orange">
                <h3 className="font-cairo font-bold text-xl text-chicken-black mb-3 flex items-center">
                  <i className="fas fa-gem text-chicken-orange ml-3"></i>
                  ما يميزنا
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed font-cairo">
                  نستخدم أفضل المكونات الطازجة والتوابل المختارة بعناية، مع خلطة سرية خاصة 
                  تجعل طعم دجاجنا لا يُنسى. فريقنا من الطهاة المحترفين يعمل بشغف لضمان الجودة.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-r-4 border-chicken-orange">
                <h3 className="font-cairo font-bold text-xl text-chicken-black mb-3 flex items-center">
                  <i className="fas fa-target text-chicken-orange ml-3"></i>
                  رسالتنا
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed font-cairo">
                  نؤمن بأن الطعام الجيد يجمع الناس ويخلق ذكريات جميلة. هدفنا هو إسعاد عملائنا 
                  وتقديم تجربة طعام مميزة في كل زيارة.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/about">
                <Button 
                  size="lg" 
                  className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo px-8 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <i className="fas fa-arrow-left ml-2"></i>
                  اقرأ قصتنا كاملة
                </Button>
              </Link>
            </div>
          </div>

          {/* Images */}
          <div className="order-1 lg:order-2 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1513185158878-8d064c2ee2b1?ixlib=rb-4.0.3" 
                  alt="دجاج مقرمش" 
                  className="w-full h-48 object-cover rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                />
                <img 
                  src="https://images.unsplash.com/photo-1606755962773-d324e9f9d49a?ixlib=rb-4.0.3" 
                  alt="مطبخ المطعم" 
                  className="w-full h-32 object-cover rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                />
              </div>
              <div className="mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3" 
                  alt="فريق العمل" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* Floating Review Card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-2xl max-w-xs border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400 ml-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-sm"></i>
                  ))}
                </div>
                <span className="font-bold text-chicken-black">4.9/5</span>
              </div>
              <p className="text-sm text-gray-600 font-cairo mb-2">
                "أفضل مطعم دجاج جربته على الإطلاق! الطعم رائع والخدمة ممتازة"
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-chicken-orange rounded-full flex items-center justify-center ml-2">
                  <span className="text-white text-xs font-bold">أح</span>
                </div>
                <span className="text-xs text-gray-500 font-cairo">أحمد محمد</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-chicken-orange to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${stat.icon} text-white text-2xl`}></i>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-chicken-black mb-2 font-cairo">
                {stat.number}
              </div>
              <div className="text-gray-600 font-cairo text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}