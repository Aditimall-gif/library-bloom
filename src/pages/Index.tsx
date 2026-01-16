import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/BookCard";
import { books } from "@/data/mockData";
import { ArrowRight, BookOpen, Users, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Vast Collection",
    description: "Over 50,000 books across all genres and disciplines",
  },
  {
    icon: Users,
    title: "Student Portal",
    description: "Easy access to track your borrowed books and due dates",
  },
  {
    icon: Shield,
    title: "Admin Tools",
    description: "Powerful tools for librarians to manage the collection",
  },
  {
    icon: Clock,
    title: "Extended Hours",
    description: "Open 7 days a week with flexible borrowing periods",
  },
];

export default function Index() {
  const featuredBooks = books.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section text-primary-foreground py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to{" "}
              <span className="text-accent">Evergreen Library</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Discover a world of knowledge, imagination, and endless possibilities. 
              Your journey through literature begins here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/books">
                  Browse Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 border-2 border-accent"
              >
                <Link to="/student-auth">Student Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Experience the best library services designed for modern learners
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-6 text-center hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="section-title">Featured Books</h2>
              <p className="section-subtitle">Handpicked selections for curious minds</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/books">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="section-title mb-4">Ready to Start Reading?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of students and book lovers who have made Evergreen Library 
              their home for learning and discovery.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
