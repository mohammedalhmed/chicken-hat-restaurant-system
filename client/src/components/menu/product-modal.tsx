
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import type { MenuItemWithCategory } from "@shared/schema";

interface ProductModalProps {
  item: MenuItemWithCategory | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export default function ProductModal({ item, isOpen, onClose, isFavorite = false, onToggleFavorite }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setShowSuccess(false);
    }
  }, [isOpen]);

  if (!item) return null;

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: item.id,
          name: item.name,
          nameAr: item.nameAr,
          description: item.description || undefined,
          descriptionAr: item.descriptionAr || undefined,
          price: parseFloat(item.price),
          imageUrl: item.imageUrl || "/placeholder-food.jpg",
        });
      }
      
      setShowSuccess(true);
      toast({
        title: "تم الإضافة بنجاح!",
        description: `تم إضافة ${quantity} من ${item.nameAr} إلى سلة المشتريات`,
        variant: "default",
      });
      
      // Auto close after success
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في إضافة المنتج إلى السلة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = parseFloat(item.price) * quantity;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-white" dir="rtl">
        <DialogHeader className="border-b border-gray-100 pb-4">
          <DialogTitle className="font-amiri text-3xl text-chicken-black flex items-center justify-between">
            <span>{item.nameAr}</span>
            <Badge 
              className={`px-3 py-1 font-cairo text-sm ${
                item.isAvailable 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}
              variant="outline"
            >
              <i className={`fas fa-circle ml-1 text-xs ${item.isAvailable ? 'text-green-500' : 'text-red-500'}`}></i>
              {item.isAvailable ? 'متاح الآن' : 'غير متاح حالياً'}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl">
              <img
                src={item.imageUrl || "/placeholder-food.jpg"}
                alt={item.nameAr}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                data-testid={`img-modal-${item.id}`}
              />
              
              {/* Favorite Button */}
              {onToggleFavorite && (
                <button
                  onClick={onToggleFavorite}
                  className={`absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm shadow-lg ${
                    isFavorite 
                      ? 'bg-red-500 text-white scale-110' 
                      : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white hover:scale-110'
                  }`}
                  data-testid={`button-modal-favorite-${item.id}`}
                >
                  <i className={`fas fa-heart ${isFavorite ? 'animate-pulse' : ''}`}></i>
                </button>
              )}

              {/* Price Tag */}
              <div className="absolute bottom-4 right-4 bg-gradient-to-r from-chicken-orange to-orange-600 text-white px-6 py-3 rounded-full font-cairo font-bold text-xl shadow-xl">
                <i className="fas fa-tag ml-2"></i>
                {parseFloat(item.price).toFixed(0)} ريال
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-chicken-orange px-4 py-2 rounded-full font-cairo font-bold shadow-lg">
                <i className="fas fa-drumstick-bite ml-1"></i>
                {item.category?.nameAr || 'دجاج'}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-cairo font-bold text-xl mb-3 text-chicken-black flex items-center">
                <i className="fas fa-align-right ml-2 text-chicken-orange"></i>
                وصف الوجبة
              </h4>
              <p className="text-gray-700 font-cairo leading-relaxed text-lg">
                {item.descriptionAr || item.description || "وجبة لذيذة ومميزة من مطعم تشكن هات مُعدة بأفضل المكونات الطازجة وأسرار التوابل الخاصة التي تميزنا. تقدم مع الخضروات الطازجة والصلصات المنزلية."}
              </p>
            </div>

            {/* Additional Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Calories */}
              {item.calories && (
                <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
                  <i className="fas fa-fire text-orange-500 text-2xl mb-2"></i>
                  <p className="font-cairo text-gray-600 text-sm">السعرات الحرارية</p>
                  <p className="font-cairo font-bold text-orange-600 text-lg">{item.calories} سعرة</p>
                </div>
              )}

              {/* Preparation Time */}
              <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
                <i className="fas fa-clock text-blue-500 text-2xl mb-2"></i>
                <p className="font-cairo text-gray-600 text-sm">وقت التحضير</p>
                <p className="font-cairo font-bold text-blue-600 text-lg">15-20 دقيقة</p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Quantity Selector */}
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <h4 className="font-cairo font-bold text-lg mb-4 text-chicken-black flex items-center">
                <i className="fas fa-shopping-cart ml-2 text-chicken-orange"></i>
                اختر الكمية
              </h4>
              <div className="flex items-center justify-center space-x-4 space-x-reverse">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-12 h-12 p-0 border-2 border-chicken-orange text-chicken-orange hover:bg-chicken-orange hover:text-white transition-all duration-300"
                  data-testid="button-decrease-quantity"
                >
                  <i className="fas fa-minus"></i>
                </Button>
                
                <div className="bg-gradient-to-r from-chicken-orange to-orange-600 text-white font-cairo font-bold text-2xl px-8 py-4 border-2 rounded-xl min-w-[100px] text-center shadow-lg" data-testid="text-quantity">
                  {quantity}
                </div>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  disabled={quantity >= 10}
                  className="w-12 h-12 p-0 border-2 border-chicken-orange text-chicken-orange hover:bg-chicken-orange hover:text-white transition-all duration-300"
                  data-testid="button-increase-quantity"
                >
                  <i className="fas fa-plus"></i>
                </Button>
              </div>
              {quantity >= 10 && (
                <p className="text-center text-sm text-gray-500 font-cairo mt-2">
                  الحد الأقصى للكمية هو 10 قطع
                </p>
              )}
            </div>

            {/* Total Price */}
            <div className="bg-gradient-to-r from-chicken-orange to-orange-600 p-6 rounded-xl text-white shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-cairo text-orange-100 mb-1">إجمالي السعر</p>
                  <p className="font-amiri font-bold text-3xl" data-testid="text-total-price">
                    {totalPrice.toFixed(0)} ريال
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-cairo text-orange-100 text-sm">
                    {quantity} × {parseFloat(item.price).toFixed(0)} ريال
                  </p>
                  {quantity > 1 && (
                    <p className="font-cairo text-orange-100 text-sm">
                      توفير: {((quantity * parseFloat(item.price)) - totalPrice).toFixed(0)} ريال
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 space-x-reverse">
              <Button
                onClick={handleAddToCart}
                disabled={!item.isAvailable || isLoading || showSuccess}
                className={`flex-1 py-4 text-lg font-cairo transition-all duration-300 transform hover:scale-105 ${
                  showSuccess 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-gradient-to-r from-chicken-orange to-orange-600 hover:from-orange-600 hover:to-chicken-orange'
                } text-white shadow-xl`}
                data-testid="button-modal-add-to-cart"
              >
                {showSuccess ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <i className="fas fa-check text-xl"></i>
                    <span>تم الإضافة بنجاح!</span>
                  </div>
                ) : isLoading ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <i className="fas fa-spinner fa-spin text-xl"></i>
                    <span>جارٍ الإضافة...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <i className="fas fa-cart-plus text-xl"></i>
                    <span>أضف إلى السلة</span>
                  </div>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={onClose}
                className="px-8 py-4 font-cairo border-2 border-gray-300 text-gray-600 hover:bg-gray-50 transition-all duration-300"
                data-testid="button-modal-close"
              >
                <i className="fas fa-times ml-2"></i>
                إغلاق
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
