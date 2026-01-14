import { Book } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <div className="book-card group">
      <div className="flex gap-4">
        {/* Book Spine Visual */}
        <div
          className="w-4 h-32 rounded-sm flex-shrink-0"
          style={{ backgroundColor: book.coverColor }}
        />
        
        {/* Book Cover */}
        <div
          className="w-24 h-32 rounded-md flex-shrink-0 flex items-center justify-center p-2 transition-transform group-hover:scale-105"
          style={{ backgroundColor: book.coverColor }}
        >
          <span className="text-white/90 text-xs font-medium text-center leading-tight">
            {book.title}
          </span>
        </div>

        {/* Book Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-semibold text-lg text-foreground mb-1 truncate">
            {book.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-2">
            by {book.author}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="category-badge">{book.category}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            ISBN: {book.isbn}
          </p>
          <Badge
            variant={book.available ? "default" : "secondary"}
            className={book.available ? "bg-primary" : "bg-muted text-muted-foreground"}
          >
            {book.available ? "Available" : "Issued"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
