import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const deliveryFee = 10;
  const tax = getTotalPrice() * 0.15; // 15% VAT
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20" dir="rtl">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-shopping-cart text-gray-400 text-5xl"></i>
            </div>
            <h2 className="font-amiri text-3xl font-bold text-chicken-black mb-4">
              سلة المشتريات فارغة
            </h2>
            <p className="text-gray-600 font-cairo text-lg mb-8">
              لم تقم بإضافة أي وجبات إلى سلة المشتريات بعد
            </p>
            <Link href="/menu">
              <Button className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo px-8 py-3 rounded-full text-lg">
                <i className="fas fa-utensils ml-2"></i>
                تصفح القائمة
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-amiri text-4xl font-bold text-chicken-black mb-2">
            سلة المشتريات
          </h1>
          <p className="text-gray-600 font-cairo">
            لديك {items.length} {items.length === 1 ? 'منتج' : 'منتجات'} في السلة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-cairo text-xl flex items-center">
                  <i className="fas fa-list ml-3 text-chicken-orange"></i>
                  عناصر السلة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={`${item.id}-${JSON.stringify(item.customizations)}`} className="p-6">
                      <div className="flex items-start space-x-4 space-x-reverse">
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.nameAr}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <i className="fas fa-utensils text-gray-400 text-2xl"></i>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-cairo font-semibold text-lg text-gray-900 mb-1">
                            {item.nameAr}
                          </h3>
                          <p className="text-gray-600 font-cairo text-sm mb-2 line-clamp-2">
                            {item.descriptionAr}
                          </p>

                          {/* Customizations */}
                          {item.customizations && Object.keys(item.customizations).length > 0 && (
                            <div className="mb-2">
                              {Object.entries(item.customizations).map(([key, value]) => (
                                <Badge key={key} variant="outline" className="ml-1 mb-1 font-cairo text-xs">
                                  {key}: {value}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Price and Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 space-x-reverse">
                              {/* Quantity Controls */}
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1, item.customizations)}
                                  disabled={item.quantity <= 1}
                                  className="px-3 py-1 hover:bg-gray-100"
                                >
                                  <i className="fas fa-minus text-sm"></i>
                                </Button>
                                <span className="px-4 py-2 font-cairo font-semibold text-gray-900">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1, item.customizations)}
                                  className="px-3 py-1 hover:bg-gray-100"
                                >
                                  <i className="fas fa-plus text-sm"></i>
                                </Button>
                              </div>

                              {/* Remove Button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id, item.customizations)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2"
                              >
                                <i className="fas fa-trash text-sm"></i>
                              </Button>
                            </div>

                            {/* Price */}
                            <div className="text-left">
                              <div className="font-cairo font-bold text-lg text-chicken-orange">
                                {(parseFloat(item.price) * item.quantity).toFixed(2)} ريال
                              </div>
                              <div className="font-cairo text-sm text-gray-500">
                                {parseFloat(item.price).toFixed(2)} ريال للقطعة
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link href="/menu">
                <Button variant="outline" className="font-cairo border-chicken-orange text-chicken-orange hover:bg-chicken-orange hover:text-white">
                  <i className="fas fa-arrow-right ml-2"></i>
                  متابعة التسوق
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="font-cairo text-xl flex items-center">
                  <i className="fas fa-receipt ml-3 text-chicken-orange"></i>
                  ملخص الطلب
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div>
                  <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                    كود الخصم
                  </label>
                  <div className="flex space-x-2 space-x-reverse">
                    <Input
                      type="text"
                      placeholder="أدخل كود الخصم"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 font-cairo"
                    />
                    <Button variant="outline" className="font-cairo">
                      تطبيق
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between font-cairo">
                    <span className="text-gray-600">المجموع الفرعي:</span>
                    <span className="font-semibold">{subtotal.toFixed(2)} ريال</span>
                  </div>

                  <div className="flex justify-between font-cairo">
                    <span className="text-gray-600">رسوم التوصيل:</span>
                    <span className="font-semibold">{deliveryFee.toFixed(2)} ريال</span>
                  </div>

                  <div className="flex justify-between font-cairo">
                    <span className="text-gray-600">الضريبة (15%):</span>
                    <span className="font-semibold">{tax.toFixed(2)} ريال</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-cairo text-lg font-bold">
                    <span>المجموع الكلي:</span>
                    <span className="text-chicken-orange">{total.toFixed(2)} ريال</span>
                  </div>
                </div>

                <Separator />

                {/* Checkout Button */}
                <Link href="/checkout">
                  <Button className="w-full bg-chicken-orange hover:bg-orange-600 text-white font-cairo py-3 text-lg rounded-lg shadow-lg">
                    <i className="fas fa-credit-card ml-2"></i>
                    إتمام الطلب
                  </Button>
                </Link>

                {/* Security Info */}
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex items-center text-green-700 font-cairo text-sm">
                    <i className="fas fa-shield-alt ml-2"></i>
                    دفع آمن ومشفر 100%
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center text-blue-700 font-cairo text-sm mb-1">
                    <i className="fas fa-truck ml-2"></i>
                    معلومات التوصيل
                  </div>
                  <p className="text-blue-600 font-cairo text-xs">
                    التوصيل خلال 30-45 دقيقة
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}