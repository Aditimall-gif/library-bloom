import { Layout } from "@/components/Layout";
import { issuedBooks, books } from "@/data/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, User, AlertCircle } from "lucide-react";

export default function Students() {
  const getBookTitle = (bookId: string) => {
    const book = books.find((b) => b.id === bookId);
    return book?.title || "Unknown Book";
  };

  const getBookAuthor = (bookId: string) => {
    const book = books.find((b) => b.id === bookId);
    return book?.author || "Unknown Author";
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const activeLoans = issuedBooks.filter((loan) => !loan.returned);
  const returnedLoans = issuedBooks.filter((loan) => loan.returned);

  return (
    <Layout>
      {/* Header */}
      <section className="hero-section text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Student Portal</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            View your borrowed books, check due dates, and manage your library account
          </p>
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
                {activeLoans.filter((l) => isOverdue(l.dueDate)).length}
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
                    <TableHead>Student</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeLoans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{getBookTitle(loan.bookId)}</p>
                          <p className="text-sm text-muted-foreground">
                            {getBookAuthor(loan.bookId)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{loan.studentName}</p>
                          <p className="text-sm text-muted-foreground">
                            {loan.studentId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(loan.issueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(loan.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {isOverdue(loan.dueDate) ? (
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
              <p className="text-muted-foreground">No books currently issued</p>
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
                    <TableHead>Student</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {returnedLoans.map((loan) => (
                    <TableRow key={loan.id} className="opacity-75">
                      <TableCell>
                        <div>
                          <p className="font-medium">{getBookTitle(loan.bookId)}</p>
                          <p className="text-sm text-muted-foreground">
                            {getBookAuthor(loan.bookId)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{loan.studentName}</p>
                          <p className="text-sm text-muted-foreground">
                            {loan.studentId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(loan.issueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(loan.dueDate).toLocaleDateString()}
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
