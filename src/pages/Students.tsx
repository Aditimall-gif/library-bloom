import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, User, AlertCircle, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface BorrowedBook {
  id: string;
  book_id: string;
  book_title: string;
  book_author: string;
  borrowed_at: string;
  due_date: string;
  returned_at: string | null;
  status: string;
}

export default function Students() {
  const { user, studentProfile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/student-auth");
    }
  }, [user, loading, navigate]);

  const { data: borrowedBooks = [], isLoading: booksLoading } = useQuery({
    queryKey: ["borrowed-books", studentProfile?.id],
    queryFn: async () => {
      if (!studentProfile?.id) return [];
      
      const { data, error } = await supabase
        .from("borrowed_books")
        .select("*")
        .eq("student_id", studentProfile.id)
        .order("borrowed_at", { ascending: false });

      if (error) throw error;
      return data as BorrowedBook[];
    },
    enabled: !!studentProfile?.id,
  });

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const activeLoans = borrowedBooks.filter((loan) => loan.status === "borrowed");
  const returnedLoans = borrowedBooks.filter((loan) => loan.status === "returned");

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || booksLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      {/* Header */}
      <section className="hero-section text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                Welcome, {studentProfile?.full_name || "Student"}!
              </h1>
              <p className="text-primary-foreground/80">
                Student ID: {studentProfile?.student_id}
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">
                {activeLoans.length}
              </p>
              <p className="text-muted-foreground text-sm">Currently Borrowed</p>
            </div>
            <div className="glass-card p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p className="text-2xl font-bold text-foreground">
                {activeLoans.filter((l) => isOverdue(l.due_date)).length}
              </p>
              <p className="text-muted-foreground text-sm">Overdue Books</p>
            </div>
            <div className="glass-card p-6 text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">
                {returnedLoans.length}
              </p>
              <p className="text-muted-foreground text-sm">Books Returned</p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Loans */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-6">Currently Issued Books</h2>

          {activeLoans.length > 0 ? (
            <div className="glass-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Borrowed Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeLoans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{loan.book_title}</p>
                          <p className="text-sm text-muted-foreground">
                            {loan.book_author}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(loan.borrowed_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(loan.due_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {isOverdue(loan.due_date) ? (
                          <Badge variant="destructive" className="gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Overdue
                          </Badge>
                        ) : (
                          <Badge className="bg-primary">Active</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No books currently borrowed</p>
              <Button asChild className="mt-4">
                <a href="/books">Browse Books</a>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Return History */}
      {returnedLoans.length > 0 && (
        <section className="py-8 md:py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="section-title mb-6">Return History</h2>

            <div className="glass-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Borrowed Date</TableHead>
                    <TableHead>Returned Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {returnedLoans.map((loan) => (
                    <TableRow key={loan.id} className="opacity-75">
                      <TableCell>
                        <div>
                          <p className="font-medium">{loan.book_title}</p>
                          <p className="text-sm text-muted-foreground">
                            {loan.book_author}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(loan.borrowed_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {loan.returned_at
                          ? new Date(loan.returned_at).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">Returned</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
