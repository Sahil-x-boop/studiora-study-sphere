
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, CheckSquare, Lightbulb, Brain } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-studiora-50 to-studiora-100">
        <div className="container mx-auto px-6 py-16 text-center md:px-12 lg:py-20">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-studiora-950 md:text-5xl lg:text-6xl">
            Elevate Your <span className="studiora-gradient-text">Study Experience</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-studiora-800">
            The all-in-one platform designed to optimize your learning efficiency, 
            track your progress, and help you achieve academic excellence.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
            <Button 
              onClick={() => navigate('/register')} 
              className="bg-studiora-600 px-8 py-3 text-lg hover:bg-studiora-700"
            >
              Get Started
            </Button>
            <Button 
              onClick={() => navigate('/login')} 
              variant="outline" 
              className="border-studiora-300 px-8 py-3 text-lg text-studiora-700 hover:bg-studiora-50"
            >
              Log In
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-studiora-950 md:text-4xl">
            Features to Transform Your Study Habits
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Pomodoro Timer Feature */}
            <div className="rounded-lg p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-studiora-100">
                <Clock className="h-6 w-6 text-studiora-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-studiora-900">Pomodoro Timer</h3>
              <p className="text-gray-600">
                Optimize your focus with our customizable Pomodoro timer. Work in focused intervals with scheduled breaks.
              </p>
            </div>

            {/* Task Management Feature */}
            <div className="rounded-lg p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-studiora-100">
                <CheckSquare className="h-6 w-6 text-studiora-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-studiora-900">Task Management</h3>
              <p className="text-gray-600">
                Never miss a deadline again. Organize assignments, set priorities, and track your progress.
              </p>
            </div>

            {/* Study Notes Feature */}
            <div className="rounded-lg p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-studiora-100">
                <BookOpen className="h-6 w-6 text-studiora-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-studiora-900">Study Notes</h3>
              <p className="text-gray-600">
                Create, organize, and review your study notes efficiently. Add tags for easy retrieval.
              </p>
            </div>

            {/* Progress Analytics Feature */}
            <div className="rounded-lg p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-studiora-100">
                <Brain className="h-6 w-6 text-studiora-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-studiora-900">Progress Analytics</h3>
              <p className="text-gray-600">
                Visualize your study habits and progress over time with detailed analytics and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-studiora-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold text-studiora-950">Ready to elevate your study experience?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-studiora-800">
            Join thousands of students who have transformed their study habits and academic performance with StudiOra.
          </p>
          <Button 
            onClick={() => navigate('/register')} 
            className="bg-studiora-600 px-8 py-3 text-lg hover:bg-studiora-700"
          >
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>© 2025 StudiOra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
