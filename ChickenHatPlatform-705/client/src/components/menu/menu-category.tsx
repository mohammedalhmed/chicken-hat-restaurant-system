
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "./product-card";
import type { MenuItemWithCategory } from "@shared/schema";

interface MenuCategoryProps {
  categoryName: string;
  items: MenuItemWithCategory[];
  onProductClick?: (item: MenuItemWithCategory) => void;
}

export default function MenuCategory({ categoryName, items, onProductClick }: MenuCategoryProps) {
  const [showAll, setShowAll] = useState(false);
  const displayItems = showAll ? items : items.slice(0, 6);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      {/* عنوان الفئة */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-1 h-8 bg-chicken-orange rounded-full"></div>
          <h2 className="font-amiri font-bold text-3xl text-chicken-black">
            {categoryName}
          </h2>
          <span className="bg-chicken-gold text-chicken-black px-3 py-1 rounded-full text-sm font-bold font-cairo">
            {items.length} منتج
          </span>
        </div>
        
        {items.length > 6 && (
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="border-chicken-orange text-chicken-orange hover:bg-chicken-orange hover:text-white font-cairo"
          >
            {showAll ? (
              <>
                <i className="fas fa-chevron-up ml-2"></i>
                عرض أقل
              </>
            ) : (
              <>
                <i className="fas fa-chevron-down ml-2"></i>
                عرض المزيد ({items.length - 6})
              </>
            )}
          </Button>
        )}
      </div>

      {/* شبكة المنتجات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayItems.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onImageClick={onProductClick}
          />
        ))}
      </div>

      {/* زر عرض المزيد للهواتف */}
      {items.length > 6 && !showAll && (
        <div className="text-center mt-6 md:hidden">
          <Button
            onClick={() => setShowAll(true)}
            className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo px-8 py-3"
          >
            <i className="fas fa-chevron-down ml-2"></i>
            عرض جميع منتجات {categoryName} ({items.length - 6} المزيد)
          </Button>
        </div>
      )}
    </div>
  );
}
