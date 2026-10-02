
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import type { CartItem } from "@/lib/cart";

interface CartItemProps {
  item: CartItem;
}

export default function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 space-x-reverse py-4 border-b border-gray-200 last:border-b-0">
      {/* صورة المنتج */}
      <div className="flex-shrink-0">
        <img
          src={item.image || "/placeholder-food.jpg"}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
      </div>

      {/* تفاصيل المنتج */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-chicken-black font-cairo truncate">
          {item.name}
        </h4>
        <p className="text-xs text-gray-500 font-cairo">
          {item.category}
        </p>
        <p className="text-sm font-bold text-chicken-orange font-amiri">
          {item.price.toFixed(2)} ريال
        </p>
      </div>

      {/* أدوات التحكم في الكمية */}
      <div className="flex items-center space-x-2 space-x-reverse">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          <i className="fas fa-minus text-xs"></i>
        </Button>
        
        <span className="w-8 text-center text-sm font-semibold">
          {item.quantity}
        </span>
        
        <Button
          variant="outline" 
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          <i className="fas fa-plus text-xs"></i>
        </Button>
      </div>

      {/* السعر الإجمالي وزر الحذف */}
      <div className="flex flex-col items-end space-y-2">
        <span className="text-sm font-bold text-chicken-black font-amiri">
          {(item.price * item.quantity).toFixed(2)} ريال
        </span>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => removeItem(item.id)}
        >
          <i className="fas fa-trash text-xs"></i>
        </Button>
      </div>
    </div>
  );
}
