
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

const timerSettings = {
  focus: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
};

export function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(timerSettings[mode]);
  const [isActive, setIsActive] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const { toast } = useToast();

  // Reset timer when mode changes
  useEffect(() => {
    setTimeLeft(timerSettings[mode]);
    setIsActive(false);
  }, [mode]);

  // Timer countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      
      if (mode === 'focus') {
        setPomodorosCompleted((prev) => prev + 1);
        toast({
          title: "Focus session completed!",
          description: "Time for a break.",
        });
        
        // Automatically switch to break after focus session
        setMode(pomodorosCompleted % 4 === 3 ? 'longBreak' : 'shortBreak');
      } else {
        toast({
          title: "Break time over!",
          description: "Ready to focus again?",
        });
        // Automatically switch to focus after break
        setMode('focus');
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, pomodorosCompleted, toast]);

  const toggleTimer = () => {
    setIsActive((prev) => !prev);
  };

  const resetTimer = () => {
    setTimeLeft(timerSettings[mode]);
    setIsActive(false);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = (): number => {
    const totalTime = timerSettings[mode];
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-studiora-800">Pomodoro Timer</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="focus" value={mode} onValueChange={(v) => setMode(v as TimerMode)} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="focus" className="data-[state=active]:bg-studiora-500 data-[state=active]:text-white">
              Focus
            </TabsTrigger>
            <TabsTrigger value="shortBreak" className="data-[state=active]:bg-studiora-500 data-[state=active]:text-white">
              Short Break
            </TabsTrigger>
            <TabsTrigger value="longBreak" className="data-[state=active]:bg-studiora-500 data-[state=active]:text-white">
              Long Break
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="focus" className="mt-0">
            <div className="flex flex-col items-center">
              <div className="text-6xl font-bold mb-6 text-studiora-800">{formatTime(timeLeft)}</div>
              <Progress value={calculateProgress()} className="mb-6 h-2" />
              
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTimer}
                  className="border-studiora-500 text-studiora-500 hover:bg-studiora-50"
                >
                  {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetTimer}
                  className="border-studiora-500 text-studiora-500 hover:bg-studiora-50"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="mt-6 flex items-center">
                <CheckCircle2 className="h-5 w-5 text-studiora-500 mr-2" />
                <span>{pomodorosCompleted} pomodoros completed today</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="shortBreak" className="mt-0">
            <div className="flex flex-col items-center">
              <div className="text-6xl font-bold mb-6 text-studiora-800">{formatTime(timeLeft)}</div>
              <Progress value={calculateProgress()} className="mb-6 h-2" />
              
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTimer}
                  className="border-studiora-500 text-studiora-500 hover:bg-studiora-50"
                >
                  {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetTimer}
                  className="border-studiora-500 text-studiora-500 hover:bg-studiora-50"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="longBreak" className="mt-0">
            <div className="flex flex-col items-center">
              <div className="text-6xl font-bold mb-6 text-studiora-800">{formatTime(timeLeft)}</div>
              <Progress value={calculateProgress()} className="mb-6 h-2" />
              
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTimer}
                  className="border-studiora-500 text-studiora-500 hover:bg-studiora-50"
                >
                  {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetTimer}
                  className="border-studiora-500 text-studiora-500 hover:bg-studiora-50"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
