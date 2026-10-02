import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type {
  User,
  InsertUser,
  Address,
  InsertAddress,
  Category,
  InsertCategory,
  MenuItem,
  InsertMenuItem,
  MenuItemWithCategory,
  Order,
  InsertOrder,
  OrderItem,
  InsertOrderItem,
  OrderWithItems,
  Reservation,
  InsertReservation,
  WebsiteSettings,
  InsertWebsiteSettings,
} from "@shared/schema";

// Define data directory structure
const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

// File paths for different data types
const FILES = {
  users: path.join(DATA_DIR, 'users.json'),
  addresses: path.join(DATA_DIR, 'addresses.json'),
  categories: path.join(DATA_DIR, 'categories.json'),
  menuItems: path.join(DATA_DIR, 'menu-items.json'),
  orders: path.join(DATA_DIR, 'orders.json'),
  orderItems: path.join(DATA_DIR, 'order-items.json'),
  reservations: path.join(DATA_DIR, 'reservations.json'),
  websiteSettings: path.join(DATA_DIR, 'website-settings.json'),
};

// Ensure directories exist
async function ensureDirectories() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await fs.mkdir(path.join(UPLOADS_DIR, 'menu-items'), { recursive: true });
  await fs.mkdir(path.join(UPLOADS_DIR, 'logos'), { recursive: true });
  await fs.mkdir(path.join(UPLOADS_DIR, 'favicons'), { recursive: true });
  await fs.mkdir(path.join(UPLOADS_DIR, 'website'), { recursive: true });
  await fs.mkdir(path.join(UPLOADS_DIR, 'general'), { recursive: true });
}

// Generic file operations
async function readFile<T>(filePath: string): Promise<T[]> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

async function writeFile<T>(filePath: string, data: T[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export class FileStorage {
  constructor() {
    this.initialize();
  }

  private async initialize() {
    await ensureDirectories();
    await this.initializeDefaultData();
  }

  private async initializeDefaultData() {
    // Initialize default categories if they don't exist
    const categories = await readFile<Category>(FILES.categories);
    if (categories.length === 0) {
      const defaultCategories: Category[] = [
        {
          id: uuidv4(),
          name: 'Fried Chicken',
          nameAr: 'دجاج مقلي',
          description: 'Crispy fried chicken pieces',
          orderIndex: 1,
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'Broasted Chicken',
          nameAr: 'دجاج بروستد',
          description: 'Tender broasted chicken',
          orderIndex: 2,
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'Sides',
          nameAr: 'الأطباق الجانبية',
          description: 'Delicious side dishes',
          orderIndex: 3,
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'Beverages',
          nameAr: 'المشروبات',
          description: 'Refreshing drinks',
          orderIndex: 4,
          createdAt: new Date(),
        },
      ];
      await writeFile(FILES.categories, defaultCategories);
    }

    // Initialize default website settings if they don't exist
    const settings = await readFile<WebsiteSettings>(FILES.websiteSettings);
    if (settings.length === 0) {
      const defaultSettings: WebsiteSettings = {
        id: uuidv4(),
        primaryColor: '#FF6B35',
        secondaryColor: '#FFB800',
        accentColor: '#1A1A1A',
        backgroundColor: '#FAFAFA',
        logoUrl: null,
        logoText: 'تشكن هات',
        faviconUrl: null,
        contactPhone: '+966501234567',
        contactEmail: 'info@chickenhat.com',
        whatsappNumber: '+966501234567',
        streetAddress: 'شارع القاهرة',
        city: 'صنعاء',
        area: 'اليمن',
        postalCode: '12345',
        mapLocation: null,
        facebookUrl: null,
        instagramUrl: null,
        twitterUrl: null,
        tiktokUrl: null,
        heroTitle: 'وجهتكم الأولى لأشهى أنواع الدجاج المقلي والبروستد',
        heroSubtitle: 'نقدم لكم أجود أنواع الدجاج المقرمش بأفضل المكونات والنكهات الأصيلة\nمع خدمة توصيل سريعة وجودة لا تُضاهى',
        aboutTitle: 'عن تشكن هات',
        aboutDescription: 'مطعم تشكن هات هو وجهتكم المفضلة لأشهى أنواع الدجاج المقلي والبروستد. نحن نفخر بتقديم أجود أنواع الدجاج الطازج المتبل بأفضل الخلطات والتوابل السرية التي تميزنا عن غيرنا.',
        operatingHours: 'السبت - الخميس: 10:00 ص - 12:00 م\nالجمعة: 2:00 م - 12:00 م',
        deliveryFee: '15.00',
        freeDeliveryThreshold: '100.00',
        deliveryTime: '30-45 دقيقة',
        isDeliveryEnabled: true,
        isPickupEnabled: true,
        isReservationsEnabled: true,
        isOnlinePaymentEnabled: true,
        siteTitle: 'تشكن هات - أفضل دجاج مقلي في المملكة',
        siteDescription: 'تشكن هات - مطعم متخصص في الدجاج المقلي والبروستد بأجود أنواع التوابل والنكهات. اطلب الآن واستمتع بطعم لا يُنسى مع توصيل مجاني.',
        siteKeywords: 'دجاج مقلي, بروستد, مطعم, توصيل, الرياض, طعام سريع',
        createdAt: new Date(),
        updatedAt: null,
      };
      await writeFile(FILES.websiteSettings, [defaultSettings]);
    }
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const users = await readFile<User>(FILES.users);
    return users.find(user => user.id === id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const users = await readFile<User>(FILES.users);
    return users.find(user => user.email === email);
  }

  async createUser(userData: InsertUser): Promise<User> {
    const users = await readFile<User>(FILES.users);
    const newUser: User = {
      id: uuidv4(),
      ...userData,
      createdAt: new Date(),
      updatedAt: null,
    };
    users.push(newUser);
    await writeFile(FILES.users, users);
    return newUser;
  }

  // Address operations
  async getUserAddresses(userId: string): Promise<Address[]> {
    const addresses = await readFile<Address>(FILES.addresses);
    return addresses.filter(address => address.userId === userId);
  }

  async createAddress(addressData: InsertAddress): Promise<Address> {
    const addresses = await readFile<Address>(FILES.addresses);
    const newAddress: Address = {
      id: uuidv4(),
      ...addressData,
      createdAt: new Date(),
      updatedAt: null,
    };
    addresses.push(newAddress);
    await writeFile(FILES.addresses, addresses);
    return newAddress;
  }

  // Category operations
  async getAllCategories(): Promise<Category[]> {
    const categories = await readFile<Category>(FILES.categories);
    return categories.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
  }

  async createCategory(categoryData: InsertCategory): Promise<Category> {
    const categories = await readFile<Category>(FILES.categories);
    const newCategory: Category = {
      id: uuidv4(),
      ...categoryData,
      createdAt: new Date(),
    };
    categories.push(newCategory);
    await writeFile(FILES.categories, categories);
    return newCategory;
  }

  async updateCategory(id: string, categoryUpdate: Partial<Category>): Promise<Category> {
    const categories = await readFile<Category>(FILES.categories);
    const index = categories.findIndex(cat => cat.id === id);
    if (index === -1) throw new Error('Category not found');

    categories[index] = { ...categories[index], ...categoryUpdate };
    await writeFile(FILES.categories, categories);
    return categories[index];
  }

  async deleteCategory(id: string): Promise<void> {
    const categories = await readFile<Category>(FILES.categories);
    const filtered = categories.filter(cat => cat.id !== id);
    await writeFile(FILES.categories, filtered);
  }

  // Menu item operations
  async getAllMenuItems(): Promise<MenuItemWithCategory[]> {
    const menuItems = await readFile<MenuItem>(FILES.menuItems);
    const categories = await readFile<Category>(FILES.categories);

    return menuItems.map(item => ({
      ...item,
      category: categories.find(cat => cat.id === item.categoryId) || null
    }));
  }

  async getMenuItemsByCategory(categoryId: string): Promise<MenuItemWithCategory[]> {
    const menuItems = await readFile<MenuItem>(FILES.menuItems);
    const categories = await readFile<Category>(FILES.categories);

    return menuItems
      .filter(item => item.categoryId === categoryId)
      .map(item => ({
        ...item,
        category: categories.find(cat => cat.id === item.categoryId) || null
      }));
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    const menuItems = await readFile<MenuItem>(FILES.menuItems);
    return menuItems.find(item => item.id === id);
  }

  async createMenuItem(itemData: InsertMenuItem): Promise<MenuItem> {
    const menuItems = await readFile<MenuItem>(FILES.menuItems);
    const newItem: MenuItem = {
      id: uuidv4(),
      ...itemData,
      createdAt: new Date(),
      updatedAt: null,
    };
    menuItems.push(newItem);
    await writeFile(FILES.menuItems, menuItems);
    return newItem;
  }

  async updateMenuItem(id: string, itemUpdate: Partial<MenuItem>): Promise<MenuItem> {
    const menuItems = await readFile<MenuItem>(FILES.menuItems);
    const index = menuItems.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Menu item not found');

    menuItems[index] = { ...menuItems[index], ...itemUpdate, updatedAt: new Date() };
    await writeFile(FILES.menuItems, menuItems);
    return menuItems[index];
  }

  async deleteMenuItem(id: string): Promise<void> {
    const menuItems = await readFile<MenuItem>(FILES.menuItems);
    const filtered = menuItems.filter(item => item.id !== id);
    await writeFile(FILES.menuItems, filtered);
  }

  // Order operations
  async createOrder(orderData: InsertOrder & { latitude?: number; longitude?: number }, items: Omit<InsertOrderItem, 'orderId'>[]): Promise<OrderWithItems> {
    const orders = await readFile<Order>(FILES.orders);
    const orderItems = await readFile<OrderItem>(FILES.orderItems);
    const menuItems = await readFile<MenuItem>(FILES.menuItems);

    const newOrder: Order = {
      id: uuidv4(),
      ...orderData,
      latitude: orderData.latitude?.toString() || null,
      longitude: orderData.longitude?.toString() || null,
      createdAt: new Date(),
      updatedAt: null,
    };

    const newOrderItems: OrderItem[] = items.map(item => ({
      id: uuidv4(),
      orderId: newOrder.id,
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      priceAtOrder: item.priceAtOrder,
    }));

    orders.push(newOrder);
    orderItems.push(...newOrderItems);

    await writeFile(FILES.orders, orders);
    await writeFile(FILES.orderItems, orderItems);

    // Return order with items
    const orderWithItems: OrderWithItems = {
      ...newOrder,
      items: newOrderItems.map(orderItem => ({
        ...orderItem,
        menuItem: menuItems.find(menuItem => menuItem.id === orderItem.menuItemId)!
      }))
    };

    return orderWithItems;
  }

  async getOrder(id: string): Promise<OrderWithItems | undefined> {
    const orders = await readFile<Order>(FILES.orders);
    const orderItems = await readFile<OrderItem>(FILES.orderItems);
    const menuItems = await readFile<MenuItem>(FILES.menuItems);

    const order = orders.find(o => o.id === id);
    if (!order) return undefined;

    const items = orderItems
      .filter(item => item.orderId === id)
      .map(orderItem => ({
        ...orderItem,
        menuItem: menuItems.find(menuItem => menuItem.id === orderItem.menuItemId)!
      }));

    return { ...order, items };
  }

  async getUserOrders(userId: string): Promise<OrderWithItems[]> {
    const orders = await readFile<Order>(FILES.orders);
    const orderItems = await readFile<OrderItem>(FILES.orderItems);
    const menuItems = await readFile<MenuItem>(FILES.menuItems);

    return orders
      .filter(order => order.userId === userId)
      .map(order => ({
        ...order,
        items: orderItems
          .filter(item => item.orderId === order.id)
          .map(orderItem => ({
            ...orderItem,
            menuItem: menuItems.find(menuItem => menuItem.id === orderItem.menuItemId)!
          }))
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getAllOrders(): Promise<OrderWithItems[]> {
    const orders = await readFile<Order>(FILES.orders);
    const orderItems = await readFile<OrderItem>(FILES.orderItems);
    const menuItems = await readFile<MenuItem>(FILES.menuItems);

    return orders
      .map(order => ({
        ...order,
        items: orderItems
          .filter(item => item.orderId === order.id)
          .map(orderItem => ({
            ...orderItem,
            menuItem: menuItems.find(menuItem => menuItem.id === orderItem.menuItemId)!
          }))
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const orders = await readFile<Order>(FILES.orders);
    const index = orders.findIndex(order => order.id === id);
    if (index === -1) throw new Error('Order not found');

    orders[index] = { ...orders[index], status: status as any, updatedAt: new Date() };
    await writeFile(FILES.orders, orders);
    return orders[index];
  }

  // Reservation operations
  async createReservation(reservationData: InsertReservation): Promise<Reservation> {
    const reservations = await readFile<Reservation>(FILES.reservations);
    const newReservation: Reservation = {
      id: uuidv4(),
      ...reservationData,
      createdAt: new Date(),
      updatedAt: null,
    };
    reservations.push(newReservation);
    await writeFile(FILES.reservations, reservations);
    return newReservation;
  }

  async getAllReservations(): Promise<Reservation[]> {
    const reservations = await readFile<Reservation>(FILES.reservations);
    return reservations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getUserReservations(userId: string): Promise<Reservation[]> {
    const reservations = await readFile<Reservation>(FILES.reservations);
    return reservations
      .filter(reservation => reservation.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async updateReservationStatus(id: string, status: string): Promise<Reservation> {
    const reservations = await readFile<Reservation>(FILES.reservations);
    const index = reservations.findIndex(reservation => reservation.id === id);
    if (index === -1) throw new Error('Reservation not found');

    reservations[index] = { ...reservations[index], status: status as any, updatedAt: new Date() };
    await writeFile(FILES.reservations, reservations);
    return reservations[index];
  }

  // Website settings operations
  async getWebsiteSettings(): Promise<WebsiteSettings | undefined> {
    const settings = await readFile<WebsiteSettings>(FILES.websiteSettings);
    return settings[0];
  }

  async updateWebsiteSettings(settingsData: Partial<InsertWebsiteSettings>): Promise<WebsiteSettings> {
    const settings = await readFile<WebsiteSettings>(FILES.websiteSettings);

    if (settings.length > 0) {
      settings[0] = { ...settings[0], ...settingsData, updatedAt: new Date() };
    } else {
      const newSettings: WebsiteSettings = {
        id: uuidv4(),
        primaryColor: '#FF6B35',
        secondaryColor: '#FFB800',
        accentColor: '#1A1A1A',
        backgroundColor: '#FAFAFA',
        logoUrl: null,
        logoText: 'تشكن هات',
        faviconUrl: null,
        contactPhone: '+966501234567',
        contactEmail: 'info@chickenhat.com',
        whatsappNumber: '+966501234567',
        streetAddress: 'شارع القاهرة',
        city: 'صنعاء',
        area: 'اليمن',
        postalCode: '12345',
        mapLocation: null,
        facebookUrl: null,
        instagramUrl: null,
        twitterUrl: null,
        tiktokUrl: null,
        heroTitle: 'وجهتكم الأولى لأشهى أنواع الدجاج المقلي والبروستد',
        heroSubtitle: 'نقدم لكم أجود أنواع الدجاج المقرمش بأفضل المكونات والنكهات الأصيلة\nمع خدمة توصيل سريعة وجودة لا تُضاهى',
        aboutTitle: 'عن تشكن هات',
        aboutDescription: 'مطعم تشكن هات هو وجهتكم المفضلة لأشهى أنواع الدجاج المقلي والبروستد. نحن نفخر بتقديم أجود أنواع الدجاج الطازج المتبل بأفضل الخلطات والتوابل السرية التي تميزنا عن غيرنا.',
        operatingHours: 'السبت - الخميس: 10:00 ص - 12:00 م\nالجمعة: 2:00 م - 12:00 م',
        deliveryFee: '15.00',
        freeDeliveryThreshold: '100.00',
        deliveryTime: '30-45 دقيقة',
        isDeliveryEnabled: true,
        isPickupEnabled: true,
        isReservationsEnabled: true,
        isOnlinePaymentEnabled: true,
        siteTitle: 'تشكن هات - أفضل دجاج مقلي في المملكة',
        siteDescription: 'تشكن هات - مطعم متخصص في الدجاج المقلي والبروستد بأجود أنواع التوابل والنكهات. اطلب الآن واستمتع بطعم لا يُنسى مع توصيل مجاني.',
        siteKeywords: 'دجاج مقلي, بروستد, مطعم, توصيل, الرياض, طعام سريع',
        ...settingsData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      settings.push(newSettings);
    }

    await writeFile(FILES.websiteSettings, settings);
    return settings[0];
  }

  async initializeWebsiteSettings(): Promise<WebsiteSettings> {
    const existingSettings = await this.getWebsiteSettings();
    if (existingSettings) {
      return existingSettings;
    }
    return this.updateWebsiteSettings({});
  }
}

export const fileStorage = new FileStorage();