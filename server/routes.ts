import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { z } from "zod";
import { insertOrderSchema, insertReservationSchema, insertMenuItemSchema, insertCategorySchema, insertWebsiteSettingsSchema } from "@shared/schema";

// Configure multer for file uploads
const storage_ = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/general';
    
    if (req.path.includes('/menu-item-image')) {
      uploadPath = 'uploads/menu-items';
    } else if (req.path.includes('/logo')) {
      uploadPath = 'uploads/logos';
    } else if (req.path.includes('/favicon')) {
      uploadPath = 'uploads/favicons';
    } else if (req.path.includes('/website-image')) {
      uploadPath = 'uploads/website';
    }
    
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage_,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from uploads directory with proper headers
  app.use('/uploads', express.static('uploads', {
    maxAge: '1y',
    etag: false,
    lastModified: false,
    setHeaders: (res, path) => {
      if (path.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        res.setHeader('Content-Type', 'image/' + path.split('.').pop()?.toLowerCase());
        res.setHeader('Access-Control-Allow-Origin', '*');
      }
    }
  }));

  // Handle favicon requests
  app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
  });
  // Menu routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/menu-items", async (req, res) => {
    try {
      const categoryId = req.query.categoryId as string;
      if (categoryId) {
        const menuItems = await storage.getMenuItemsByCategory(categoryId);
        res.json(menuItems);
      } else {
        const menuItems = await storage.getAllMenuItems();
        res.json(menuItems);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  app.get("/api/menu-items/:id", async (req, res) => {
    try {
      const menuItem = await storage.getMenuItem(req.params.id);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.json(menuItem);
    } catch (error) {
      console.error("Error fetching menu item:", error);
      res.status(500).json({ message: "Failed to fetch menu item" });
    }
  });

  // Order routes
  app.post("/api/orders", async (req, res) => {
    try {
      const orderSchema = insertOrderSchema.extend({
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        items: z.array(z.object({
          menuItemId: z.string(),
          quantity: z.number().min(1),
          priceAtOrder: z.string(),
        })),
      });

      const validatedData = orderSchema.parse(req.body);
      const { items, latitude, longitude, ...orderData } = validatedData;
      
      const locationData = latitude && longitude ? {
        latitude,
        longitude,
      } : {};

      const order = await storage.createOrder({ ...orderData, ...locationData }, items);
      res.json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  app.patch("/api/orders/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const order = await storage.updateOrderStatus(req.params.id, status);
      res.json(order);
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  // Reservation routes
  app.post("/api/reservations", async (req, res) => {
    try {
      const validatedData = insertReservationSchema.parse(req.body);
      const reservation = await storage.createReservation(validatedData);
      res.json(reservation);
    } catch (error) {
      console.error("Error creating reservation:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid reservation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create reservation" });
    }
  });

  app.get("/api/reservations", async (req, res) => {
    try {
      const reservations = await storage.getAllReservations();
      res.json(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });

  app.patch("/api/reservations/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const reservation = await storage.updateReservationStatus(req.params.id, status);
      res.json(reservation);
    } catch (error) {
      console.error("Error updating reservation status:", error);
      res.status(500).json({ message: "Failed to update reservation status" });
    }
  });

  // Admin routes for menu management
  app.post("/api/admin/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid category data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create category" });
    }
  });

  app.put("/api/admin/categories/:id", async (req, res) => {
    try {
      const category = await storage.updateCategory(req.params.id, req.body);
      res.json(category);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ message: "Failed to update category" });
    }
  });

  app.delete("/api/admin/categories/:id", async (req, res) => {
    try {
      await storage.deleteCategory(req.params.id);
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ message: "Failed to delete category" });
    }
  });

  app.post("/api/admin/menu-items", async (req, res) => {
    try {
      const validatedData = insertMenuItemSchema.parse(req.body);
      const menuItem = await storage.createMenuItem(validatedData);
      res.json(menuItem);
    } catch (error) {
      console.error("Error creating menu item:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid menu item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create menu item" });
    }
  });

  app.put("/api/admin/menu-items/:id", async (req, res) => {
    try {
      const menuItem = await storage.updateMenuItem(req.params.id, req.body);
      res.json(menuItem);
    } catch (error) {
      console.error("Error updating menu item:", error);
      res.status(500).json({ message: "Failed to update menu item" });
    }
  });

  app.delete("/api/admin/menu-items/:id", async (req, res) => {
    try {
      await storage.deleteMenuItem(req.params.id);
      res.json({ message: "Menu item deleted successfully" });
    } catch (error) {
      console.error("Error deleting menu item:", error);
      res.status(500).json({ message: "Failed to delete menu item" });
    }
  });

  // File upload routes
  app.post('/api/upload/menu-item-image', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      // Use the filename directly without the uploads/ prefix since we're serving from uploads/
      const imageUrl = `/uploads/menu-items/${req.file.filename}`;
      res.json({ imageUrl });
    } catch (error) {
      console.error('Error uploading menu item image:', error);
      res.status(500).json({ message: 'Failed to upload image' });
    }
  });

  app.post('/api/upload/logo', upload.single('logo'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      const logoUrl = `/uploads/logos/${req.file.filename}`;
      res.json({ logoUrl });
    } catch (error) {
      console.error('Error uploading logo:', error);
      res.status(500).json({ message: 'Failed to upload logo' });
    }
  });

  app.post('/api/upload/favicon', upload.single('favicon'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      const faviconUrl = `/uploads/favicons/${req.file.filename}`;
      res.json({ faviconUrl });
    } catch (error) {
      console.error('Error uploading favicon:', error);
      res.status(500).json({ message: 'Failed to upload favicon' });
    }
  });

  app.post('/api/upload/website-image', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      const imageUrl = `/uploads/website/${req.file.filename}`;
      res.json({ imageUrl });
    } catch (error) {
      console.error('Error uploading website image:', error);
      res.status(500).json({ message: 'Failed to upload image' });
    }
  });

  // Website settings routes
  app.get("/api/website-settings", async (req, res) => {
    try {
      let settings = await storage.getWebsiteSettings();
      if (!settings) {
        // Initialize default settings if none exist
        settings = await storage.initializeWebsiteSettings();
      }
      res.json(settings);
    } catch (error) {
      console.error("Error fetching website settings:", error);
      res.status(500).json({ message: "Failed to fetch website settings" });
    }
  });

  app.put("/api/website-settings", async (req, res) => {
    try {
      const settingsData = insertWebsiteSettingsSchema.parse(req.body);
      const updatedSettings = await storage.updateWebsiteSettings(settingsData);
      res.json(updatedSettings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid settings data",
          errors: error.errors,
        });
      }
      console.error("Error updating website settings:", error);
      res.status(500).json({ message: "Failed to update website settings" });
    }
  });

  app.post("/api/website-settings/initialize", async (req, res) => {
    try {
      const settings = await storage.initializeWebsiteSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error initializing website settings:", error);
      res.status(500).json({ message: "Failed to initialize website settings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
