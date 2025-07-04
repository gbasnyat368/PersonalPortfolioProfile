import type { Book } from '@shared/schema';

// Static book data for GitHub Pages deployment
export const staticBooks: Book[] = [
  {
    id: 1,
    title: 'Revolusi: Indonesia and the Birth of the Modern World',
    author: 'David Van Reybrouck',
    status: 'currently-reading',
    rating: null,
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1742428617l/228748489._SX50_.jpg',
    goodreadsUrl: 'https://www.goodreads.com/review/show/7705046535?utm_medium=api&utm_source=rss',
    dateAdded: 'Wed, 02 Jul 2025 18:26:11 -0700'
  },
  {
    id: 2,
    title: 'Butter: A Novel of Food and Murder',
    author: 'Asako Yuzuki',
    status: 'to-read',
    rating: null,
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1724011874l/213212694._SY75_.jpg',
    goodreadsUrl: 'https://www.goodreads.com/review/show/7701099326?utm_medium=api&utm_source=rss',
    dateAdded: 'Tue, 01 Jul 2025 12:10:01 -0700'
  },
  {
    id: 3,
    title: "Don't Be Canada: How One Country Destroyed Its Middle Class",
    author: 'Jason Kenney',
    status: 'read',
    rating: "4",
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1234567890l/123456789._SX50_.jpg',
    goodreadsUrl: 'https://www.goodreads.com/review/show/1234567890?utm_medium=api&utm_source=rss',
    dateAdded: 'Mon, 01 Jul 2025 10:00:00 -0700'
  },
  {
    id: 4,
    title: 'The Pragmatic Programmer',
    author: 'David Thomas, Andrew Hunt',
    status: 'read',
    rating: "5",
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1401432508l/4099._SX50_.jpg',
    goodreadsUrl: 'https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer',
    dateAdded: 'Sun, 30 Jun 2025 15:30:00 -0700'
  },
  {
    id: 5,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    status: 'read',
    rating: "4",
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1436202607l/3735293._SX50_.jpg',
    goodreadsUrl: 'https://www.goodreads.com/book/show/3735293-clean-code',
    dateAdded: 'Sat, 29 Jun 2025 12:00:00 -0700'
  },
  {
    id: 6,
    title: 'System Design Interview',
    author: 'Alex Xu',
    status: 'read',
    rating: "5",
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1583739884l/54109255._SX50_.jpg',
    goodreadsUrl: 'https://www.goodreads.com/book/show/54109255-system-design-interview-an-insider-s-guide',
    dateAdded: 'Fri, 28 Jun 2025 09:15:00 -0700'
  }
];

export const getBooksByStatus = (status: string): Book[] => {
  return staticBooks.filter(book => book.status === status);
};

export const isStaticMode = (): boolean => {
  // Check if we're in a static deployment environment
  return typeof window !== 'undefined' && !window.location.hostname.includes('replit');
};