
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Bell, Volume2, VolumeX, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

// Default timer settings
const DEFAULT_TIMER_SETTINGS = {
  focus: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
};

interface PomodoroTimerProps {
  compact?: boolean;
}

export function PomodoroTimer({ compact = false }: PomodoroTimerProps) {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMER_SETTINGS[mode]);
  const [isActive, setIsActive] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoStartBreaks, setAutoStartBreaks] = useState(true);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);
  const { toast } = useToast();

  // Reset timer when mode changes
  useEffect(() => {
    setTimeLeft(DEFAULT_TIMER_SETTINGS[mode]);
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
      
      // Play notification sound if enabled
      if (soundEnabled) {
        const audio = new Audio('/notification.mp3');
        audio.play().catch(e => console.error("Could not play notification sound", e));
      }
      
      if (mode === 'focus') {
        setPomodorosCompleted((prev) => prev + 1);
        toast({
          title: "Focus session completed!",
          description: "Time for a break.",
        });
        
        // Automatically switch to break after focus session
        const nextMode = pomodorosCompleted % 4 === 3 ? 'longBreak' : 'shortBreak';
        setMode(nextMode);
        
        // Auto start break if enabled
        if (autoStartBreaks) {
          setTimeout(() => setIsActive(true), 500);
        }
      } else {
        toast({
          title: "Break time over!",
          description: "Ready to focus again?",
        });
        // Automatically switch to focus after break
        setMode('focus');
        
        // Auto start focus session if enabled
        if (autoStartPomodoros) {
          setTimeout(() => setIsActive(true), 500);
        }
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, pomodorosCompleted, toast, soundEnabled, autoStartBreaks, autoStartPomodoros]);

  const toggleTimer = () => {
    setIsActive((prev) => !prev);
  };

  const resetTimer = () => {
    setTimeLeft(DEFAULT_TIMER_SETTINGS[mode]);
    setIsActive(false);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = (): number => {
    const totalTime = DEFAULT_TIMER_SETTINGS[mode];
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <Card className="w-full">
      <CardHeader className={compact ? "px-4 py-3" : ""}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-center text-studiora-800">Pomodoro Timer</CardTitle>
          {!compact && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="h-8 w-8"
                  >
                    {soundEnabled ? 
                      <Volume2 className="h-4 w-4 text-studiora-600" /> : 
                      <VolumeX className="h-4 w-4 text-gray-400" />
                    }
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{soundEnabled ? 'Sound On' : 'Sound Off'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      <CardContent className={compact ? "px-4 pb-4 pt-0" : ""}>
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
          
          <div className="flex flex-col items-center">
            <div className={`text-6xl font-bold mb-6 text-studiora-800 ${compact ? 'text-5xl' : ''}`}>
              {formatTime(timeLeft)}
            </div>
            <Progress value={calculateProgress()} className="mb-6 h-2 w-full" />
            
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
            
            {!compact && (
              <>
                <div className="mt-6 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-studiora-500 mr-2" />
                  <span>{pomodorosCompleted} pomodoros completed today</span>
                </div>
                
                <div className="mt-6 w-full">
                  <div className="bg-studiora-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <Bell className="h-4 w-4 text-studiora-600" />
                        <Label htmlFor="auto-start-breaks" className="text-sm">Auto-start breaks</Label>
                      </div>
                      <Switch 
                        id="auto-start-breaks"
                        checked={autoStartBreaks}
                        onCheckedChange={setAutoStartBreaks}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <Bell className="h-4 w-4 text-studiora-600" />
                        <Label htmlFor="auto-start-pomodoros" className="text-sm">Auto-start pomodoros</Label>
                      </div>
                      <Switch 
                        id="auto-start-pomodoros"
                        checked={autoStartPomodoros}
                        onCheckedChange={setAutoStartPomodoros}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
