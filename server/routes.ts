import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, type InsertBook } from "@shared/schema";
import { z } from "zod";

// RSS feed parser
async function parseGoodreadsRSS(rssUrl: string): Promise<InsertBook[]> {
  try {
    const response = await fetch(rssUrl);
    const xmlText = await response.text();
    
    // Simple XML parsing for RSS feed
    const books: InsertBook[] = [];
    const itemRegex = /<item>(.*?)<\/item>/gs;
    const matches = xmlText.match(itemRegex);
    
    if (matches) {
      for (const match of matches) {
        const titleMatch = match.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
        const descriptionMatch = match.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);
        const linkMatch = match.match(/<link>(.*?)<\/link>/);
        
        if (titleMatch && descriptionMatch) {
          const title = titleMatch[1];
          const description = descriptionMatch[1];
          const link = linkMatch ? linkMatch[1] : '';
          
          // Extract author from description
          const authorMatch = description.match(/author:\s*(.*?)\s*<br/i);
          const author = authorMatch ? authorMatch[1] : 'Unknown Author';
          
          // Extract rating if available
          const ratingMatch = description.match(/rating:\s*(\d+)/i);
          const rating = ratingMatch ? ratingMatch[1] : '';
          
          // Extract image URL if available
          const imageMatch = description.match(/src="(.*?)"/);
          const imageUrl = imageMatch ? imageMatch[1] : '';
          
          // Determine status based on shelf information
          let status = 'read';
          if (description.includes('currently-reading')) {
            status = 'currently-reading';
          } else if (description.includes('to-read')) {
            status = 'to-read';
          }
          
          books.push({
            title,
            author,
            status,
            rating,
            imageUrl,
            goodreadsUrl: link,
            dateAdded: new Date().toISOString()
          });
        }
      }
    }
    
    return books;
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all books
  app.get("/api/books", async (req, res) => {
    try {
      const books = await storage.getBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch books" });
    }
  });

  // Get books by status
  app.get("/api/books/:status", async (req, res) => {
    try {
      const { status } = req.params;
      const books = await storage.getBooksByStatus(status);
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch books" });
    }
  });

  // Sync books from Goodreads RSS
  app.post("/api/books/sync", async (req, res) => {
    try {
      const rssUrl = process.env.GOODREADS_RSS_URL || 
        "https://www.goodreads.com/review/list_rss/23439056?key=2oWlkvBOQmdRhpMPL2jM3Z6saXMyyASCUe0mDM3ZFgFa8_LJ&shelf=%23ALL%23";
      
      const books = await parseGoodreadsRSS(rssUrl);
      await storage.updateBooks(books);
      
      res.json({ message: "Books synced successfully", count: books.length });
    } catch (error) {
      res.status(500).json({ error: "Failed to sync books" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ message: "Message sent successfully", id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to send message" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
