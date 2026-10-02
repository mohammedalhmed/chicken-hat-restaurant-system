import { fileStorage } from './file-storage';
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
import bcrypt from "bcrypt";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Address operations
  getUserAddresses(userId: string): Promise<Address[]>;
  createAddress(address: InsertAddress): Promise<Address>;

  // Category operations
  getAllCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<Category>): Promise<Category>;
  deleteCategory(id: string): Promise<void>;

  // Menu item operations
  getAllMenuItems(): Promise<MenuItemWithCategory[]>;
  getMenuItemsByCategory(categoryId: string): Promise<MenuItemWithCategory[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  createMenuItem(menuItem: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: string, menuItem: Partial<MenuItem>): Promise<MenuItem>;
  deleteMenuItem(id: string): Promise<void>;

  // Order operations
  createOrder(order: InsertOrder, items: Omit<InsertOrderItem, 'orderId'>[]): Promise<OrderWithItems>;
  getOrder(id: string): Promise<OrderWithItems | undefined>;
  getUserOrders(userId: string): Promise<OrderWithItems[]>;
  getAllOrders(): Promise<OrderWithItems[]>;
  updateOrderStatus(id: string, status: string): Promise<Order>;

  // Reservation operations
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  getAllReservations(): Promise<Reservation[]>;
  getUserReservations(userId: string): Promise<Reservation[]>;
  updateReservationStatus(id: string, status: string): Promise<Reservation>;

  // Website settings operations
  getWebsiteSettings(): Promise<WebsiteSettings | undefined>;
  updateWebsiteSettings(settings: Partial<InsertWebsiteSettings>): Promise<WebsiteSettings>;
  initializeWebsiteSettings(): Promise<WebsiteSettings>;
}

export class FileBasedStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return await fileStorage.getUser(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await fileStorage.getUserByEmail(email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(insertUser.passwordHash, saltRounds);

    return await fileStorage.createUser({
      ...insertUser,
      passwordHash: hashedPassword,
    });
  }

  // Address operations
  async getUserAddresses(userId: string): Promise<Address[]> {
    return await fileStorage.getUserAddresses(userId);
  }

  async createAddress(address: InsertAddress): Promise<Address> {
    return await fileStorage.createAddress(address);
  }

  // Category operations
  async getAllCategories(): Promise<Category[]> {
    return await fileStorage.getAllCategories();
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    return await fileStorage.createCategory(category);
  }

  async updateCategory(id: string, categoryUpdate: Partial<Category>): Promise<Category> {
    return await fileStorage.updateCategory(id, categoryUpdate);
  }

  async deleteCategory(id: string): Promise<void> {
    return await fileStorage.deleteCategory(id);
  }

  // Menu item operations
  async getAllMenuItems(): Promise<MenuItemWithCategory[]> {
    return await fileStorage.getAllMenuItems();
  }

  async getMenuItemsByCategory(categoryId: string): Promise<MenuItemWithCategory[]> {
    return await fileStorage.getMenuItemsByCategory(categoryId);
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return await fileStorage.getMenuItem(id);
  }

  async createMenuItem(menuItem: InsertMenuItem): Promise<MenuItem> {
    return await fileStorage.createMenuItem(menuItem);
  }

  async updateMenuItem(id: string, menuItem: Partial<MenuItem>): Promise<MenuItem> {
    return await fileStorage.updateMenuItem(id, menuItem);
  }

  async deleteMenuItem(id: string): Promise<void> {
    return await fileStorage.deleteMenuItem(id);
  }

  // Order operations
  async createOrder(orderData: InsertOrder, items: Omit<InsertOrderItem, 'orderId'>[]): Promise<OrderWithItems> {
    return await fileStorage.createOrder(orderData, items);
  }

  async getOrder(id: string): Promise<OrderWithItems | undefined> {
    return await fileStorage.getOrder(id);
  }

  async getUserOrders(userId: string): Promise<OrderWithItems[]> {
    return await fileStorage.getUserOrders(userId);
  }

  async getAllOrders(): Promise<OrderWithItems[]> {
    return await fileStorage.getAllOrders();
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    return await fileStorage.updateOrderStatus(id, status);
  }

  // Reservation operations
  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    return await fileStorage.createReservation(reservation);
  }

  async getAllReservations(): Promise<Reservation[]> {
    return await fileStorage.getAllReservations();
  }

  async getUserReservations(userId: string): Promise<Reservation[]> {
    return await fileStorage.getUserReservations(userId);
  }

  async updateReservationStatus(id: string, status: string): Promise<Reservation> {
    return await fileStorage.updateReservationStatus(id, status);
  }

  // Website settings operations
  async getWebsiteSettings(): Promise<WebsiteSettings | undefined> {
    return await fileStorage.getWebsiteSettings();
  }

  async updateWebsiteSettings(settings: Partial<InsertWebsiteSettings>): Promise<WebsiteSettings> {
    return await fileStorage.updateWebsiteSettings(settings);
  }

  async initializeWebsiteSettings(): Promise<WebsiteSettings> {
    return await fileStorage.initializeWebsiteSettings();
  }
}

export const storage = new FileBasedStorage();