
import { fileStorage } from './file-storage';

async function initializeMenuItems() {
  const categories = await fileStorage.getAllCategories();
  const menuItems = await fileStorage.getAllMenuItems();

  // Only initialize if no menu items exist
  if (menuItems.length > 0) {
    console.log('Menu items already exist, skipping initialization');
    return;
  }

  const friedChickenCategory = categories.find(cat => cat.nameAr === 'دجاج مقلي');
  const broastedCategory = categories.find(cat => cat.nameAr === 'دجاج بروستد');
  const sidesCategory = categories.find(cat => cat.nameAr === 'الأطباق الجانبية');
  const beveragesCategory = categories.find(cat => cat.nameAr === 'المشروبات');

  if (!friedChickenCategory || !broastedCategory || !sidesCategory || !beveragesCategory) {
    console.log('Categories not found, cannot initialize menu items');
    return;
  }

  const sampleMenuItems = [
    // Fried Chicken
    {
      name: 'Original Fried Chicken',
      nameAr: 'دجاج مقلي أصلي',
      description: 'Crispy golden fried chicken with our secret spice blend',
      descriptionAr: 'دجاج مقلي ذهبي مقرمش بخلطة التوابل السرية',
      price: '25.00',
      categoryId: friedChickenCategory.id,
      imageUrl: null,
      isAvailable: true,
      calories: 350,
    },
    {
      name: 'Spicy Fried Chicken',
      nameAr: 'دجاج مقلي حار',
      description: 'Fiery hot fried chicken for spice lovers',
      descriptionAr: 'دجاج مقلي حار لمحبي الطعم الحار',
      price: '27.00',
      categoryId: friedChickenCategory.id,
      imageUrl: null,
      isAvailable: true,
      calories: 360,
    },
    // Broasted Chicken
    {
      name: 'Classic Broasted',
      nameAr: 'بروستد كلاسيكي',
      description: 'Tender broasted chicken with herbs and spices',
      descriptionAr: 'دجاج بروستد طري بالأعشاب والتوابل',
      price: '30.00',
      categoryId: broastedCategory.id,
      imageUrl: null,
      isAvailable: true,
      calories: 320,
    },
    {
      name: 'Family Broasted Meal',
      nameAr: 'وجبة بروستد عائلية',
      description: 'Perfect for sharing - 8 pieces of broasted chicken',
      descriptionAr: 'مثالية للمشاركة - 8 قطع دجاج بروستد',
      price: '85.00',
      categoryId: broastedCategory.id,
      imageUrl: null,
      isAvailable: true,
      calories: 1200,
    },
    // Sides
    {
      name: 'French Fries',
      nameAr: 'بطاطس مقلية',
      description: 'Golden crispy french fries',
      descriptionAr: 'بطاطس مقلية ذهبية مقرمشة',
      price: '12.00',
      categoryId: sidesCategory.id,
      imageUrl: null,
      isAvailable: true,
      calories: 280,
    },
    {
      name: 'Coleslaw',
      nameAr: 'سلطة كولسلو',
      description: 'Fresh and creamy coleslaw salad',
      descriptionAr: 'سلطة كولسلو طازجة وكريمية',
      price: '10.00',
      categoryId: sidesCategory.id,
      imageUrl: null,
      isAvailable: true,
      calories: 150,
    },
    // Beverages
    {
      name: 'Coca Cola',
      nameAr: 'كوكا كولا',
      description: 'Classic Coca Cola soft drink',
      descriptionAr: 'مشروب كوكا كولا الكلاسيكي',
      price: '5.00',
      categoryId: beveragesCategory.id,
      imageUrl: null,
      isAvailable: true,
      calories: 140,
    },
    {
      name: 'Fresh Orange Juice',
      nameAr: 'عصير برتقال طازج',
      description: 'Freshly squeezed orange juice',
      descriptionAr: 'عصير برتقال طازج معصور',
      price: '8.00',
      categoryId: beveragesCategory.id,
      imageUrl: null,
      isAvailable: true,
      calories: 110,
    },
  ];

  console.log('Initializing menu items...');
  for (const itemData of sampleMenuItems) {
    await fileStorage.createMenuItem(itemData);
  }
  console.log('Menu items initialized successfully');
}

// Export for use in server startup
export { initializeMenuItems };
