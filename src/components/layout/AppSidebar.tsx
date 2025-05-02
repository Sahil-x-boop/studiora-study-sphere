
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  BookCheck, 
  CheckSquare, 
  BarChart2, 
  Users, 
  Calendar, 
  Settings,
  Menu,
  Bookmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarTrigger, 
  SidebarFooter, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type NavItem = {
  title: string;
  icon: React.ElementType;
  href: string;
};

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: BarChart2,
    href: '/',
  },
  {
    title: 'Study Timer',
    icon: Clock,
    href: '/timer',
  },
  {
    title: 'Tasks',
    icon: CheckSquare,
    href: '/tasks',
  },
  {
    title: 'Notes',
    icon: Bookmark,
    href: '/notes',
  },
  {
    title: 'Calendar',
    icon: Calendar,
    href: '/calendar',
  },
];

const communityNavItems: NavItem[] = [
  {
    title: 'Study Groups',
    icon: Users,
    href: '/groups',
  },
  {
    title: 'Courses',
    icon: BookCheck,
    href: '/courses',
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-2 py-4">
        <div className="flex items-center px-2">
          <div className="flex items-center space-x-2">
            <BookCheck className="h-8 w-8 text-studiora-500" />
            <span className="font-bold text-xl text-white">Studiora</span>
          </div>
          <div className="ml-auto flex items-center">
            <SidebarTrigger asChild>
              <Button variant="ghost" size="icon" className="text-sidebar-foreground">
                <Menu className="h-5 w-5" />
              </Button>
            </SidebarTrigger>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <div className="mb-10">
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild>
                  <Link 
                    to={item.href} 
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
        
        <div className="mb-4">
          <h2 className="mb-2 px-4 text-xs font-semibold text-sidebar-foreground/60">
            COMMUNITY
          </h2>
          <SidebarMenu>
            {communityNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild>
                  <Link 
                    to={item.href} 
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border px-2 py-4">
        <div className="flex items-center px-3 py-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback className="bg-studiora-700 text-white">JD</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
            <p className="text-xs text-sidebar-foreground/60">Premium User</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto text-sidebar-foreground">
            <Link to="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
