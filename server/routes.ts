import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate the request body
      const result = contactSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: result.error.errors 
        });
      }
      
      // Store the contact message
      const contact = await storage.createContactMessage({
        name: result.data.name,
        email: result.data.email,
        subject: result.data.subject,
        message: result.data.message
      });
      
      return res.status(201).json({ 
        message: "Message sent successfully", 
        id: contact.id 
      });
    } catch (error) {
      console.error('Error in contact form submission:', error);
      return res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
