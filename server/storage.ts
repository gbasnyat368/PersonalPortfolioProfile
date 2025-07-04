import { users, books, contactMessages, type User, type InsertUser, type Book, type InsertBook, type ContactMessage, type InsertContactMessage } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getBooks(): Promise<Book[]>;
  getBooksByStatus(status: string): Promise<Book[]>;
  createBook(book: InsertBook): Promise<Book>;
  updateBooks(books: InsertBook[]): Promise<void>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private books: Map<number, Book>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentBookId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.books = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentBookId = 1;
    this.currentMessageId = 1;
    
    // Add some sample books for testing
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleBooks = [
      {
        title: "Revolusi: Indonesia and the Birth of the Modern World",
        author: "David Van Reybrouck",
        status: "currently-reading",
        rating: null,
        imageUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1742428617l/228748489._SX50_.jpg",
        goodreadsUrl: "https://www.goodreads.com/book/show/228748489",
        dateAdded: "2025-07-02"
      },
      {
        title: "Butter: A Novel of Food and Murder",
        author: "Asako Yuzuki",
        status: "to-read",
        rating: null,
        imageUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1724011874l/213212694._SY75_.jpg",
        goodreadsUrl: "https://www.goodreads.com/book/show/213212694",
        dateAdded: "2025-07-01"
      },
      {
        title: "Athens: A History of the World's First Democracy",
        author: "Thomas N. Mitchell",
        status: "to-read",
        rating: null,
        imageUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1557782392l/43309953._SY75_.jpg",
        goodreadsUrl: "https://www.goodreads.com/book/show/43309953",
        dateAdded: "2025-07-01"
      }
    ];

    for (const book of sampleBooks) {
      const id = this.currentBookId++;
      const bookEntity: Book = { 
        ...book, 
        id
      };
      this.books.set(id, bookEntity);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getBooksByStatus(status: string): Promise<Book[]> {
    return Array.from(this.books.values()).filter(book => book.status === status);
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.currentBookId++;
    const book: Book = { 
      ...insertBook, 
      id,
      rating: insertBook.rating ?? null,
      imageUrl: insertBook.imageUrl ?? null,
      goodreadsUrl: insertBook.goodreadsUrl ?? null,
      dateAdded: insertBook.dateAdded ?? null
    };
    this.books.set(id, book);
    return book;
  }

  async updateBooks(newBooks: InsertBook[]): Promise<void> {
    // Clear existing books and add new ones
    this.books.clear();
    this.currentBookId = 1;
    
    for (const bookData of newBooks) {
      const id = this.currentBookId++;
      const book: Book = { 
        ...bookData, 
        id,
        rating: bookData.rating ?? null,
        imageUrl: bookData.imageUrl ?? null,
        goodreadsUrl: bookData.goodreadsUrl ?? null,
        dateAdded: bookData.dateAdded ?? null
      };
      this.books.set(id, book);
    }
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id,
      createdAt: new Date().toISOString()
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
