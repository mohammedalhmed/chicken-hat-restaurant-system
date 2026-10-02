import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LocationPicker } from "@/components/ui/location-picker";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import CartItemComponent from "./cart-item";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart, getTotalItems } = useCart();
  const { toast } = useToast();
  const [showCheckout, setShowCheckout] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      await apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: () => {
      toast({ title: "تم تقديم الطلب بنجاح!", description: "سيتم التواصل معكم قريباً" });
      clearCart();
      setShowCheckout(false);
      onClose();
    },
    onError: () => {
      toast({ title: "خطأ في تقديم الطلب", variant: "destructive" });
    },
  });

  const handleLocationSelect = (location: LocationData) => {
    setCurrentLocation(location);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const orderData = {
      guestName: formData.get("guestName") as string,
      guestPhone: formData.get("guestPhone") as string,
      guestEmail: formData.get("guestEmail") as string,
      street: useCurrentLocation && currentLocation
        ? (currentLocation.address || "موقع جغرافي محدد")
        : (formData.get("street") as string),
      city: useCurrentLocation ? "موقع جغرافي" : (formData.get("city") as string),
      area: useCurrentLocation ? "موقع جغرافي" : (formData.get("area") as string),
      buildingNumber: formData.get("buildingNumber") as string,
      apartmentNumber: formData.get("apartmentNumber") as string,
      addressDetails: formData.get("addressDetails") as string,
      latitude: useCurrentLocation && currentLocation ? currentLocation.latitude.toString() : undefined,
      longitude: useCurrentLocation && currentLocation ? currentLocation.longitude.toString() : undefined,
      paymentMethod: formData.get("paymentMethod") as string,
      notes: formData.get("notes") as string,
      totalAmount: getTotalPrice().toFixed(2),
      items: items.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
        priceAtOrder: item.price.toFixed(2),
      })),
    };

    createOrderMutation.mutate(orderData);
  };

  if (!isOpen) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full max-w-md flex flex-col">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-right font-amiri text-xl text-chicken-black">
            <i className="fas fa-shopping-cart ml-2"></i>
            سلة المشتريات ({getTotalItems()})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <i className="fas fa-shopping-cart text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2 font-amiri">
                السلة فارغة
              </h3>
              <p className="text-gray-500 mb-6 font-cairo">
                أضف بعض الوجبات اللذيذة إلى سلتك
              </p>
              <Button
                onClick={onClose}
                className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo"
              >
                <i className="fas fa-utensils ml-2"></i>
                تصفح القائمة
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              {items.map((item) => (
                <CartItemComponent key={`${item.id}-${Math.random()}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 mt-4 space-y-4">
            {/* ملخص الطلب */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-cairo text-gray-600">المجموع الفرعي:</span>
                <span className="font-amiri font-semibold">
                  {getTotalPrice()} ريال
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-cairo text-gray-600">رسوم التوصيل:</span>
                <span className="font-amiri font-semibold text-green-600">
                  مجاني
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="font-cairo">المجموع الكلي:</span>
                <span className="font-amiri text-chicken-orange">
                  {getTotalPrice()} ريال
                </span>
              </div>
            </div>

            {/* أزرار الإجراءات */}
            <div className="space-y-3">
              <Button className="w-full bg-chicken-orange hover:bg-orange-600 text-white font-cairo py-3 text-lg" onClick={() => setShowCheckout(true)}>
                <i className="fas fa-credit-card ml-2"></i>
                إتمام الطلب
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="font-cairo border-chicken-orange text-chicken-orange hover:bg-chicken-orange hover:text-white"
                >
                  <i className="fas fa-arrow-right ml-1 text-xs"></i>
                  متابعة التسوق
                </Button>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="font-cairo text-red-600 border-red-200 hover:bg-red-50"
                >
                  <i className="fas fa-trash ml-1 text-xs"></i>
                  إفراغ السلة
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}