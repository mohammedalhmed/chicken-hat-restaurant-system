
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showWriteReview, setShowWriteReview] = useState(false);

  const reviews = [
    {
      id: 1,
      customerName: "أحمد محمد",
      avatar: "/placeholder-avatar1.jpg",
      rating: 5,
      date: "2024-08-05",
      title: "تجربة رائعة ومميزة",
      comment: "الدجاج كان لذيذ جداً ومقرمش، والخدمة سريعة والموظفين ودودين. المطعم نظيف والأسعار معقولة. بالتأكيد سأعود مرة أخرى وأنصح الجميع بزيارة تشكن هات.",
      orderItems: ["دجاج مقرمش", "بطاطس مقلية", "كولا"],
      helpful: 24,
      verified: true,
      response: {
        from: "إدارة تشكن هات",
        date: "2024-08-06",
        message: "شكراً لك أحمد على هذه المراجعة الرائعة! نحن سعداء أن تجربتك كانت مميزة ونتطلع لاستقبالك مرة أخرى."
      }
    },
    {
      id: 2,
      customerName: "فاطمة علي",
      avatar: "/placeholder-avatar2.jpg",
      rating: 4,
      date: "2024-08-03",
      title: "جودة ممتازة وطعم لذيذ",
      comment: "الطعام لذيذ والجودة عالية. الوقت المستغرق للتحضير كان مناسب. المكان نظيف ومريح. الوحيد الشيء أن المشروبات كانت باردة أكثر من اللازم.",
      orderItems: ["وجبة عائلية", "عصير برتقال"],
      helpful: 18,
      verified: true,
      response: null
    },
    {
      id: 3,
      customerName: "محمد سالم",
      avatar: "/placeholder-avatar3.jpg",
      rating: 5,
      date: "2024-08-01",
      title: "أفضل دجاج في المدينة",
      comment: "صراحة أفضل دجاج جربته في الرياض! التوابل مميزة والطعم أصيل. فريق الخدمة محترف جداً والتوصيل سريع. أنصح بشدة بتجربة الوجبة العائلية.",
      orderItems: ["دجاج حار", "أرز بسمتي", "سلطة"],
      helpful: 31,
      verified: true,
      response: {
        from: "إدارة تشكن هات",
        date: "2024-08-02",
        message: "شكراً جزيلاً محمد! تعليقك يسعدنا كثيراً ويحفزنا على تقديم الأفضل دائماً."
      }
    },
    {
      id: 4,
      customerName: "نورا أحمد",
      avatar: "/placeholder-avatar4.jpg",
      rating: 3,
      date: "2024-07-30",
      title: "تجربة جيدة لكن تحتاج تحسين",
      comment: "الطعام جيد والطعم لذيذ، لكن وقت الانتظار كان طويل نوعاً ما. كما أن السعر مرتفع قليلاً مقارنة بالكمية. أتمنى تحسين هذه النقاط.",
      orderItems: ["برغر دجاج", "بطاطس"],
      helpful: 12,
      verified: false,
      response: {
        from: "إدارة تشكن هات",
        date: "2024-07-31",
        message: "شكراً نورا على ملاحظاتك البناءة. نحن نعمل على تحسين أوقات التحضير وسنراجع أسعارنا لضمان القيمة الأفضل للعملاء."
      }
    },
    {
      id: 5,
      customerName: "خالد عبدالله",
      avatar: "/placeholder-avatar5.jpg",
      rating: 5,
      date: "2024-07-28",
      title: "خدمة توصيل ممتازة",
      comment: "طلبت عبر التطبيق والتوصيل كان سريع جداً والطعام وصل ساخن ولذيذ. التعامل مع خدمة العملاء كان راقي ومحترم. تجربة رائعة بكل المقاييس.",
      orderItems: ["وجبة مختلطة", "مشروب غازي", "آيس كريم"],
      helpful: 22,
      verified: true,
      response: null
    }
  ];

  const overallStats = {
    averageRating: 4.4,
    totalReviews: 1247,
    ratingDistribution: {
      5: 67,
      4: 18,
      3: 9,
      2: 4,
      1: 2
    }
  };

  const filters = [
    { value: "all", label: "جميع المراجعات", count: overallStats.totalReviews },
    { value: "5", label: "5 نجوم", count: Math.round(overallStats.totalReviews * 0.67) },
    { value: "4", label: "4 نجوم", count: Math.round(overallStats.totalReviews * 0.18) },
    { value: "3", label: "3 نجوم", count: Math.round(overallStats.totalReviews * 0.09) },
    { value: "2", label: "2 نجوم", count: Math.round(overallStats.totalReviews * 0.04) },
    { value: "1", label: "1 نجم", count: Math.round(overallStats.totalReviews * 0.02) },
    { value: "verified", label: "مراجعات موثقة", count: Math.round(overallStats.totalReviews * 0.85) }
  ];

  const filteredReviews = selectedFilter === "all" 
    ? reviews 
    : selectedFilter === "verified" 
    ? reviews.filter(review => review.verified)
    : reviews.filter(review => review.rating === parseInt(selectedFilter));

  const renderStars = (rating: number, size: string = "text-sm") => {
    return (
      <div className={`flex ${size}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`fas fa-star ${
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
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyIDZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyLTZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNCIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-amiri text-5xl md:text-6xl font-bold mb-6 animate-fadeInUp">
            آراء العملاء
          </h1>
          <p className="font-cairo text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
            اكتشف تجارب عملائنا الكرام واقرأ آرائهم الصادقة حول خدماتنا
          </p>
          <div className="flex justify-center space-x-6 space-x-reverse animate-fadeInUp animation-delay-400">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-star text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">{overallStats.averageRating} تقييم عام</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-comments text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">{overallStats.totalReviews}+ مراجعة</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-thumbs-up text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">%95 راضون</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Write Review Section */}
            <Card className="mb-8 shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-cairo text-xl text-chicken-black">
                    <i className="fas fa-edit ml-2 text-chicken-orange"></i>
                    شاركنا تجربتك
                  </CardTitle>
                  <Button
                    onClick={() => setShowWriteReview(!showWriteReview)}
                    className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo"
                  >
                    <i className="fas fa-plus ml-2"></i>
                    اكتب مراجعة
                  </Button>
                </div>
              </CardHeader>
              {showWriteReview && (
                <CardContent className="space-y-4">
                  <div>
                    <label className="block font-cairo font-medium mb-2">التقييم العام</label>
                    <div className="flex space-x-2 space-x-reverse">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors">
                          <i className="fas fa-star"></i>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block font-cairo font-medium mb-2">عنوان المراجعة</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg font-cairo"
                      placeholder="عنوان مختصر لتجربتك"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-cairo font-medium mb-2">تفاصيل المراجعة</label>
                    <Textarea
                      className="font-cairo min-h-[120px]"
                      placeholder="شاركنا تفاصيل تجربتك مع تشكن هات..."
                    />
                  </div>
                  
                  <div className="flex space-x-3 space-x-reverse">
                    <Button className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo">
                      <i className="fas fa-paper-plane ml-2"></i>
                      نشر المراجعة
                    </Button>
                    <Button variant="outline" onClick={() => setShowWriteReview(false)} className="font-cairo">
                      إلغاء
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Filters */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                  <Button
                    key={filter.value}
                    variant={selectedFilter === filter.value ? "default" : "outline"}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`font-cairo transition-all duration-300 ${
                      selectedFilter === filter.value
                        ? "bg-chicken-orange hover:bg-orange-600 text-white"
                        : "hover:bg-orange-50 hover:border-chicken-orange"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </Button>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={review.avatar} alt={review.customerName} />
                          <AvatarFallback className="bg-chicken-orange text-white font-cairo">
                            {review.customerName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center space-x-2 space-x-reverse mb-1">
                            <h3 className="font-cairo font-bold text-chicken-black">
                              {review.customerName}
                            </h3>
                            {review.verified && (
                              <Badge className="bg-green-100 text-green-800 font-cairo text-xs">
                                <i className="fas fa-check-circle ml-1"></i>
                                موثق
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            {renderStars(review.rating)}
                            <span className="font-cairo text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                        <i className="fas fa-ellipsis-v"></i>
                      </Button>
                    </div>

                    {/* Review Content */}
                    <div className="mb-4">
                      <h4 className="font-cairo font-bold text-lg text-chicken-black mb-2">
                        {review.title}
                      </h4>
                      <p className="font-cairo text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>

                    {/* Order Items */}
                    <div className="mb-4">
                      <span className="font-cairo text-sm text-gray-500 ml-2">طلب:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {review.orderItems.map((item, index) => (
                          <Badge key={index} variant="outline" className="font-cairo text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Review Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <Button variant="ghost" size="sm" className="font-cairo text-gray-600 hover:text-chicken-orange">
                          <i className="fas fa-thumbs-up ml-2"></i>
                          مفيد ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm" className="font-cairo text-gray-600 hover:text-chicken-orange">
                          <i className="fas fa-reply ml-2"></i>
                          رد
                        </Button>
                        <Button variant="ghost" size="sm" className="font-cairo text-gray-600 hover:text-chicken-orange">
                          <i className="fas fa-share ml-2"></i>
                          مشاركة
                        </Button>
                      </div>
                    </div>

                    {/* Management Response */}
                    {review.response && (
                      <div className="mt-6 p-4 bg-orange-50 rounded-lg border-r-4 border-chicken-orange">
                        <div className="flex items-center space-x-2 space-x-reverse mb-2">
                          <div className="w-8 h-8 bg-chicken-orange rounded-full flex items-center justify-center">
                            <i className="fas fa-store text-white text-sm"></i>
                          </div>
                          <div>
                            <h5 className="font-cairo font-bold text-chicken-black text-sm">
                              {review.response.from}
                            </h5>
                            <span className="font-cairo text-xs text-gray-500">
                              {review.response.date}
                            </span>
                          </div>
                        </div>
                        <p className="font-cairo text-gray-700 text-sm leading-relaxed">
                          {review.response.message}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="font-cairo px-8 py-3">
                <i className="fas fa-chevron-down ml-2"></i>
                عرض المزيد من المراجعات
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Overall Rating */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="font-cairo text-lg text-chicken-black">
                    <i className="fas fa-chart-bar ml-2 text-chicken-orange"></i>
                    التقييم العام
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-chicken-orange font-amiri mb-2">
                    {overallStats.averageRating}
                  </div>
                  <div className="mb-4">
                    {renderStars(Math.round(overallStats.averageRating), "text-lg")}
                  </div>
                  <p className="font-cairo text-gray-600 text-sm">
                    بناءً على {overallStats.totalReviews} مراجعة
                  </p>
                </CardContent>
              </Card>

              {/* Rating Distribution */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="font-cairo text-lg text-chicken-black">
                    توزيع التقييمات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(overallStats.ratingDistribution).reverse().map(([rating, percentage]) => (
                    <div key={rating} className="flex items-center space-x-3 space-x-reverse">
                      <span className="font-cairo text-sm w-8">{rating} ⭐</span>
                      <Progress value={percentage} className="flex-1 h-2" />
                      <span className="font-cairo text-sm text-gray-600 w-12">{percentage}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="font-cairo text-lg text-chicken-black">
                    إحصائيات سريعة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-cairo text-sm text-gray-600">مراجعات هذا الشهر</span>
                    <span className="font-cairo font-bold text-chicken-orange">127</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-cairo text-sm text-gray-600">معدل الاستجابة</span>
                    <span className="font-cairo font-bold text-green-600">98%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-cairo text-sm text-gray-600">وقت الرد المتوسط</span>
                    <span className="font-cairo font-bold text-blue-600">2 ساعة</span>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-chicken-orange to-orange-600 text-white">
                <CardContent className="p-6 text-center">
                  <i className="fas fa-heart text-3xl mb-4"></i>
                  <h3 className="font-cairo font-bold text-lg mb-2">
                    هل جربت تشكن هات؟
                  </h3>
                  <p className="font-cairo text-sm mb-4">
                    شاركنا تجربتك وساعد الآخرين في اتخاذ قرارهم
                  </p>
                  <Button 
                    className="bg-white text-chicken-orange hover:bg-gray-100 font-cairo"
                    onClick={() => setShowWriteReview(true)}
                  >
                    <i className="fas fa-star ml-2"></i>
                    اكتب مراجعة
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
