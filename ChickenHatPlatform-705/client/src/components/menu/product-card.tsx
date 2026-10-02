
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import type { MenuItemWithCategory } from "@shared/schema";

interface ProductCardProps {
  item: MenuItemWithCategory;
  onImageClick?: (item: MenuItemWithCategory) => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export default function ProductCard({ item, onImageClick, isFavorite = false, onToggleFavorite }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addToCart({
        id: item.id,
        name: item.name,
        nameAr: item.nameAr,
        description: item.description,
        descriptionAr: item.descriptionAr,
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card 
      className="group h-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-chicken-orange/20 bg-white border border-gray-200 relative"
      data-testid={`card-product-${item.id}`}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={item.imageUrl || "/placeholder-food.jpg"}
          alt={item.nameAr}
          className={`w-full h-full object-cover transition-all duration-700 cursor-pointer ${
            imageLoaded 
              ? 'scale-100 opacity-100 group-hover:scale-110' 
              : 'scale-110 opacity-0'
          }`}
          onClick={() => onImageClick?.(item)}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          data-testid={`img-product-${item.id}`}
        />
        
        {/* Loading Shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
        )}
        
        {/* Favorite Heart */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
              isFavorite 
                ? 'bg-red-500 text-white shadow-lg scale-110 animate-pulse' 
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white hover:scale-110'
            }`}
            data-testid={`button-favorite-${item.id}`}
          >
            <i className={`fas fa-heart text-sm transition-transform duration-300 ${isFavorite ? 'scale-110' : ''}`}></i>
          </button>
        )}

        {/* Category Badge */}
        <Badge 
          className="absolute top-3 right-3 bg-gradient-to-r from-chicken-orange to-orange-600 text-white font-cairo shadow-lg transform transition-all duration-300 group-hover:scale-105"
          variant="secondary"
        >
          <i className="fas fa-drumstick-bite ml-1 text-xs"></i>
          {item.category?.nameAr || 'دجاج'}
        </Badge>

        {/* Availability Status */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
            <Badge variant="destructive" className="font-cairo text-lg px-6 py-3 shadow-xl">
              <i className="fas fa-times-circle ml-2"></i>
              غير متاح حالياً
            </Badge>
          </div>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-3 right-3 bg-gradient-to-r from-chicken-orange to-orange-600 text-white px-4 py-2 rounded-full font-cairo font-bold shadow-xl transform transition-all duration-300 group-hover:scale-105">
          <i className="fas fa-tag ml-1 text-xs"></i>
          {parseFloat(item.price).toFixed(0)} ريال
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-4">
          <Button
            onClick={() => onImageClick?.(item)}
            variant="outline"
            size="sm"
            className="bg-white/90 border-white text-chicken-orange hover:bg-white hover:text-orange-600 font-cairo backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            <i className="fas fa-eye ml-1"></i>
            عرض التفاصيل
          </Button>
        </div>
      </div>
      
      <CardContent className="p-5 flex flex-col h-full relative">
        <div className="flex-1 space-y-3">
          {/* Item Name */}
          <h3 className="font-cairo font-bold text-lg text-chicken-black line-clamp-1 group-hover:text-chicken-orange transition-colors duration-300" data-testid={`text-name-${item.id}`}>
            {item.nameAr}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm font-cairo line-clamp-2 leading-relaxed" data-testid={`text-description-${item.id}`}>
            {item.descriptionAr || item.description || "وجبة لذيذة ومميزة من مطعم تشكن هات محضرة بأفضل المكونات الطازجة"}
          </p>

          {/* Additional Info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            {/* Calories */}
            {item.calories && (
              <div className="flex items-center space-x-1 space-x-reverse font-cairo">
                <i className="fas fa-fire text-orange-500"></i>
                <span>{item.calories} سعرة</span>
              </div>
            )}
            
            {/* Availability Indicator */}
            <div className="flex items-center space-x-1 space-x-reverse font-cairo">
              <i className={`fas fa-circle text-xs ${item.isAvailable ? 'text-green-500' : 'text-red-500'}`}></i>
              <span>{item.isAvailable ? 'متاح' : 'غير متاح'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 space-x-reverse">
            {/* Quick View Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onImageClick?.(item)}
              className="border-chicken-orange text-chicken-orange hover:bg-chicken-orange hover:text-white transition-all duration-300 font-cairo px-3 py-1.5"
              data-testid={`button-details-${item.id}`}
            >
              <i className="fas fa-search-plus text-xs ml-1"></i>
              تفاصيل
            </Button>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!item.isAvailable || isLoading}
            className={`
              transition-all duration-300 transform hover:scale-105 shadow-md font-cairo px-4 py-1.5
              ${item.isAvailable 
                ? 'bg-gradient-to-r from-chicken-orange to-orange-600 hover:from-orange-600 hover:to-chicken-orange text-white shadow-chicken-orange/25' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
            size="sm"
            data-testid={`button-add-cart-${item.id}`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-1 space-x-reverse">
                <i className="fas fa-spinner fa-spin text-xs"></i>
                <span className="text-xs">إضافة...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 space-x-reverse">
                <i className="fas fa-cart-plus text-xs"></i>
                <span className="text-xs">أضف للسلة</span>
              </div>
            )}
          </Button>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse text-chicken-orange">
              <i className="fas fa-spinner fa-spin"></i>
              <span className="font-cairo">جارٍ الإضافة...</span>
            </div>
          </div>
        )}

        {/* Success Animation */}
        <div className="absolute inset-0 bg-green-500/10 rounded-lg opacity-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none" id={`success-${item.id}`}>
          <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center">
            <i className="fas fa-check text-2xl"></i>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
