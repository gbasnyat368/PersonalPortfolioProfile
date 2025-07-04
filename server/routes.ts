import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, type InsertBook } from "@shared/schema";
import { z } from "zod";

// RSS feed parser
async function parseGoodreadsRSS(rssUrl: string): Promise<InsertBook[]> {
  try {
    console.log('Fetching RSS feed...');
    const response = await fetch(rssUrl);
    const xmlText = await response.text();
    console.log('RSS response length:', xmlText.length);
    console.log('RSS sample:', xmlText.substring(0, 500));
    
    // Simple XML parsing for RSS feed
    const books: InsertBook[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const matches = Array.from(xmlText.matchAll(itemRegex));
    console.log('Found matches:', matches.length);
    
    if (matches && matches.length > 0) {
      for (const match of matches) {
        const itemContent = match[1];
        
        // Extract title
        const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
        const title = titleMatch ? titleMatch[1] : 'Unknown Title';
        
        // Extract author
        const authorMatch = itemContent.match(/<author_name>(.*?)<\/author_name>/);
        const author = authorMatch ? authorMatch[1] : 'Unknown Author';
        
        // Extract image URL
        const imageMatch = itemContent.match(/<book_image_url><!\[CDATA\[(.*?)\]\]><\/book_image_url>/);
        const imageUrl = imageMatch ? imageMatch[1] : null;
        
        // Extract link
        const linkMatch = itemContent.match(/<link><!\[CDATA\[(.*?)\]\]><\/link>/);
        const goodreadsUrl = linkMatch ? linkMatch[1] : null;
        
        // Extract user rating
        const ratingMatch = itemContent.match(/<user_rating>(\d+)<\/user_rating>/);
        const rating = ratingMatch && ratingMatch[1] !== '0' ? ratingMatch[1] : null;
        
        // Extract user shelves to determine status
        const shelfMatch = itemContent.match(/<user_shelves>(.*?)<\/user_shelves>/);
        let status = 'read';
        if (shelfMatch) {
          const shelf = shelfMatch[1];
          if (shelf.includes('currently-reading')) {
            status = 'currently-reading';
          } else if (shelf.includes('to-read')) {
            status = 'to-read';
          }
        }
        
        // Extract date added
        const dateMatch = itemContent.match(/<user_date_added><!\[CDATA\[(.*?)\]\]><\/user_date_added>/);
        const dateAdded = dateMatch ? dateMatch[1] : new Date().toISOString();
        
        books.push({
          title,
          author,
          status,
          rating,
          imageUrl,
          goodreadsUrl,
          dateAdded
        });
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
      
      console.log('Fetching RSS feed from:', rssUrl);
      const books = await parseGoodreadsRSS(rssUrl);
      console.log('Parsed books:', books.length, books.slice(0, 2));
      await storage.updateBooks(books);
      
      res.json({ message: "Books synced successfully", count: books.length });
    } catch (error) {
      console.error('Sync error:', error);
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
