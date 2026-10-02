import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import MenuGrid from "@/components/menu/menu-grid";
import type { Category } from "@shared/schema";

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-amiri font-bold text-4xl md:text-5xl text-chicken-black mb-6">
            قائمة الطعام
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed font-cairo">
            اكتشف أشهى الوجبات لدينا من الدجاج المقرمش والبروستد والأطباق الجانبية اللذيذة
          </p>
        </div>

        {/* فلتر الفئات */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={`font-cairo px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === "all"
                ? "bg-chicken-orange text-white shadow-lg"
                : "border-chicken-orange text-chicken-orange hover:bg-chicken-orange hover:text-white"
            }`}
          >
            <i className="fas fa-utensils ml-2"></i>
            جميع الفئات
          </Button>

          {categoriesLoading ? (
            <div className="flex items-center space-x-2 space-x-reverse">
              <LoadingSpinner size="sm" />
              <span className="text-gray-500 font-cairo">جارٍ تحميل الفئات...</span>
            </div>
          ) : (
            categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`font-cairo px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-chicken-orange text-white shadow-lg"
                    : "border-chicken-orange text-chicken-orange hover:bg-chicken-orange hover:text-white"
                }`}
              >
                {category.icon && <i className={`${category.icon} ml-2`}></i>}
                {category.name}
              </Button>
            ))
          )}
        </div>

        <div className="w-24 h-1 bg-chicken-orange mx-auto mt-6 mb-8"></div>

        <MenuGrid categoryFilter={selectedCategory} />
      </div>
    </section>
  );
}