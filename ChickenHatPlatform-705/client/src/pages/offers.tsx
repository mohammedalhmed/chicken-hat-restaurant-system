
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";

export default function OffersPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const activeOffers = [
    {
      id: 1,
      title: "عرض الافتتاح الكبير",
      description: "خصم 50% على جميع الوجبات الرئيسية",
      discount: 50,
      type: "percentage",
      code: "OPENING50",
      validUntil: "2024-12-31",
      image: "/uploads/general/1754664015264-928336501.png",
      category: "main",
      minOrder: 30,
      maxDiscount: 25,
      isNew: true,
      isHot: true,
      usageCount: 1250,
      maxUsage: 2000
    },
    {
      id: 2,
      title: "وجبة عائلية مميزة",
      description: "4 قطع دجاج + 2 برغر + بطاطس كبيرة + 4 مشروبات",
      discount: 45,
      type: "fixed",
      code: "FAMILY45",
      validUntil: "2024-12-25",
      image: "/uploads/general/1754663879290-656252803.jpg",
      category: "family",
      minOrder: 80,
      maxDiscount: 45,
      isNew: false,
      isHot: true,
      usageCount: 890,
      maxUsage: 1500
    },
    {
      id: 3,
      title: "توصيل مجاني",
      description: "توصيل مجاني للطلبات أكثر من 40 ريال",
      discount: 15,
      type: "delivery",
      code: "FREEDELIVERY",
      validUntil: "2024-12-30",
      image: "/uploads/general/1754663924679-454854765.jpg",
      category: "delivery",
      minOrder: 40,
      maxDiscount: 15,
      isNew: false,
      isHot: false,
      usageCount: 2100,
      maxUsage: 3000
    },
    {
      id: 4,
      title: "عرض الطلاب",
      description: "خصم 25% للطلاب مع عرض الهوية الجامعية",
      discount: 25,
      type: "percentage",
      code: "STUDENT25",
      validUntil: "2024-12-28",
      image: "/uploads/general/1754663967206-46919532.jpg",
      category: "special",
      minOrder: 20,
      maxDiscount: 20,
      isNew: true,
      isHot: false,
      usageCount: 450,
      maxUsage: 1000
    },
    {
      id: 5,
      title: "عرض نهاية الأسبوع",
      description: "اشتري 2 واحصل على الثالث مجاناً - خميس، جمعة، سبت",
      discount: 33,
      type: "buy2get1",
      code: "WEEKEND33",
      validUntil: "2024-12-29",
      image: "/uploads/general/1754663986841-882257712.jpg",
      category: "weekend",
      minOrder: 50,
      maxDiscount: 35,
      isNew: false,
      isHot: true,
      usageCount: 1680,
      maxUsage: 2500
    },
    {
      id: 6,
      title: "عرض منتصف الليل",
      description: "خصم 30% على جميع الطلبات من 10 مساءً حتى 2 صباحاً",
      discount: 30,
      type: "percentage",
      code: "MIDNIGHT30",
      validUntil: "2024-12-31",
      image: "/uploads/general/1754664044334-990935200.png",
      category: "time",
      minOrder: 25,
      maxDiscount: 30,
      isNew: true,
      isHot: false,
      usageCount: 320,
      maxUsage: 800
    }
  ];

  const offerCategories = [
    { id: "all", name: "جميع العروض", icon: "fas fa-tags" },
    { id: "main", name: "عروض رئيسية", icon: "fas fa-star" },
    { id: "family", name: "عروض عائلية", icon: "fas fa-users" },
    { id: "delivery", name: "توصيل مجاني", icon: "fas fa-shipping-fast" },
    { id: "special", name: "عروض خاصة", icon: "fas fa-gift" },
    { id: "weekend", name: "عروض نهاية الأسبوع", icon: "fas fa-calendar-weekend" },
    { id: "time", name: "عروض وقتية", icon: "fas fa-clock" }
  ];

  const filteredOffers = selectedCategory === "all" 
    ? activeOffers 
    : activeOffers.filter(offer => offer.category === selectedCategory);

  const getDiscountText = (offer: any) => {
    switch (offer.type) {
      case "percentage":
        return `خصم ${offer.discount}%`;
      case "fixed":
        return `خصم ${offer.discount} ريال`;
      case "delivery":
        return "توصيل مجاني";
      case "buy2get1":
        return "اشتري 2 احصل على 1 مجاناً";
      default:
        return `خصم ${offer.discount}%`;
    }
  };

  const getProgressPercentage = (used: number, total: number) => {
    return (used / total) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-chicken-orange via-red-500 to-orange-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyIDZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyLTZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNCIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-amiri text-5xl md:text-6xl font-bold mb-6 animate-fadeInUp">
            العروض والخصومات
          </h1>
          <p className="font-cairo text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
            أفضل العروض والخصومات الحصرية على أشهى الوجبات
          </p>
          <div className="flex justify-center space-x-6 space-x-reverse animate-fadeInUp animation-delay-400">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-percentage text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">خصومات تصل 50%</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-gift text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">عروض يومية</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-crown text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">عروض VIP</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Offer Categories */}
        <div className="mb-12">
          <h2 className="font-amiri text-3xl font-bold text-chicken-black mb-8 text-center">
            تصفح العروض حسب الفئة
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {offerCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`h-20 flex flex-col items-center justify-center space-y-2 font-cairo transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-chicken-orange hover:bg-orange-600 text-white shadow-lg scale-105"
                    : "hover:bg-orange-50 hover:border-chicken-orange hover:scale-105"
                }`}
              >
                <i className={`${category.icon} text-lg`}></i>
                <span className="text-xs font-medium">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.map((offer) => (
            <Card key={offer.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white">
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  {offer.isNew && (
                    <Badge className="bg-green-500 text-white font-cairo animate-pulse">
                      <i className="fas fa-sparkles ml-1"></i>
                      جديد
                    </Badge>
                  )}
                  {offer.isHot && (
                    <Badge className="bg-red-500 text-white font-cairo animate-bounce">
                      <i className="fas fa-fire ml-1"></i>
                      الأكثر طلباً
                    </Badge>
                  )}
                </div>

                {/* Discount Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-chicken-orange text-white px-3 py-1 rounded-full font-cairo font-bold text-sm">
                    {getDiscountText(offer)}
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-cairo font-bold text-xl text-chicken-black mb-3 group-hover:text-chicken-orange transition-colors">
                  {offer.title}
                </h3>
                
                <p className="font-cairo text-gray-600 mb-4 leading-relaxed">
                  {offer.description}
                </p>

                {/* Offer Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-cairo text-gray-500">كود الخصم:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded font-mono font-bold text-chicken-orange">
                      {offer.code}
                    </code>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-cairo text-gray-500">صالح حتى:</span>
                    <span className="font-cairo font-semibold">{offer.validUntil}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-cairo text-gray-500">الحد الأدنى:</span>
                    <span className="font-cairo font-semibold">{offer.minOrder} ريال</span>
                  </div>

                  {/* Usage Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-cairo text-gray-500">مرات الاستخدام:</span>
                      <span className="font-cairo font-semibold">
                        {offer.usageCount} / {offer.maxUsage}
                      </span>
                    </div>
                    <Progress 
                      value={getProgressPercentage(offer.usageCount, offer.maxUsage)} 
                      className="h-2"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 space-x-reverse">
                  <Link href="/menu" className="flex-1">
                    <Button className="w-full bg-chicken-orange hover:bg-orange-600 text-white font-cairo transition-all duration-300">
                      <i className="fas fa-shopping-cart ml-2"></i>
                      استخدم العرض
                    </Button>
                  </Link>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(offer.code);
                    }}
                    className="hover:bg-gray-50"
                  >
                    <i className="fas fa-copy"></i>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How to Use Section */}
        <div className="mt-16">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-50 to-amber-50">
            <CardHeader className="text-center">
              <CardTitle className="font-amiri text-3xl text-chicken-black">
                <i className="fas fa-question-circle ml-3 text-chicken-orange"></i>
                كيفية استخدام العروض
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-chicken-orange text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-xl">1</span>
                  </div>
                  <h3 className="font-cairo font-bold text-lg mb-2">اختر العرض</h3>
                  <p className="font-cairo text-gray-600">تصفح العروض المتاحة واختر المناسب لك</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-chicken-orange text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-xl">2</span>
                  </div>
                  <h3 className="font-cairo font-bold text-lg mb-2">انسخ الكود</h3>
                  <p className="font-cairo text-gray-600">انسخ كود الخصم الخاص بالعرض</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-chicken-orange text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-xl">3</span>
                  </div>
                  <h3 className="font-cairo font-bold text-lg mb-2">استخدم عند الدفع</h3>
                  <p className="font-cairo text-gray-600">ادخل الكود في صفحة الدفع واستمتع بالخصم</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16">
          <Card className="shadow-xl border-0 bg-gradient-to-r from-chicken-orange to-orange-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="font-amiri text-2xl font-bold mb-4">
                <i className="fas fa-bell ml-2"></i>
                اشترك في النشرة الإخبارية
              </h3>
              <p className="font-cairo text-lg mb-6">
                احصل على آخر العروض والخصومات الحصرية مباشرة في بريدك الإلكتروني
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-4 py-3 rounded-lg text-black font-cairo"
                />
                <Button className="bg-white text-chicken-orange hover:bg-gray-100 font-cairo px-6 py-3">
                  <i className="fas fa-paper-plane ml-2"></i>
                  اشترك الآن
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
