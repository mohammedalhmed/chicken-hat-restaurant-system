import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { useDynamicColors } from "@/hooks/use-dynamic-colors";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import FileUpload from "@/components/ui/file-upload";
import type { WebsiteSettings, InsertWebsiteSettings } from "@shared/schema";

export default function WebsiteSettings() {
  // Apply dynamic colors globally
  useDynamicColors();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery<WebsiteSettings>({
    queryKey: ["/api/website-settings"],
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (data: Partial<InsertWebsiteSettings>) =>
      apiRequest("PUT", "/api/website-settings", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/website-settings"] });
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث إعدادات الموقع بنجاح",
      });
    },
    onError: (error) => {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء تحديث الإعدادات",
        variant: "destructive",
      });
    },
  });

  const [formData, setFormData] = useState<Partial<InsertWebsiteSettings>>({});

  const handleInputChange = (field: keyof InsertWebsiteSettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await updateSettingsMutation.mutateAsync(formData);
    setFormData({});
  };

  const getCurrentValue = (field: keyof InsertWebsiteSettings) => {
    return formData[field] ?? settings?.[field] ?? '';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-chicken-orange mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل الإعدادات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="website-settings-page">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="bg-chicken-orange text-white p-2 rounded-lg">
                <i className="fas fa-cog text-2xl"></i>
              </div>
              <div>
                <h1 className="font-amiri font-bold text-3xl text-chicken-black" data-testid="page-title">
                  إعدادات الموقع
                </h1>
                <p className="text-gray-600">إدارة شاملة لجميع إعدادات الموقع</p>
              </div>
            </div>
            <div className="flex space-x-4 space-x-reverse">
              <Button
                onClick={handleSave}
                disabled={updateSettingsMutation.isPending || Object.keys(formData).length === 0}
                className="bg-chicken-orange hover:bg-orange-600"
                data-testid="button-save-settings"
              >
                {updateSettingsMutation.isPending ? (
                  <>
                    <i className="fas fa-spinner fa-spin ml-2"></i>
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save ml-2"></i>
                    حفظ التغييرات
                  </>
                )}
              </Button>
              <Link href="/admin">
                <Button variant="outline" data-testid="link-back-admin">
                  <i className="fas fa-arrow-right ml-2"></i>
                  العودة للوحة التحكم
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="colors" className="w-full" data-testid="settings-tabs">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="colors" data-testid="tab-colors">
              <i className="fas fa-palette ml-2"></i>
              الألوان
            </TabsTrigger>
            <TabsTrigger value="branding" data-testid="tab-branding">
              <i className="fas fa-image ml-2"></i>
              الهوية البصرية
            </TabsTrigger>
            <TabsTrigger value="contact" data-testid="tab-contact">
              <i className="fas fa-phone ml-2"></i>
              معلومات التواصل
            </TabsTrigger>
            <TabsTrigger value="content" data-testid="tab-content">
              <i className="fas fa-edit ml-2"></i>
              محتوى الموقع
            </TabsTrigger>
            <TabsTrigger value="delivery" data-testid="tab-delivery">
              <i className="fas fa-truck ml-2"></i>
              التوصيل والأسعار
            </TabsTrigger>
            <TabsTrigger value="features" data-testid="tab-features">
              <i className="fas fa-toggle-on ml-2"></i>
              الميزات
            </TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-6" data-testid="tab-content-colors">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الألوان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">اللون الأساسي</Label>
                    <div className="flex space-x-2 space-x-reverse">
                      <Input
                        id="primary-color"
                        type="color"
                        value={getCurrentValue('primaryColor') as string}
                        onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                        className="w-20 h-10 border-2 border-orange-200 rounded-lg"
                        data-testid="input-primary-color"
                      />
                      <Input
                        type="text"
                        value={getCurrentValue('primaryColor') as string}
                        onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                        placeholder="#FF6B35"
                        className="flex-1 bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                        data-testid="input-primary-color-text"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">اللون الثانوي</Label>
                    <div className="flex space-x-2 space-x-reverse">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={getCurrentValue('secondaryColor') as string}
                        onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                        className="w-20 h-10 border-2 border-orange-200 rounded-lg"
                        data-testid="input-secondary-color"
                      />
                      <Input
                        type="text"
                        value={getCurrentValue('secondaryColor') as string}
                        onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                        placeholder="#FFB800"
                        className="flex-1 bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                        data-testid="input-secondary-color-text"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accent-color">اللون المميز</Label>
                    <div className="flex space-x-2 space-x-reverse">
                      <Input
                        id="accent-color"
                        type="color"
                        value={getCurrentValue('accentColor') as string}
                        onChange={(e) => handleInputChange('accentColor', e.target.value)}
                        className="w-20 h-10 border-2 border-orange-200 rounded-lg"
                        data-testid="input-accent-color"
                      />
                      <Input
                        type="text"
                        value={getCurrentValue('accentColor') as string}
                        onChange={(e) => handleInputChange('accentColor', e.target.value)}
                        placeholder="#1A1A1A"
                        className="flex-1 bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                        data-testid="input-accent-color-text"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="background-color">لون الخلفية</Label>
                    <div className="flex space-x-2 space-x-reverse">
                      <Input
                        id="background-color"
                        type="color"
                        value={getCurrentValue('backgroundColor') as string}
                        onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                        className="w-20 h-10 border-2 border-orange-200 rounded-lg"
                        data-testid="input-background-color"
                      />
                      <Input
                        type="text"
                        value={getCurrentValue('backgroundColor') as string}
                        onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                        placeholder="#FAFAFA"
                        className="flex-1 bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                        data-testid="input-background-color-text"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding Tab */}
          <TabsContent value="branding" className="space-y-6" data-testid="tab-content-branding">
            <Card>
              <CardHeader>
                <CardTitle>الهوية البصرية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="logo-text">نص الشعار</Label>
                  <Input
                    id="logo-text"
                    value={getCurrentValue('logoText') as string}
                    onChange={(e) => handleInputChange('logoText', e.target.value)}
                    placeholder="تشكن هات"
                    data-testid="input-logo-text"
                    className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                  />
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border-2 border-orange-200 shadow-sm">
                  <FileUpload
                    onFileUploaded={(url) => handleInputChange('logoUrl', url)}
                    endpoint="/api/upload/logo"
                    currentImage={getCurrentValue('logoUrl') as string}
                    label="شعار الموقع"
                    accept="image/*"
                  />
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border-2 border-orange-200 shadow-sm">
                  <FileUpload
                    onFileUploaded={(url) => handleInputChange('faviconUrl', url)}
                    endpoint="/api/upload/favicon"
                    currentImage={getCurrentValue('faviconUrl') as string}
                    label="أيقونة الموقع (Favicon)"
                    accept="image/*"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site-title">عنوان الموقع</Label>
                  <Input
                    id="site-title"
                    value={getCurrentValue('siteTitle') as string}
                    onChange={(e) => handleInputChange('siteTitle', e.target.value)}
                    placeholder="تشكن هات - أفضل دجاج مقلي في المملكة"
                    data-testid="input-site-title"
                    className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site-description">وصف الموقع</Label>
                  <Textarea
                    id="site-description"
                    value={getCurrentValue('siteDescription') as string}
                    onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                    placeholder="وصف الموقع لمحركات البحث..."
                    rows={4}
                    data-testid="textarea-site-description"
                    className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site-keywords">الكلمات المفتاحية</Label>
                  <Textarea
                    id="site-keywords"
                    value={getCurrentValue('siteKeywords') as string}
                    onChange={(e) => handleInputChange('siteKeywords', e.target.value)}
                    placeholder="دجاج مقلي, بروستد, مطعم, توصيل, الرياض..."
                    rows={3}
                    data-testid="textarea-site-keywords"
                    className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6" data-testid="tab-content-contact">
            <Card>
              <CardHeader>
                <CardTitle>معلومات التواصل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">رقم الهاتف</Label>
                    <Input
                      id="contact-phone"
                      value={getCurrentValue('contactPhone') as string}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      placeholder="+966501234567"
                      data-testid="input-contact-phone"
                      className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-number">رقم الواتساب</Label>
                    <Input
                      id="whatsapp-number"
                      value={getCurrentValue('whatsappNumber') as string}
                      onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                      placeholder="+966501234567"
                      data-testid="input-whatsapp-number"
                      className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">البريد الإلكتروني</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={getCurrentValue('contactEmail') as string}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="info@chickenhat.com"
                    data-testid="input-contact-email"
                    className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                  />
                </div>

                <Separator />

                <h3 className="text-lg font-semibold">العنوان</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="street-address">الشارع</Label>
                    <Input
                      id="street-address"
                      value={getCurrentValue('streetAddress') as string}
                      onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                      placeholder="شارع الملك عبدالعزيز"
                      data-testid="input-street-address"
                      className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">المدينة</Label>
                    <Input
                      id="city"
                      value={getCurrentValue('city') as string}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="الرياض"
                      data-testid="input-city"
                      className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area">المنطقة</Label>
                    <Input
                      id="area"
                      value={getCurrentValue('area') as string}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      placeholder="الملز"
                      data-testid="input-area"
                      className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postal-code">الرمز البريدي</Label>
                    <Input
                      id="postal-code"
                      value={getCurrentValue('postalCode') as string}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder="12345"
                      data-testid="input-postal-code"
                      className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="map-location">رابط الخريطة</Label>
                  <Textarea
                    id="map-location"
                    value={getCurrentValue('mapLocation') as string}
                    onChange={(e) => handleInputChange('mapLocation', e.target.value)}
                    placeholder="رابط Google Maps embed أو إحداثيات GPS"
                    rows={3}
                    data-testid="textarea-map-location"
                    className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500">
                    يمكنك إدخال رابط Google Maps مباشرة أو إحداثيات GPS بصيغة: latitude,longitude
                  </p>
                </div>

                <Separator />

                <h3 className="text-lg font-semibold">وسائل التواصل الاجتماعي</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="facebook-url">رابط الفيسبوك</Label>
                    <Input
                      id="facebook-url"
                      value={getCurrentValue('facebookUrl') as string}
                      onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                      placeholder="https://facebook.com/chickenhat"
                      data-testid="input-facebook-url"
                      className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram-url">رابط الإنستغرام</Label>
                    <Input
                      id="instagram-url"
                      value={getCurrentValue('instagramUrl') as string}
                      onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                      placeholder="https://instagram.com/chickenhat"
                      data-testid="input-instagram-url"
                      className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter-url">رابط تويتر</Label>
                    <Input
                      id="twitter-url"
                      value={getCurrentValue('twitterUrl') as string}
                      onChange={(e) => handleInputChange('twitterUrl', e.target.value)}
                      placeholder="https://twitter.com/chickenhat"
                      data-testid="input-twitter-url"
                      className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tiktok-url">رابط التيك توك</Label>
                    <Input
                      id="tiktok-url"
                      value={getCurrentValue('tiktokUrl') as string}
                      onChange={(e) => handleInputChange('tiktokUrl', e.target.value)}
                      placeholder="https://tiktok.com/@chickenhat"
                      data-testid="input-tiktok-url"
                      className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6" data-testid="tab-content-content">
            <Card>
              <CardHeader>
                <CardTitle>محتوى الموقع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="hero-title">عنوان القسم الرئيسي</Label>
                  <Input
                    id="hero-title"
                    value={getCurrentValue('heroTitle') as string}
                    onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                    placeholder="وجهتكم الأولى لأشهى أنواع الدجاج المقلي والبروستد"
                    data-testid="input-hero-title"
                    className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero-subtitle">النص التوضيحي الرئيسي</Label>
                  <Textarea
                    id="hero-subtitle"
                    value={getCurrentValue('heroSubtitle') as string}
                    onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                    placeholder="نقدم لكم أجود أنواع الدجاج المقرمش بأفضل المكونات والنكهات الأصيلة..."
                    rows={4}
                    data-testid="textarea-hero-subtitle"
                    className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about-title">عنوان قسم "عنا"</Label>
                  <Input
                    id="about-title"
                    value={getCurrentValue('aboutTitle') as string}
                    onChange={(e) => handleInputChange('aboutTitle', e.target.value)}
                    placeholder="عن تشكن هات"
                    data-testid="input-about-title"
                    className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about-description">وصف قسم "عنا"</Label>
                  <Textarea
                    id="about-description"
                    value={getCurrentValue('aboutDescription') as string}
                    onChange={(e) => handleInputChange('aboutDescription', e.target.value)}
                    placeholder="مطعم تشكن هات هو وجهتكم المفضلة لأشهى أنواع الدجاج المقلي والبروستد..."
                    rows={6}
                    data-testid="textarea-about-description"
                    className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operating-hours">ساعات العمل</Label>
                  <Textarea
                    id="operating-hours"
                    value={getCurrentValue('operatingHours') as string}
                    onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                    placeholder="السبت - الخميس: 10:00 ص - 12:00 م&#10;الجمعة: 2:00 م - 12:00 م"
                    rows={3}
                    data-testid="textarea-operating-hours"
                    className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Tab */}
          <TabsContent value="delivery" className="space-y-6" data-testid="tab-content-delivery">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات التوصيل والأسعار</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="delivery-fee">رسوم التوصيل</Label>
                    <Input
                      id="delivery-fee"
                      type="number"
                      step="0.01"
                      value={getCurrentValue('deliveryFee') as string}
                      onChange={(e) => handleInputChange('deliveryFee', e.target.value)}
                      placeholder="15.00"
                      data-testid="input-delivery-fee"
                      className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="free-delivery-threshold">الحد الأدنى للتوصيل المجاني</Label>
                    <Input
                      id="free-delivery-threshold"
                      type="number"
                      step="0.01"
                      value={getCurrentValue('freeDeliveryThreshold') as string}
                      onChange={(e) => handleInputChange('freeDeliveryThreshold', e.target.value)}
                      placeholder="100.00"
                      data-testid="input-free-delivery-threshold"
                      className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delivery-time">وقت التوصيل المتوقع</Label>
                  <Input
                    id="delivery-time"
                    value={getCurrentValue('deliveryTime') as string}
                    onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                    placeholder="30-45 دقيقة"
                    data-testid="input-delivery-time"
                    className="bg-orange-50/30 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6" data-testid="tab-content-features">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الميزات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>خدمة التوصيل</Label>
                      <p className="text-sm text-muted-foreground">تفعيل أو إيقاف خدمة توصيل الطلبات</p>
                    </div>
                    <Switch
                      checked={getCurrentValue('isDeliveryEnabled') as boolean}
                      onCheckedChange={(checked) => handleInputChange('isDeliveryEnabled', checked)}
                      data-testid="switch-delivery-enabled"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>الاستلام من المطعم</Label>
                      <p className="text-sm text-muted-foreground">السماح للعملاء بالاستلام من المطعم مباشرة</p>
                    </div>
                    <Switch
                      checked={getCurrentValue('isPickupEnabled') as boolean}
                      onCheckedChange={(checked) => handleInputChange('isPickupEnabled', checked)}
                      data-testid="switch-pickup-enabled"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>نظام الحجوزات</Label>
                      <p className="text-sm text-muted-foreground">السماح للعملاء بحجز الطاولات</p>
                    </div>
                    <Switch
                      checked={getCurrentValue('isReservationsEnabled') as boolean}
                      onCheckedChange={(checked) => handleInputChange('isReservationsEnabled', checked)}
                      data-testid="switch-reservations-enabled"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>الدفع الإلكتروني</Label>
                      <p className="text-sm text-muted-foreground">تفعيل الدفع عبر الإنترنت بالإضافة للدفع عند الاستلام</p>
                    </div>
                    <Switch
                      checked={getCurrentValue('isOnlinePaymentEnabled') as boolean}
                      onCheckedChange={(checked) => handleInputChange('isOnlinePaymentEnabled', checked)}
                      data-testid="switch-online-payment-enabled"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}