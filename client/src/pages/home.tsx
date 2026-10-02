
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import type { MenuItemWithCategory } from "@shared/schema";

export default function HomePage() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: menuItems = [], isLoading } = useQuery<MenuItemWithCategory[]>({
    queryKey: ["/api/menu-items"],
    queryFn: async () => {
      const response = await fetch("/api/menu-items");
      if (!response.ok) throw new Error('Failed to fetch menu items');
      return response.json();
    },
  });

  // Get best sellers (top 6 items)
  const bestSellers = menuItems.filter(item => item.isAvailable).slice(0, 6);

  const handleAddToCart = async (item: MenuItemWithCategory) => {
    try {
      addToCart({
        id: item.id,
        name: item.name,
        nameAr: item.nameAr,
        description: item.description ?? undefined,
        descriptionAr: item.descriptionAr ?? undefined,
        price: parseFloat(item.price),
        imageUrl: item.imageUrl || "/placeholder-food.jpg",
      });
      
      toast({
        title: "تم الإضافة بنجاح!",
        description: `تم إضافة ${item.nameAr} إلى سلة المشتريات`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في إضافة المنتج إلى السلة",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* القسم الرئيسي (Hero Section) */}
      <section className="relative min-h-screen bg-gradient-to-br from-chicken-black via-gray-900 to-chicken-orange overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyIDZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyLTZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNCIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-16 flex items-center min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Text Content */}
            <div className="text-white space-y-8 text-center lg:text-right">
              <div className="space-y-4">
                <h1 className="font-amiri font-bold text-5xl md:text-7xl lg:text-8xl leading-tight">
                  مرحباً بكم في
                  <span className="block text-chicken-orange drop-shadow-2xl">
                    تشكن هات
                  </span>
                </h1>
                <p className="font-cairo text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  نقدم لكم أشهى وجبات الدجاج المقلي والبروستد المحضرة بأفضل المكونات الطازجة وأسرار التوابل الخاصة
                </p>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => window.location.href = '/menu'}
                  className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo text-lg px-8 py-4 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-orange-500/25"
                >
                  <i className="fas fa-utensils ml-2"></i>
                  اكتشف قائمة الطعام
                </Button>
                <Button
                  onClick={() => window.location.href = '/reservations'}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-chicken-black font-cairo text-lg px-8 py-4 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105"
                >
                  <i className="fas fa-calendar-alt ml-2"></i>
                  احجز طاولة
                </Button>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="w-12 h-12 bg-chicken-orange rounded-full flex items-center justify-center mx-auto mb-2">
                    <i className="fas fa-clock text-white text-xl"></i>
                  </div>
                  <h3 className="font-cairo font-bold text-white mb-1">ساعات العمل</h3>
                  <p className="font-cairo text-gray-300 text-sm">يومياً 10 ص - 12 م</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-chicken-orange rounded-full flex items-center justify-center mx-auto mb-2">
                    <i className="fas fa-phone text-white text-xl"></i>
                  </div>
                  <h3 className="font-cairo font-bold text-white mb-1">للطلبات السريعة</h3>
                  <p className="font-cairo text-gray-300 text-sm">920-000-123</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-chicken-orange rounded-full flex items-center justify-center mx-auto mb-2">
                    <i className="fas fa-truck text-white text-xl"></i>
                  </div>
                  <h3 className="font-cairo font-bold text-white mb-1">توصيل مجاني</h3>
                  <p className="font-cairo text-gray-300 text-sm">للطلبات أكثر من 50 ريال</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/placeholder-food.jpg"
                  alt="أشهى وجبات تشكن هات"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-chicken-orange rounded-full flex items-center justify-center shadow-xl animate-bounce">
                  <i className="fas fa-star text-white text-2xl"></i>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                  <span className="font-cairo font-bold text-chicken-orange">طعم لا يُقاوم!</span>
                </div>
              </div>
              
              {/* Background Decorations */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-chicken-orange/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <i className="fas fa-chevron-down text-2xl"></i>
        </div>
      </section>

      {/* قسم الوجبات الأكثر مبيعاً */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-amiri font-bold text-4xl md:text-5xl text-chicken-black mb-6">
              الوجبات الأكثر طلباً
            </h2>
            <p className="font-cairo text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              اكتشف أشهى الوجبات التي يفضلها عملاؤنا والمحضرة بأفضل المكونات الطازجة
            </p>
            <div className="w-24 h-1 bg-chicken-orange mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Best Sellers Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bestSellers.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 bg-white border border-gray-200"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: 'fadeInUp 0.8s ease-out forwards'
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.imageUrl || "/placeholder-food.jpg"}
                      alt={item.nameAr}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Best Seller Badge */}
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-chicken-orange to-orange-600 text-white font-cairo shadow-lg">
                      <i className="fas fa-fire ml-1"></i>
                      الأكثر طلباً
                    </Badge>

                    {/* Price Tag */}
                    <div className="absolute bottom-3 right-3 bg-chicken-orange text-white px-4 py-2 rounded-full font-cairo font-bold text-lg shadow-lg">
                      {parseFloat(item.price).toFixed(0)} ريال
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="bg-white text-chicken-orange hover:bg-gray-100 font-cairo transform scale-90 group-hover:scale-100 transition-transform duration-300"
                      >
                        <i className="fas fa-cart-plus ml-2"></i>
                        أضف للسلة
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-cairo font-bold text-xl text-chicken-black mb-3 line-clamp-1">
                      {item.nameAr}
                    </h3>
                    <p className="text-gray-600 text-sm font-cairo mb-4 line-clamp-2 leading-relaxed">
                      {item.descriptionAr || item.description || "وجبة لذيذة ومميزة من مطعم تشكن هات"}
                    </p>
                    
                    {/* Calories */}
                    {item.calories && (
                      <div className="flex items-center text-xs text-gray-500 mb-4 font-cairo">
                        <i className="fas fa-fire ml-1 text-orange-500"></i>
                        {item.calories} سعرة حرارية
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = '/menu'}
                        className="border-chicken-orange text-chicken-orange hover:bg-chicken-orange hover:text-white transition-all duration-300 font-cairo"
                      >
                        <i className="fas fa-eye ml-1"></i>
                        عرض التفاصيل
                      </Button>
                      
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="bg-chicken-orange hover:bg-orange-600 text-white transition-all duration-300 transform hover:scale-105 shadow-md font-cairo"
                        size="sm"
                      >
                        <i className="fas fa-cart-plus ml-2"></i>
                        أضف للسلة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button
              onClick={() => window.location.href = '/menu'}
              className="bg-gradient-to-r from-chicken-orange to-orange-600 hover:from-orange-600 hover:to-chicken-orange text-white font-cairo text-lg px-12 py-4 rounded-full shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <i className="fas fa-utensils ml-2"></i>
              عرض قائمة الطعام كاملة
            </Button>
          </div>
        </div>
      </section>

      {/* قسم العروض الحالية */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-amiri font-bold text-4xl md:text-5xl text-chicken-black mb-6">
              العروض الخاصة
            </h2>
            <p className="font-cairo text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              لا تفوت عروضنا المميزة والمحدودة الوقت
            </p>
            <div className="w-24 h-1 bg-chicken-orange mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample Offers */}
            <Card className="overflow-hidden bg-gradient-to-br from-chicken-orange to-orange-600 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-percentage text-3xl"></i>
                </div>
                <h3 className="font-amiri font-bold text-2xl mb-4">عرض العائلة</h3>
                <p className="font-cairo mb-6 text-orange-100">
                  وجبة عائلية كاملة مع مشروبات مجانية
                </p>
                <div className="text-3xl font-bold mb-4">خصم 30%</div>
                <Button
                  className="bg-white text-chicken-orange hover:bg-gray-100 font-cairo"
                  onClick={() => window.location.href = '/menu'}
                >
                  اطلب الآن
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-gift text-3xl"></i>
                </div>
                <h3 className="font-amiri font-bold text-2xl mb-4">توصيل مجاني</h3>
                <p className="font-cairo mb-6 text-green-100">
                  توصيل مجاني لجميع الطلبات أكثر من 50 ريال
                </p>
                <div className="text-3xl font-bold mb-4">0 ريال</div>
                <Button
                  className="bg-white text-green-600 hover:bg-gray-100 font-cairo"
                  onClick={() => window.location.href = '/menu'}
                >
                  اطلب الآن
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-clock text-3xl"></i>
                </div>
                <h3 className="font-amiri font-bold text-2xl mb-4">العرض اليومي</h3>
                <p className="font-cairo mb-6 text-purple-100">
                  وجبة اليوم بسعر خاص حتى نفاد الكمية
                </p>
                <div className="text-3xl font-bold mb-4">25 ريال</div>
                <Button
                  className="bg-white text-purple-600 hover:bg-gray-100 font-cairo"
                  onClick={() => window.location.href = '/menu'}
                >
                  اطلب الآن
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* قسم نبذة عن المطعم */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <h2 className="font-amiri font-bold text-4xl md:text-5xl text-chicken-black mb-6">
                  عن تشكن هات
                </h2>
                <div className="w-24 h-1 bg-chicken-orange mb-8 rounded-full"></div>
              </div>

              <p className="font-cairo text-lg text-gray-700 leading-relaxed">
                مطعم تشكن هات هو وجهتك المثالية للاستمتاع بأشهى وجبات الدجاج المقلي والبروستد في المنطقة. 
                نحن نفخر بتقديم وجبات عالية الجودة محضرة بأفضل المكونات الطازجة وباستخدام وصفات سرية تميزنا عن الآخرين.
              </p>

              <p className="font-cairo text-lg text-gray-700 leading-relaxed">
                منذ تأسيسنا، نسعى لتقديم تجربة طعام استثنائية تجمع بين الطعم الأصيل والجودة العالية والخدمة المميزة. 
                فريقنا من الطهاة المهرة يعمل بدأب لضمان حصولك على أفضل تجربة طعام في كل زيارة.
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-chicken-orange font-amiri mb-2">15,000+</div>
                  <p className="text-gray-600 font-cairo">وجبة مقدمة</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-chicken-orange font-amiri mb-2">5+</div>
                  <p className="text-gray-600 font-cairo">سنوات خبرة</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-chicken-orange font-amiri mb-2">98%</div>
                  <p className="text-gray-600 font-cairo">عملاء راضون</p>
                </div>
              </div>

              <Button
                onClick={() => window.location.href = '/about'}
                className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo text-lg px-8 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                <i className="fas fa-info-circle ml-2"></i>
                اقرأ المزيد
              </Button>
            </div>

            {/* Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/placeholder-food.jpg"
                  alt="طعام تشكن هات"
                  className="rounded-2xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300"
                />
                <img
                  src="/placeholder-food.jpg"
                  alt="مطبخ تشكن هات"
                  className="rounded-2xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300 mt-8"
                />
              </div>
              
              {/* Floating Element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-chicken-orange rounded-full flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <i className="fas fa-award text-2xl mb-2"></i>
                  <div className="font-cairo text-xs font-bold">جودة مضمونة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
