import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/menu/product-card";
import ProductModal from "@/components/menu/product-modal";
import type { Category, MenuItemWithCategory } from "@shared/schema";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("name");
  const [selectedProduct, setSelectedProduct] = useState<MenuItemWithCategory | null>(null);
  const [displayedItems, setDisplayedItems] = useState(12);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: menuItems = [], isLoading: menuItemsLoading } = useQuery<MenuItemWithCategory[]>({
    queryKey: ["/api/menu-items"],
  });

  // Get all available items
  const availableItems = menuItems.filter(item => item.isAvailable);

  // Filter and sort menu items with live search
  const filteredItems = useMemo(() => {
    return availableItems.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.categoryId === selectedCategory;
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.descriptionAr && item.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPrice = parseFloat(item.price) >= priceRange[0] && parseFloat(item.price) <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "popular":
          // Simulate popularity based on price (lower price = more popular for demo)
          return parseFloat(a.price) - parseFloat(b.price);
        default:
          return a.nameAr.localeCompare(b.nameAr);
      }
    });
  }, [availableItems, selectedCategory, searchQuery, priceRange, sortBy]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayedItems(12); // Reset pagination when filters change
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setPriceRange([0, 200]);
    setSortBy("name");
    setDisplayedItems(12);
  };

  const loadMoreItems = () => {
    setDisplayedItems(prev => prev + 12);
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  const visibleItems = filteredItems.slice(0, displayedItems);
  const hasMoreItems = filteredItems.length > displayedItems;

  if (categoriesLoading || menuItemsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20" dir="rtl">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-chicken-black to-chicken-orange text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-amiri font-bold text-4xl md:text-6xl mb-6">
            قائمة الطعام
          </h1>
          <p className="font-cairo text-xl max-w-3xl mx-auto leading-relaxed">
            اكتشف مجموعتنا المميزة من أشهى الوجبات المحضرة بعناية فائقة
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Filters Section */}
        <Card className="shadow-xl border-0 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Live Search */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                  البحث المباشر
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="ابحث عن وجبة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 font-cairo transition-all duration-300 focus:ring-2 focus:ring-chicken-orange/50"
                    data-testid="input-search"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      data-testid="button-clear-search"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                  الفئة
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg font-cairo focus:border-chicken-orange focus:ring-2 focus:ring-chicken-orange/50 transition-all duration-300"
                  data-testid="select-category"
                >
                  <option value="all">جميع الفئات</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Enhanced Price Range Slider */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                  نطاق السعر: {priceRange[0]} - {priceRange[1]} ريال
                </label>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    min={0}
                    step={5}
                    className="w-full"
                    data-testid="slider-price-range"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1 font-cairo">
                    <span>0 ريال</span>
                    <span>200 ريال</span>
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                  ترتيب حسب
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg font-cairo focus:border-chicken-orange focus:ring-2 focus:ring-chicken-orange/50 transition-all duration-300"
                  data-testid="select-sort"
                >
                  <option value="name">الاسم (أ-ي)</option>
                  <option value="price-low">السعر (أقل إلى أعلى)</option>
                  <option value="price-high">السعر (أعلى إلى أقل)</option>
                  <option value="popular">الأكثر شعبية</option>
                </select>
              </div>
            </div>

            {/* Filter Status and Actions */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-6 pt-6 border-t border-gray-200 gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="font-cairo bg-green-50 text-green-700 border-green-200" data-testid="text-results-count">
                  <i className="fas fa-utensils ml-2"></i>
                  {filteredItems.length} وجبة متاحة
                </Badge>
                {searchQuery && (
                  <Badge variant="outline" className="font-cairo bg-blue-50 text-blue-700 border-blue-200">
                    <i className="fas fa-search ml-2"></i>
                    البحث: "{searchQuery}"
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="outline" className="font-cairo bg-orange-50 text-orange-700 border-orange-200">
                    <i className="fas fa-tag ml-2"></i>
                    {categories.find(c => c.id === selectedCategory)?.nameAr}
                  </Badge>
                )}
              </div>
              
              {(selectedCategory !== "all" || searchQuery || priceRange[0] > 0 || priceRange[1] < 200 || sortBy !== "name") && (
                <Button
                  variant="ghost"
                  onClick={resetFilters}
                  className="text-chicken-orange hover:text-orange-600 hover:bg-orange-50 font-cairo transition-all duration-300"
                  data-testid="button-reset-filters"
                >
                  <i className="fas fa-undo ml-2"></i>
                  إعادة تعيين الفلاتر
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Category Quick Filters */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={`font-cairo rounded-full transition-all duration-300 transform hover:scale-105 shadow-md ${
              selectedCategory === "all"
                ? "bg-chicken-orange text-white shadow-lg"
                : "border-chicken-orange text-chicken-orange hover:bg-chicken-orange hover:text-white"
            }`}
            data-testid="button-category-all"
          >
            <i className="fas fa-utensils ml-2"></i>
            جميع الفئات
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`font-cairo rounded-full transition-all duration-300 transform hover:scale-105 shadow-md ${
                selectedCategory === category.id
                  ? "bg-chicken-orange text-white shadow-lg"
                  : "border-chicken-orange text-chicken-orange hover:bg-chicken-orange hover:text-white"
              }`}
              data-testid={`button-category-${category.id}`}
            >
              <i className="fas fa-drumstick-bite ml-2"></i>
              {category.nameAr}
            </Button>
          ))}
        </div>

        {/* Enhanced Menu Items Grid with Lazy Loading */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <i className="fas fa-search text-gray-400 text-4xl"></i>
            </div>
            <h3 className="font-amiri text-2xl text-gray-700 mb-3 font-bold">
              لم نجد أي وجبات تطابق بحثك
            </h3>
            <p className="font-cairo text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
              جرب تعديل معايير البحث أو تصفح جميع الوجبات المتاحة في قائمتنا
            </p>
            <Button
              onClick={resetFilters}
              className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo px-8 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
              data-testid="button-show-all-items"
            >
              <i className="fas fa-utensils ml-2"></i>
              عرض جميع الوجبات
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {visibleItems.map((item, index) => (
                <div
                  key={item.id}
                  className="transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                  style={{
                    animationDelay: `${index * 80}ms`,
                    animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                  }}
                >
                  <ProductCard
                    item={item}
                    onImageClick={(product) => setSelectedProduct(product)}
                    isFavorite={favorites.has(item.id)}
                    onToggleFavorite={() => toggleFavorite(item.id)}
                  />
                </div>
              ))}
            </div>

            {/* Infinite Scroll / Load More */}
            {hasMoreItems && (
              <div className="text-center">
                <Button
                  onClick={loadMoreItems}
                  variant="outline"
                  className="border-chicken-orange text-chicken-orange hover:bg-chicken-orange hover:text-white font-cairo px-8 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
                  data-testid="button-load-more"
                >
                  <i className="fas fa-plus ml-2"></i>
                  عرض المزيد من الوجبات ({filteredItems.length - displayedItems} متبقية)
                </Button>
              </div>
            )}

            {/* Items Counter */}
            <div className="text-center mt-8 text-gray-500 font-cairo">
              عرض {Math.min(displayedItems, filteredItems.length)} من {filteredItems.length} وجبة
            </div>
          </>
        )}
      </div>

      {/* Enhanced Product Modal */}
      {selectedProduct && (
        <ProductModal
          item={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isFavorite={favorites.has(selectedProduct.id)}
          onToggleFavorite={() => toggleFavorite(selectedProduct.id)}
        />
      )}
    </div>
  );
}