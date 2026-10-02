
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";

export default function FavoritesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterCategory, setFilterCategory] = useState("all");

  const favoriteItems = [
    {
      id: 1,
      name: "دجاج مقرمش حار",
      nameAr: "دجاج مقرمش حار",
      price: 35,
      image: "/uploads/menu-items/1754663879290-656252803.jpg",
      category: "دجاج",
      rating: 4.8,
      reviews: 156,
      addedDate: "2024-01-15",
      available: true,
      spicyLevel: 3,
      calories: 450,
      description: "قطع دجاج مقرمشة بالتوابل الحارة مع الصوص الخاص"
    },
    {
      id: 2,
      name: "برغر تشكن هات الخاص",
      nameAr: "برغر تشكن هات الخاص",
      price: 28,
      image: "/uploads/menu-items/1754663924679-454854765.jpg",
      category: "برغر",
      rating: 4.9,
      reviews: 203,
      addedDate: "2024-01-12",
      available: true,
      spicyLevel: 1,
      calories: 520,
      description: "برغر دجاج مشوي مع الخضار الطازجة والصوص السري"
    },
    {
      id: 3,
      name: "أجنحة دجاج بالعسل",
      nameAr: "أجنحة دجاج بالعسل",
      price: 32,
      image: "/uploads/menu-items/1754663967206-46919532.jpg",
      category: "أجنحة",
      rating: 4.7,
      reviews: 124,
      addedDate: "2024-01-10",
      available: false,
      spicyLevel: 2,
      calories: 380,
      description: "أجنحة دجاج مقرمشة بصوص العسل والخردل"
    },
    {
      id: 4,
      name: "وجبة عائلية مختلطة",
      nameAr: "وجبة عائلية مختلطة",
      price: 85,
      image: "/uploads/menu-items/1754663986841-882257712.jpg",
      category: "عائلية",
      rating: 4.9,
      reviews: 89,
      addedDate: "2024-01-08",
      available: true,
      spicyLevel: 2,
      calories: 1200,
      description: "8 قطع دجاج + برغرين + بطاطس كبيرة + 4 مشروبات"
    },
    {
      id: 5,
      name: "سلطة دجاج مشوي",
      nameAr: "سلطة دجاج مشوي",
      price: 24,
      image: "/uploads/menu-items/1754664044334-990935200.png",
      category: "سلطات",
      rating: 4.6,
      reviews: 67,
      addedDate: "2024-01-05",
      available: true,
      spicyLevel: 0,
      calories: 280,
      description: "سلطة خضار طازجة مع قطع الدجاج المشوي والصوص الخاص"
    }
  ];

  const categories = [
    { value: "all", label: "جميع الفئات" },
    { value: "دجاج", label: "دجاج" },
    { value: "برغر", label: "برغر" },
    { value: "أجنحة", label: "أجنحة" },
    { value: "عائلية", label: "وجبات عائلية" },
    { value: "سلطات", label: "سلطات" }
  ];

  const sortOptions = [
    { value: "recent", label: "الأحدث إضافة" },
    { value: "name", label: "الاسم" },
    { value: "price-low", label: "السعر: الأقل أولاً" },
    { value: "price-high", label: "السعر: الأعلى أولاً" },
    { value: "rating", label: "التقييم" }
  ];

  const filteredAndSortedItems = favoriteItems
    .filter(item => {
      const matchesSearch = item.nameAr.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.nameAr.localeCompare(b.nameAr);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "recent":
        default:
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      }
    });

  const renderSpicyLevel = (level: number) => {
    return (
      <div className="flex items-center space-x-1 space-x-reverse">
        {[...Array(3)].map((_, i) => (
          <i
            key={i}
            className={`fas fa-pepper-hot text-xs ${
              i < level ? "text-red-500" : "text-gray-300"
            }`}
          ></i>
        ))}
      </div>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`fas fa-star text-sm ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          ></i>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyIDZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyLTZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNCIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-amiri text-5xl md:text-6xl font-bold mb-6 animate-fadeInUp">
            الوجبات المفضلة
          </h1>
          <p className="font-cairo text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
            اكتشف وجباتك المفضلة واطلبها بسهولة في أي وقت
          </p>
          <div className="flex justify-center space-x-6 space-x-reverse animate-fadeInUp animation-delay-400">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-heart text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">{favoriteItems.length} وجبة مفضلة</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-star text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">أعلى تقييم</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-shopping-cart text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">طلب سريع</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters and Search */}
        <Card className="mb-8 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block font-cairo font-medium mb-2 text-gray-700">
                  البحث
                </label>
                <Input
                  placeholder="ابحث في المفضلة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="font-cairo"
                />
              </div>
              
              <div>
                <label className="block font-cairo font-medium mb-2 text-gray-700">
                  الفئة
                </label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="font-cairo">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value} className="font-cairo">
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block font-cairo font-medium mb-2 text-gray-700">
                  ترتيب حسب
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="font-cairo">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="font-cairo">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterCategory("all");
                    setSortBy("recent");
                  }}
                  className="w-full font-cairo"
                >
                  <i className="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-cairo text-gray-600">
            عرض {filteredAndSortedItems.length} من {favoriteItems.length} وجبة مفضلة
          </p>
        </div>

        {/* Favorites Grid */}
        {filteredAndSortedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.nameAr}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    {item.available ? (
                      <Badge className="bg-green-500 text-white font-cairo">
                        متوفر
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500 text-white font-cairo">
                        غير متوفر
                      </Badge>
                    )}
                  </div>

                  {/* Remove from Favorites */}
                  <button className="absolute top-3 left-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors">
                    <i className="fas fa-heart"></i>
                  </button>

                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3 bg-chicken-orange text-white px-3 py-1 rounded-full font-cairo font-bold">
                    {item.price} ريال
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-cairo font-bold text-lg text-chicken-black group-hover:text-chicken-orange transition-colors">
                      {item.nameAr}
                    </h3>
                    <Badge variant="outline" className="font-cairo text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  
                  <p className="font-cairo text-gray-600 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {renderStars(Math.floor(item.rating))}
                      <span className="font-cairo text-sm text-gray-600">
                        {item.rating} ({item.reviews} تقييم)
                      </span>
                    </div>
                    {item.spicyLevel > 0 && renderSpicyLevel(item.spicyLevel)}
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="font-cairo">
                      <i className="fas fa-fire ml-1"></i>
                      {item.calories} سعرة
                    </span>
                    <span className="font-cairo">
                      <i className="fas fa-calendar ml-1"></i>
                      أضيف في {new Date(item.addedDate).toLocaleDateString('ar-SA')}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 space-x-reverse">
                    <Button 
                      className="flex-1 bg-chicken-orange hover:bg-orange-600 text-white font-cairo"
                      disabled={!item.available}
                    >
                      <i className="fas fa-shopping-cart ml-2"></i>
                      {item.available ? "أضف للسلة" : "غير متوفر"}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-gray-50"
                    >
                      <i className="fas fa-share-alt"></i>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16 shadow-lg border-0">
            <CardContent>
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-heart-broken text-4xl text-gray-400"></i>
              </div>
              <h3 className="font-cairo font-bold text-xl text-gray-800 mb-4">
                لا توجد وجبات مفضلة
              </h3>
              <p className="font-cairo text-gray-600 mb-6">
                {searchTerm || filterCategory !== "all" 
                  ? "لم نجد وجبات مفضلة تطابق معايير البحث الحالية"
                  : "لم تقم بإضافة أي وجبات إلى المفضلة بعد"
                }
              </p>
              <Link href="/menu">
                <Button className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo">
                  <i className="fas fa-utensils ml-2"></i>
                  تصفح القائمة
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-chicken-orange text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shopping-cart text-2xl"></i>
              </div>
              <h3 className="font-cairo font-bold text-lg text-chicken-black mb-2">
                اطلب الكل
              </h3>
              <p className="font-cairo text-gray-600 text-sm mb-4">
                أضف جميع المفضلة المتوفرة إلى السلة
              </p>
              <Button className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo">
                أضف الكل للسلة
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-teal-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-share text-2xl"></i>
              </div>
              <h3 className="font-cairo font-bold text-lg text-chicken-black mb-2">
                شارك المفضلة
              </h3>
              <p className="font-cairo text-gray-600 text-sm mb-4">
                شارك قائمة المفضلة مع الأصدقاء
              </p>
              <Button variant="outline" className="font-cairo">
                مشاركة القائمة
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-bell text-2xl"></i>
              </div>
              <h3 className="font-cairo font-bold text-lg text-chicken-black mb-2">
                تنبيهات المفضلة
              </h3>
              <p className="font-cairo text-gray-600 text-sm mb-4">
                احصل على تنبيه عند توفر الوجبات
              </p>
              <Button variant="outline" className="font-cairo">
                تفعيل التنبيهات
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
