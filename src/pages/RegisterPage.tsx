
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = await register(data.name, data.email, data.password);
      
      if (success) {
        toast({
          title: "Registration successful",
          description: "Welcome to StudiOra!",
        });
        navigate('/');
      } else {
        toast({
          title: "Registration failed",
          description: "Please check your information and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-studiora-50 to-studiora-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-studiora-950">Create an account</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-studiora-600 hover:bg-studiora-700">
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-studiora-600 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
