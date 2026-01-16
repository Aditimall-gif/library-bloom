import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Mail, Lock, User, Hash, Phone, ArrowRight } from "lucide-react";

export default function StudentAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    studentId: "",
    phone: "",
  });

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
          navigate("/students");
        }
      } else {
        // Validation for registration
        if (!formData.fullName.trim()) {
          toast({
            title: "Validation Error",
            description: "Please enter your full name.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        if (!formData.studentId.trim()) {
          toast({
            title: "Validation Error",
            description: "Please enter your student ID.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.fullName,
          formData.studentId,
          formData.phone
        );

        if (error) {
          toast({
            title: "Registration Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Registration Successful!",
            description: "Your account has been created. You can now access the student portal.",
          });
          navigate("/students");
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="hero-section text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-accent" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {isLogin ? "Student Login" : "Student Registration"}
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            {isLogin
              ? "Access your library account to view borrowed books and manage your reading list"
              : "Create your account to start borrowing books from Evergreen Library"}
          </p>
        </div>
      </section>

      {/* Auth Form */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required={!isLogin}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentId" className="flex items-center gap-2">
                        <Hash className="h-4 w-4" />
                        Student ID
                      </Label>
                      <Input
                        id="studentId"
                        name="studentId"
                        type="text"
                        placeholder="e.g., STU-2024-001"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        required={!isLogin}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number (Optional)
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={6}
                    className="h-12"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? (
                    "Please wait..."
                  ) : (
                    <>
                      {isLogin ? "Login" : "Create Account"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary"
                >
                  {isLogin ? "Register here" : "Login here"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
