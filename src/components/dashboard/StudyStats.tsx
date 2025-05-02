
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Clock, Calendar, BookCheck, BarChart2 } from 'lucide-react';

// Sample data
const weeklyStudyData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.2 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 4.0 },
  { day: 'Fri', hours: 2.7 },
  { day: 'Sat', hours: 0.5 },
  { day: 'Sun', hours: 1.0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white shadow-lg border border-gray-200 rounded-md">
        <p className="font-medium text-studiora-800">{`${label}: ${payload[0].value} hours`}</p>
      </div>
    );
  }
  return null;
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
}

function StatsCard({ title, value, icon, description }: StatsCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-studiora-100 text-studiora-700">
            {icon}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-studiora-800">{value}</p>
            {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StudyStats() {
  // Calculate total study hours from the weekly data
  const totalHours = weeklyStudyData.reduce((sum, day) => sum + day.hours, 0);
  const streak = 5; // Sample data
  const completedTasks = 12; // Sample data
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Study Time"
        value={`${totalHours} hours`}
        icon={<Clock className="h-5 w-5" />}
        description="This week"
      />
      <StatsCard
        title="Current Streak"
        value={`${streak} days`}
        icon={<Calendar className="h-5 w-5" />}
      />
      <StatsCard
        title="Tasks Completed"
        value={`${completedTasks}`}
        icon={<BookCheck className="h-5 w-5" />}
        description="This week"
      />
      <StatsCard
        title="Focus Score"
        value="85%"
        icon={<BarChart2 className="h-5 w-5" />}
        description="Based on 15 sessions"
      />
      
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="text-studiora-800">Weekly Study Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyStudyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis unit="h" />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="hours" 
                  fill="#4078c1" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
