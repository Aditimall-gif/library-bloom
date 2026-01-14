import { BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-accent text-accent-foreground">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="font-serif font-bold text-xl">
                Evergreen Library
              </span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Nurturing minds through the power of books since 1952. 
              Your gateway to knowledge and imagination.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/books" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                Browse Books
              </Link>
              <Link to="/students" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                Student Portal
              </Link>
              <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Library Hours</h4>
            <div className="space-y-1 text-sm text-primary-foreground/80">
              <p>Monday - Friday: 8:00 AM - 9:00 PM</p>
              <p>Saturday: 9:00 AM - 6:00 PM</p>
              <p>Sunday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-accent" /> for book lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
