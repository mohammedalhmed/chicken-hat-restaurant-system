import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import ProductModal from "./product-modal";
import MenuCategory from "./menu-category";
import type { MenuItemWithCategory } from "@shared/schema";

interface MenuGridProps {
  selectedCategory?: string;
}

export default function MenuGrid({ selectedCategory = "all" }: MenuGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<MenuItemWithCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: menuItems = [], isLoading } = useQuery<MenuItemWithCategory[]>({
    queryKey: ["/api/menu-items"],
    queryFn: async () => {
      const response = await fetch("/api/menu-items");
      if (!response.ok) {
        console.error('Failed to fetch menu items:', response.statusText);
        throw new Error('Failed to fetch menu items');
      }
      const data = await response.json();
      // Ensure data is an array and handle potential empty responses gracefully
      return Array.isArray(data) ? data : [];
    },
  });

  const handleProductClick = (item: MenuItemWithCategory) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-500 font-cairo">جارٍ تحميل القائمة...</p>
      </div>
    );
  }

  // Filter items based on selected category
  const filteredItems = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.categoryId === selectedCategory);

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-utensils text-3xl text-gray-400"></i>
        </div>
        <h3 className="text-xl font-bold text-gray-700 mb-2 font-amiri">
          لا توجد وجبات متاحة
        </h3>
        <p className="text-gray-500 font-cairo">
          {selectedCategory === "all" 
            ? "لم يتم العثور على أي وجبات في القائمة" 
            : "لا توجد وجبات متاحة في هذه الفئة حالياً"}
        </p>
      </div>
    );
  }

  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    const categoryName = item.category?.name || "غير مصنف";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {} as Record<string, MenuItemWithCategory[]>);

  return (
    <>
      <div className="space-y-12">
        {Object.entries(groupedItems).map(([categoryName, items]) => (
          <MenuCategory
            key={categoryName}
            categoryName={categoryName}
            items={items}
            onProductClick={handleProductClick}
          />
        ))}
      </div>

      <ProductModal
        item={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
}