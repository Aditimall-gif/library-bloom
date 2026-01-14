import { useState } from "react";
import { Layout } from "@/components/Layout";
import { books as initialBooks, categories, Book } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import { toast } from "sonner";

const bookColors = [
  "hsl(150 35% 25%)",
  "hsl(220 60% 35%)",
  "hsl(0 50% 35%)",
  "hsl(38 80% 45%)",
  "hsl(200 60% 35%)",
  "hsl(320 40% 40%)",
  "hsl(160 50% 30%)",
  "hsl(30 50% 35%)",
];

export default function Admin() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
  });

  const resetForm = () => {
    setFormData({ title: "", author: "", category: "", isbn: "" });
  };

  const handleAddBook = () => {
    if (!formData.title || !formData.author || !formData.category || !formData.isbn) {
      toast.error("Please fill in all fields");
      return;
    }

    const newBook: Book = {
      id: String(Date.now()),
      ...formData,
      available: true,
      coverColor: bookColors[Math.floor(Math.random() * bookColors.length)],
    };

    setBooks([...books, newBook]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success("Book added successfully!");
  };

  const handleEditBook = () => {
    if (!editingBook) return;
    if (!formData.title || !formData.author || !formData.category || !formData.isbn) {
      toast.error("Please fill in all fields");
      return;
    }

    setBooks(
      books.map((book) =>
        book.id === editingBook.id
          ? { ...book, ...formData }
          : book
      )
    );
    setIsEditDialogOpen(false);
    setEditingBook(null);
    resetForm();
    toast.success("Book updated successfully!");
  };

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
    toast.success("Book deleted successfully!");
  };

  const openEditDialog = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      isbn: book.isbn,
    });
    setIsEditDialogOpen(true);
  };

  const categoryOptions = categories.filter((c) => c !== "All");

  return (
    <Layout>
      {/* Header */}
      <section className="hero-section text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Admin Panel</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Manage the library collection - add, update, or remove books
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">{books.length}</p>
              <p className="text-muted-foreground text-sm">Total Books</p>
            </div>
            <div className="glass-card p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p className="text-2xl font-bold text-foreground">
                {books.filter((b) => b.available).length}
              </p>
              <p className="text-muted-foreground text-sm">Available</p>
            </div>
            <div className="glass-card p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-2xl font-bold text-foreground">
                {books.filter((b) => !b.available).length}
              </p>
              <p className="text-muted-foreground text-sm">Issued</p>
            </div>
          </div>
        </div>
      </section>

      {/* Book Management */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Manage Books</h2>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Book
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-serif">Add New Book</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Enter book title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      placeholder="Enter author name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      value={formData.isbn}
                      onChange={(e) =>
                        setFormData({ ...formData, isbn: e.target.value })
                      }
                      placeholder="Enter ISBN number"
                    />
                  </div>
                  <Button onClick={handleAddBook} className="w-full">
                    Add Book
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="glass-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      <span className="category-badge">{book.category}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {book.isbn}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={book.available ? "default" : "secondary"}
                        className={book.available ? "bg-primary" : ""}
                      >
                        {book.available ? "Available" : "Issued"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(book)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteBook(book.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-serif">Edit Book</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-author">Author</Label>
                  <Input
                    id="edit-author"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-isbn">ISBN</Label>
                  <Input
                    id="edit-isbn"
                    value={formData.isbn}
                    onChange={(e) =>
                      setFormData({ ...formData, isbn: e.target.value })
                    }
                  />
                </div>
                <Button onClick={handleEditBook} className="w-full">
                  Update Book
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </Layout>
  );
}
