
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Animated Chicken Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-48 h-48 mx-auto mb-8 relative">
              {/* Chicken Body */}
              <div className="absolute inset-0 bg-gradient-to-br from-chicken-orange to-orange-600 rounded-full animate-bounce">
                <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-white rounded-full">
                  <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-white rounded-full">
                  <div className="absolute top-1 right-1 w-4 h-4 bg-black rounded-full"></div>
                </div>
                {/* Beak */}
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-yellow-400"></div>
              </div>
              {/* Wings */}
              <div className="absolute top-1/3 -left-4 w-12 h-8 bg-orange-500 rounded-full transform rotate-12 animate-pulse"></div>
              <div className="absolute top-1/3 -right-4 w-12 h-8 bg-orange-500 rounded-full transform -rotate-12 animate-pulse"></div>
            </div>
            
            {/* 404 Text */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <span className="text-8xl font-bold text-chicken-orange opacity-20 animate-pulse">
                404
              </span>
            </div>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12">
            <h1 className="font-amiri text-5xl md:text-6xl font-bold text-chicken-black mb-6">
              عذراً! الصفحة غير موجودة
            </h1>
            
            <p className="font-cairo text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              يبدو أن الصفحة التي تبحث عنها قد طارت مثل دجاجتنا المقرمشة! 
              ربما تم حذفها أو تغيير رابطها، لكن لا تقلق - سنساعدك في العثور على ما تبحث عنه.
            </p>

            {/* Search Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors duration-300">
                <div className="w-16 h-16 bg-chicken-orange text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-utensils text-2xl"></i>
                </div>
                <h3 className="font-cairo font-bold text-lg text-chicken-black mb-2">
                  تصفح القائمة
                </h3>
                <p className="font-cairo text-gray-600 text-sm mb-4">
                  اكتشف أشهى الوجبات في قائمة طعامنا المتنوعة
                </p>
                <Link href="/menu">
                  <Button variant="outline" className="font-cairo">
                    عرض القائمة
                  </Button>
                </Link>
              </div>

              <div className="p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-300">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-home text-2xl"></i>
                </div>
                <h3 className="font-cairo font-bold text-lg text-chicken-black mb-2">
                  العودة للرئيسية
                </h3>
                <p className="font-cairo text-gray-600 text-sm mb-4">
                  ابدأ من جديد من صفحتنا الرئيسية
                </p>
                <Link href="/">
                  <Button variant="outline" className="font-cairo">
                    الصفحة الرئيسية
                  </Button>
                </Link>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-300">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-phone text-2xl"></i>
                </div>
                <h3 className="font-cairo font-bold text-lg text-chicken-black mb-2">
                  تواصل معنا
                </h3>
                <p className="font-cairo text-gray-600 text-sm mb-4">
                  هل تحتاج مساعدة؟ فريق خدمة العملاء جاهز
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="font-cairo">
                    اتصل بنا
                  </Button>
                </Link>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <Button 
                  size="lg" 
                  className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo px-8 py-4 text-lg"
                >
                  <i className="fas fa-home ml-2"></i>
                  العودة للرئيسية
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => window.history.back()}
                className="font-cairo px-8 py-4 text-lg"
              >
                <i className="fas fa-arrow-right ml-2"></i>
                العودة للصفحة السابقة
              </Button>
            </div>

            {/* Fun Facts */}
            <div className="mt-12 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
              <h3 className="font-cairo font-bold text-lg text-chicken-black mb-4">
                <i className="fas fa-lightbulb text-chicken-orange ml-2"></i>
                هل تعلم؟
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 ml-2"></i>
                  <span className="font-cairo text-gray-700">
                    لدينا أكثر من 50 صنف في القائمة
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 ml-2"></i>
                  <span className="font-cairo text-gray-700">
                    نقدم التوصيل المجاني للطلبات أكثر من 40 ريال
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 ml-2"></i>
                  <span className="font-cairo text-gray-700">
                    متوسط وقت التحضير 15 دقيقة فقط
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 ml-2"></i>
                  <span className="font-cairo text-gray-700">
                    تقييم 4.8/5 من أكثر من 1000 عميل
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-8 text-center">
              <p className="font-cairo text-gray-500 text-sm">
                إذا استمرت المشكلة، يرجى التواصل معنا على:
              </p>
              <div className="flex justify-center items-center space-x-6 space-x-reverse mt-2">
                <a href="tel:920003344" className="font-cairo text-chicken-orange hover:underline">
                  <i className="fas fa-phone ml-1"></i>
                  920003344
                </a>
                <a href="mailto:info@chickenhat.com" className="font-cairo text-chicken-orange hover:underline">
                  <i className="fas fa-envelope ml-1"></i>
                  info@chickenhat.com
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
