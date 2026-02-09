'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth-client';

// Define the validation schema using Zod
const signupSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: '/login',
      });

      if (result?.error) {
        setError('root', {
          type: 'manual',
          message: result.error.message || 'Registration failed',
        });
      } else {
        // Registration successful, redirect to login
        router.push('/login');
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-800">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            <div className="text-red-600 bg-red-50 p-3 rounded-lg text-center">
              {errors.root.message}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                Full Name
              </label>
              <input
                id="name"
                {...register('name')}
                type="text"
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.name ? 'border-red-500' : 'border-neutral-300'
                } rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email address
              </label>
              <input
                id="email"
                {...register('email')}
                type="email"
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-neutral-300'
                } rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <input
                id="password"
                {...register('password')}
                type="password"
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-neutral-300'
                } rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 btn-hover"
            >
              Sign up
            </button>
          </div>
        </form>
        
        <div className="text-center text-sm text-neutral-600">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}