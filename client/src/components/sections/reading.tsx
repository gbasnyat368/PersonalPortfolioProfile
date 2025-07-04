import { useQuery } from '@tanstack/react-query';
import { BookOpen, Bookmark, CheckCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { Book } from '@shared/schema';

function BookCard({ book }: { book: Book }) {
  return (
    <div className="bg-white/10 p-4 rounded-lg book-card">
      <p className="font-semibold mb-2 text-white">{book.title}</p>
      <p className="text-white/80 text-sm mb-2">by {book.author}</p>
      {book.rating && (
        <div className="flex items-center">
          <div className="flex text-yellow-400 text-xs">
            {'★'.repeat(Math.floor(Number(book.rating)))}
            {'☆'.repeat(5 - Math.floor(Number(book.rating)))}
          </div>
          <span className="text-white/80 text-xs ml-2">{book.rating}</span>
        </div>
      )}
    </div>
  );
}

function BookSkeleton() {
  return (
    <div className="bg-white/10 p-4 rounded-lg">
      <Skeleton className="h-4 w-3/4 mb-2 bg-white/20" />
      <Skeleton className="h-3 w-1/2 mb-2 bg-white/20" />
      <Skeleton className="h-3 w-1/4 bg-white/20" />
    </div>
  );
}

export function ReadingSection() {
  const { data: currentlyReading, isLoading: loadingCurrently } = useQuery({
    queryKey: ['/api/books/currently-reading'],
  });

  const { data: wantToRead, isLoading: loadingWant } = useQuery({
    queryKey: ['/api/books/to-read'],
  });

  const { data: readBooks, isLoading: loadingRead } = useQuery({
    queryKey: ['/api/books/read'],
  });

  return (
    <section id="reading" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">My Reading Journey</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Continuously learning through books across business, technology, and personal development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Currently Reading */}
          <Card className="gradient-primary text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-3" />
                Currently Reading
              </h3>
              <div className="space-y-4">
                {loadingCurrently ? (
                  <BookSkeleton />
                ) : currentlyReading && currentlyReading.length > 0 ? (
                  currentlyReading.slice(0, 3).map((book: Book) => (
                    <BookCard key={book.id} book={book} />
                  ))
                ) : (
                  <div className="bg-white/10 p-4 rounded-lg">
                    <p className="font-semibold mb-2">No books currently reading</p>
                    <p className="text-white/80 text-sm">Check back later for updates</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Want to Read */}
          <Card className="bg-gradient-to-br from-accent to-cyan-700 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Bookmark className="h-5 w-5 mr-3" />
                Want to Read
              </h3>
              <div className="space-y-4">
                {loadingWant ? (
                  <BookSkeleton />
                ) : wantToRead && wantToRead.length > 0 ? (
                  wantToRead.slice(0, 3).map((book: Book) => (
                    <BookCard key={book.id} book={book} />
                  ))
                ) : (
                  <div className="bg-white/10 p-4 rounded-lg">
                    <p className="font-semibold mb-2">No books in wishlist</p>
                    <p className="text-cyan-100 text-sm">Building reading list...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Read */}
          <Card className="bg-gradient-to-br from-secondary to-slate-700 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-3" />
                Recently Read
              </h3>
              <div className="space-y-4">
                {loadingRead ? (
                  <BookSkeleton />
                ) : readBooks && readBooks.length > 0 ? (
                  readBooks.slice(0, 3).map((book: Book) => (
                    <BookCard key={book.id} book={book} />
                  ))
                ) : (
                  <div className="bg-white/10 p-4 rounded-lg">
                    <p className="font-semibold mb-2">No books read yet</p>
                    <p className="text-slate-200 text-sm">Reading list coming soon</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="inline-flex items-center text-primary hover:text-blue-700 border-primary hover:border-blue-700"
            onClick={() => window.open('https://www.goodreads.com/user/show/23439056-gaurav', '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View Full Reading List on Goodreads
          </Button>
        </div>
      </div>
    </section>
  );
}
