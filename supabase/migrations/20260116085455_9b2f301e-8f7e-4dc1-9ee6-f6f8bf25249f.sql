-- Create student profiles table
CREATE TABLE public.student_profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    student_id TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for student access
CREATE POLICY "Students can view their own profile" 
ON public.student_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Students can update their own profile" 
ON public.student_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Students can insert their own profile" 
ON public.student_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_student_profiles_updated_at
BEFORE UPDATE ON public.student_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create borrowed_books table to track checkouts
CREATE TABLE public.borrowed_books (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    book_id TEXT NOT NULL,
    book_title TEXT NOT NULL,
    book_author TEXT NOT NULL,
    borrowed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    returned_at TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL DEFAULT 'borrowed' CHECK (status IN ('borrowed', 'returned', 'overdue'))
);

-- Enable RLS on borrowed_books
ALTER TABLE public.borrowed_books ENABLE ROW LEVEL SECURITY;

-- Students can view their own borrowed books
CREATE POLICY "Students can view their own borrowed books"
ON public.borrowed_books
FOR SELECT
USING (
    student_id IN (
        SELECT id FROM public.student_profiles WHERE user_id = auth.uid()
    )
);

-- Students can borrow books
CREATE POLICY "Students can borrow books"
ON public.borrowed_books
FOR INSERT
WITH CHECK (
    student_id IN (
        SELECT id FROM public.student_profiles WHERE user_id = auth.uid()
    )
);

-- Students can return books (update status)
CREATE POLICY "Students can return books"
ON public.borrowed_books
FOR UPDATE
USING (
    student_id IN (
        SELECT id FROM public.student_profiles WHERE user_id = auth.uid()
    )
);