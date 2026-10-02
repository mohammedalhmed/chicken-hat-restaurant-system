import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Data
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    phone: "",
    city: "",
    area: "",
    street: "",
    building: "",
    apartment: "",
    additionalDetails: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [orderNotes, setOrderNotes] = useState("");

  const deliveryFee = 10;
  const tax = getTotalPrice() * 0.15;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee + tax;

  const steps = [
    { id: 1, title: "معلومات التوصيل", icon: "fas fa-map-marker-alt" },
    { id: 2, title: "طريقة الدفع", icon: "fas fa-credit-card" },
    { id: 3, title: "مراجعة الطلب", icon: "fas fa-check-circle" }
  ];

  const handleSubmitDeliveryInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryInfo.fullName || !deliveryInfo.phone || !deliveryInfo.city || !deliveryInfo.area || !deliveryInfo.street) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(2);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handleConfirmOrder = async () => {
    setIsProcessing(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and redirect
      clearCart();
      toast({
        title: "تم تأكيد الطلب بنجاح!",
        description: "سيتم التواصل معك قريباً لتأكيد التوصيل",
      });

      setLocation("/");
    } catch (error) {
      toast({
        title: "خطأ في معالجة الطلب",
        description: "حدث خطأ، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20" dir="rtl">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="font-amiri text-3xl font-bold text-chicken-black mb-4">
            لا توجد عناصر للطلب
          </h2>
          <Link href="/menu">
            <Button className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo">
              العودة إلى القائمة
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-amiri text-4xl font-bold text-chicken-black mb-4">
            إتمام الطلب
          </h1>

          {/* Steps Progress */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-chicken-orange border-chicken-orange text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  <i className={`${step.icon} text-lg`}></i>
                </div>
                <div className="mr-3 ml-6">
                  <div className={`font-cairo font-semibold ${
                    currentStep >= step.id ? 'text-chicken-orange' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ${
                    currentStep > step.id ? 'bg-chicken-orange' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Delivery Information */}
            {currentStep === 1 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-cairo text-xl flex items-center">
                    <i className="fas fa-map-marker-alt ml-3 text-chicken-orange"></i>
                    معلومات التوصيل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitDeliveryInfo} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-cairo text-gray-700">الاسم الكامل *</Label>
                        <Input
                          type="text"
                          value={deliveryInfo.fullName}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, fullName: e.target.value})}
                          className="font-cairo"
                          placeholder="أدخل اسمك الكامل"
                          required
                        />
                      </div>
                      <div>
                        <Label className="font-cairo text-gray-700">رقم الهاتف *</Label>
                        <Input
                          type="tel"
                          value={deliveryInfo.phone}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                          className="font-cairo"
                          placeholder="05xxxxxxxx"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-cairo text-gray-700">المدينة *</Label>
                        <Input
                          type="text"
                          value={deliveryInfo.city}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                          className="font-cairo"
                          placeholder="اختر المدينة"
                          required
                        />
                      </div>
                      <div>
                        <Label className="font-cairo text-gray-700">المنطقة/الحي *</Label>
                        <Input
                          type="text"
                          value={deliveryInfo.area}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, area: e.target.value})}
                          className="font-cairo"
                          placeholder="اختر المنطقة"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="font-cairo text-gray-700">الشارع ورقم المبنى *</Label>
                      <Input
                        type="text"
                        value={deliveryInfo.street}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, street: e.target.value})}
                        className="font-cairo"
                        placeholder="اسم الشارع ورقم المبنى"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-cairo text-gray-700">رقم الشقة</Label>
                        <Input
                          type="text"
                          value={deliveryInfo.apartment}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, apartment: e.target.value})}
                          className="font-cairo"
                          placeholder="رقم الشقة (اختياري)"
                        />
                      </div>
                      <div>
                        <Label className="font-cairo text-gray-700">رقم المبنى</Label>
                        <Input
                          type="text"
                          value={deliveryInfo.building}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, building: e.target.value})}
                          className="font-cairo"
                          placeholder="رقم المبنى"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="font-cairo text-gray-700">تفاصيل إضافية</Label>
                      <Textarea
                        value={deliveryInfo.additionalDetails}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, additionalDetails: e.target.value})}
                        className="font-cairo"
                        placeholder="علامات مميزة، ملاحظات للسائق..."
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-chicken-orange hover:bg-orange-600 text-white font-cairo py-3">
                      متابعة إلى طريقة الدفع
                      <i className="fas fa-arrow-left mr-2"></i>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-cairo text-xl flex items-center">
                    <i className="fas fa-credit-card ml-3 text-chicken-orange"></i>
                    طريقة الدفع
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitPayment} className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 space-x-reverse p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label htmlFor="cash" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <i className="fas fa-money-bill-wave text-green-600 ml-3 text-xl"></i>
                                <div>
                                  <div className="font-cairo font-semibold">الدفع نقداً عند الاستلام</div>
                                  <div className="font-cairo text-sm text-gray-600">ادفع للسائق عند وصول الطلب</div>
                                </div>
                              </div>
                              <Badge variant="outline" className="font-cairo">مجاني</Badge>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3 space-x-reverse p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="online" id="online" />
                          <Label htmlFor="online" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <i className="fas fa-credit-card text-blue-600 ml-3 text-xl"></i>
                                <div>
                                  <div className="font-cairo font-semibold">الدفع الإلكتروني</div>
                                  <div className="font-cairo text-sm text-gray-600">فيزا، ماستركارد، مدى</div>
                                </div>
                              </div>
                              <Badge className="font-cairo bg-green-100 text-green-800">آمن</Badge>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    <div>
                      <Label className="font-cairo text-gray-700">ملاحظات خاصة بالطلب</Label>
                      <Textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        className="font-cairo"
                        placeholder="أي طلبات خاصة أو ملاحظات للمطعم..."
                        rows={3}
                      />
                    </div>

                    <div className="flex space-x-4 space-x-reverse">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 font-cairo"
                      >
                        <i className="fas fa-arrow-right ml-2"></i>
                        العودة
                      </Button>
                      <Button type="submit" className="flex-1 bg-chicken-orange hover:bg-orange-600 text-white font-cairo">
                        مراجعة الطلب
                        <i className="fas fa-arrow-left mr-2"></i>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Delivery Info Review */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-cairo text-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <i className="fas fa-map-marker-alt ml-3 text-chicken-orange"></i>
                        معلومات التوصيل
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="text-chicken-orange">
                        تعديل
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 font-cairo">
                      <p><strong>الاسم:</strong> {deliveryInfo.fullName}</p>
                      <p><strong>الهاتف:</strong> {deliveryInfo.phone}</p>
                      <p><strong>العنوان:</strong> {deliveryInfo.street}, {deliveryInfo.area}, {deliveryInfo.city}</p>
                      {deliveryInfo.apartment && <p><strong>الشقة:</strong> {deliveryInfo.apartment}</p>}
                      {deliveryInfo.additionalDetails && <p><strong>تفاصيل إضافية:</strong> {deliveryInfo.additionalDetails}</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method Review */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-cairo text-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <i className="fas fa-credit-card ml-3 text-chicken-orange"></i>
                        طريقة الدفع
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)} className="text-chicken-orange">
                        تعديل
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="font-cairo">
                      {paymentMethod === 'cash' ? (
                        <div className="flex items-center">
                          <i className="fas fa-money-bill-wave text-green-600 ml-2"></i>
                          الدفع نقداً عند الاستلام
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <i className="fas fa-credit-card text-blue-600 ml-2"></i>
                          الدفع الإلكتروني
                        </div>
                      )}
                      {orderNotes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <strong>ملاحظات:</strong> {orderNotes}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Confirm Order */}
                <Card className="shadow-lg">
                  <CardContent className="pt-6">
                    <Button 
                      onClick={handleConfirmOrder}
                      disabled={isProcessing}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-cairo py-4 text-lg"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                          جارٍ معالجة الطلب...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <i className="fas fa-check-circle ml-2"></i>
                          تأكيد الطلب والدفع
                        </div>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="font-cairo text-xl flex items-center">
                  <i className="fas fa-receipt ml-3 text-chicken-orange"></i>
                  ملخص الطلب
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.id}-${JSON.stringify(item.customizations)}`} className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.nameAr} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="fas fa-utensils text-gray-400"></i>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-cairo font-semibold text-sm text-gray-900 truncate">{item.nameAr}</p>
                        <p className="font-cairo text-xs text-gray-500">الكمية: {item.quantity}</p>
                      </div>
                      <div className="text-left">
                        <p className="font-cairo font-semibold text-sm text-chicken-orange">
                          {(parseFloat(item.price) * item.quantity).toFixed(2)} ريال
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between font-cairo text-sm">
                    <span className="text-gray-600">المجموع الفرعي:</span>
                    <span>{subtotal.toFixed(2)} ريال</span>
                  </div>
                  <div className="flex justify-between font-cairo text-sm">
                    <span className="text-gray-600">رسوم التوصيل:</span>
                    <span>{deliveryFee.toFixed(2)} ريال</span>
                  </div>
                  <div className="flex justify-between font-cairo text-sm">
                    <span className="text-gray-600">الضريبة:</span>
                    <span>{tax.toFixed(2)} ريال</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-cairo text-lg font-bold">
                    <span>المجموع الكلي:</span>
                    <span className="text-chicken-orange">{total.toFixed(2)} ريال</span>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center text-blue-700 font-cairo text-sm">
                    <i className="fas fa-clock ml-2"></i>
                    وقت التوصيل المتوقع: 30-45 دقيقة
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}