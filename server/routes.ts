
import express, { type Request, Response } from "express";
import http from "http";
import { z } from "zod";
import { contactSchema } from "../shared/schema";

// Mock data for contact messages
const mockContactMessages = [];

export async function registerRoutes(app: express.Express) {
  const server = http.createServer(app);

  const router = express.Router();

  // Contact form endpoint
  router.post('/contact', async (req: Request, res: Response) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      
      // Store in mock data instead of database
      mockContactMessages.push({
        ...validatedData,
        id: mockContactMessages.length + 1,
        createdAt: new Date()
      });
      
      return res.status(201).json({ 
        message: 'Message sent successfully',
        success: true 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors,
          success: false 
        });
      }
      
      return res.status(500).json({ 
        message: 'Failed to send message', 
        success: false 
      });
    }
  });

  // Simple health check endpoint
  router.get('/health', (_req: Request, res: Response) => {
    return res.status(200).json({ status: 'ok' });
  });

  app.use('/api', router);

  return server;
}
