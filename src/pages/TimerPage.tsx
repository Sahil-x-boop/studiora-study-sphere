
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { PomodoroTimer } from '@/components/timer/PomodoroTimer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CalendarDays, Music, Settings } from 'lucide-react';

const TimerPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <div className="container py-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-studiora-950">Study Timer</h1>
              <p className="text-gray-500">Focus on your work with timed study sessions.</p>
            </header>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="col-span-2">
                <PomodoroTimer />
                
                <div className="mt-6 grid gap-4 grid-cols-2">
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="text-3xl font-bold text-studiora-800">15</div>
                      <div className="text-sm text-gray-500">Sessions Today</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="text-3xl font-bold text-studiora-800">4.5h</div>
                      <div className="text-sm text-gray-500">Study Time Today</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-studiora-800 mb-4">Timer Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">Focus Time</label>
                        <select className="w-full border border-gray-200 rounded-md p-2">
                          <option>25 minutes</option>
                          <option>30 minutes</option>
                          <option>45 minutes</option>
                          <option>50 minutes</option>
                          <option>60 minutes</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">Short Break</label>
                        <select className="w-full border border-gray-200 rounded-md p-2">
                          <option>5 minutes</option>
                          <option>10 minutes</option>
                          <option>15 minutes</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">Long Break</label>
                        <select className="w-full border border-gray-200 rounded-md p-2">
                          <option>15 minutes</option>
                          <option>20 minutes</option>
                          <option>30 minutes</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">Long Break Interval</label>
                        <select className="w-full border border-gray-200 rounded-md p-2">
                          <option>After 4 sessions</option>
                          <option>After 3 sessions</option>
                          <option>After 5 sessions</option>
                        </select>
                      </div>
                      
                      <Button className="w-full studiora-button-gradient text-white">
                        <Settings className="mr-2 h-4 w-4" />
                        Save Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6 space-y-4">
                  <Button variant="outline" className="w-full border-studiora-200 text-studiora-700">
                    <Music className="mr-2 h-4 w-4" />
                    Study Music
                  </Button>
                  
                  <Button variant="outline" className="w-full border-studiora-200 text-studiora-700">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    View Study History
                  </Button>
                </div>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-studiora-800 mb-4">Study Tips</h2>
              <div className="bg-studiora-50 border border-studiora-100 rounded-lg p-6 text-studiora-800">
                <h3 className="font-medium mb-2">The Pomodoro Technique</h3>
                <p className="text-sm">The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for tomato, after the tomato-shaped kitchen timer Cirillo used as a university student.</p>
                
                <h3 className="font-medium mt-4 mb-2">Benefits:</h3>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li>Improves focus and concentration</li>
                  <li>Reduces mental fatigue</li>
                  <li>Increases accountability</li>
                  <li>Helps manage distractions</li>
                  <li>Creates a better work/break balance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TimerPage;
