
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { PomodoroTimer } from '@/components/timer/PomodoroTimer';
import { TaskList } from '@/components/tasks/TaskList';
import { StudyStats } from '@/components/dashboard/StudyStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, BookOpen, CheckSquare, Lightbulb, Users, CalendarRange } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const displayName = user?.name || user?.email?.split('@')[0] || 'Student';
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="container py-8 max-w-7xl">
            <header className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-studiora-950">Welcome back, {displayName}!</h1>
                  <p className="text-gray-500">Track your progress, manage tasks, and focus on your studies.</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button 
                    variant="outline" 
                    className="border-studiora-200 text-studiora-700 hover:bg-studiora-50"
                    onClick={() => navigate('/dashboard')}
                  >
                    <CalendarRange className="mr-2 h-4 w-4" />
                    Weekly Planner
                  </Button>
                  <Button
                    className="bg-studiora-600 hover:bg-studiora-700 text-white"
                    onClick={() => navigate('/study-groups')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Study Group
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-studiora-50 to-studiora-100 border-studiora-200">
                  <CardContent className="p-4 flex items-center">
                    <div className="p-3 rounded-full bg-studiora-600 text-white mr-4">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Today's Study Goal</p>
                      <p className="text-xl font-bold text-studiora-800">4 hours</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-studiora-50 to-studiora-100 border-studiora-200">
                  <CardContent className="p-4 flex items-center">
                    <div className="p-3 rounded-full bg-studiora-600 text-white mr-4">
                      <CheckSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Tasks Due Today</p>
                      <p className="text-xl font-bold text-studiora-800">3 tasks</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-studiora-50 to-studiora-100 border-studiora-200">
                  <CardContent className="p-4 flex items-center">
                    <div className="p-3 rounded-full bg-studiora-600 text-white mr-4">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Study Streak</p>
                      <p className="text-xl font-bold text-studiora-800">5 days</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-studiora-50 to-studiora-100 border-studiora-200">
                  <CardContent className="p-4 flex items-center">
                    <div className="p-3 rounded-full bg-studiora-600 text-white mr-4">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Focus Score</p>
                      <p className="text-xl font-bold text-studiora-800">85%</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </header>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-studiora-800 mb-4 flex items-center">
                <span className="p-1.5 rounded-md bg-studiora-100 text-studiora-600 mr-2">
                  <CalendarRange className="h-5 w-5" />
                </span>
                Study Overview
              </h2>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <StudyStats />
              </div>
            </section>
            
            <div className="grid gap-6 md:grid-cols-2">
              <section>
                <h2 className="text-xl font-semibold text-studiora-800 mb-4 flex items-center">
                  <span className="p-1.5 rounded-md bg-studiora-100 text-studiora-600 mr-2">
                    <Clock className="h-5 w-5" />
                  </span>
                  Focus Timer
                </h2>
                <PomodoroTimer />
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    onClick={() => navigate('/timer')}
                    variant="outline"
                    className="text-studiora-700 border-studiora-200"
                  >
                    View Timer Page
                  </Button>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-studiora-800 mb-4 flex items-center">
                  <span className="p-1.5 rounded-md bg-studiora-100 text-studiora-600 mr-2">
                    <CheckSquare className="h-5 w-5" />
                  </span>
                  Your Tasks
                </h2>
                <TaskList maxItems={3} showViewAll={true} />
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    onClick={() => navigate('/tasks')}
                    variant="outline"
                    className="text-studiora-700 border-studiora-200"
                  >
                    View All Tasks
                  </Button>
                </div>
              </section>
            </div>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-studiora-800 mb-4 flex items-center">
                <span className="p-1.5 rounded-md bg-studiora-100 text-studiora-600 mr-2">
                  <Lightbulb className="h-5 w-5" />
                </span>
                Study Tips
              </h2>
              <Card className="bg-studiora-50 border-studiora-100">
                <CardContent className="p-6 text-studiora-800">
                  <h3 className="font-medium mb-3 text-lg">Tip of the Day</h3>
                  <p className="text-sm mb-3">
                    Try the "Feynman Technique" - Explain concepts in simple language as if teaching
                    someone else. This helps identify gaps in your understanding and reinforces learning.
                  </p>
                  <div className="bg-white p-3 rounded-md border border-studiora-100">
                    <h4 className="font-medium text-sm mb-1">Did you know?</h4>
                    <p className="text-xs text-gray-600">
                      Research shows that studying in multiple shorter sessions with breaks in between is more effective 
                      than one long marathon session. This is called "spaced repetition."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
