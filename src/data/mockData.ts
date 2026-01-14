export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  available: boolean;
  coverColor: string;
}

export interface IssuedBook {
  id: string;
  bookId: string;
  studentName: string;
  studentId: string;
  issueDate: string;
  dueDate: string;
  returned: boolean;
}

export const categories = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science",
  "History",
  "Technology",
  "Literature",
];

export const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    isbn: "978-0743273565",
    available: true,
    coverColor: "hsl(150 35% 25%)",
  },
  {
    id: "2",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    isbn: "978-0553380163",
    available: true,
    coverColor: "hsl(220 60% 35%)",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    isbn: "978-0451524935",
    available: false,
    coverColor: "hsl(0 50% 35%)",
  },
  {
    id: "4",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    isbn: "978-0062316097",
    available: true,
    coverColor: "hsl(38 80% 45%)",
  },
  {
    id: "5",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    isbn: "978-0132350884",
    available: true,
    coverColor: "hsl(200 60% 35%)",
  },
  {
    id: "6",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Literature",
    isbn: "978-0141439518",
    available: false,
    coverColor: "hsl(320 40% 40%)",
  },
  {
    id: "7",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    category: "Science",
    isbn: "978-0199291151",
    available: true,
    coverColor: "hsl(160 50% 30%)",
  },
  {
    id: "8",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Literature",
    isbn: "978-0446310789",
    available: true,
    coverColor: "hsl(30 50% 35%)",
  },
];

export const issuedBooks: IssuedBook[] = [
  {
    id: "1",
    bookId: "3",
    studentName: "Alice Johnson",
    studentId: "STU001",
    issueDate: "2024-01-05",
    dueDate: "2024-01-19",
    returned: false,
  },
  {
    id: "2",
    bookId: "6",
    studentName: "Bob Smith",
    studentId: "STU002",
    issueDate: "2024-01-08",
    dueDate: "2024-01-22",
    returned: false,
  },
  {
    id: "3",
    bookId: "1",
    studentName: "Carol White",
    studentId: "STU003",
    issueDate: "2023-12-20",
    dueDate: "2024-01-03",
    returned: true,
  },
];
