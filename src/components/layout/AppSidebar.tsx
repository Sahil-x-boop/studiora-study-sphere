
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile'; 
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Clock, CheckSquare, BookOpen, LogOut, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export function AppSidebar() {
  const { state, setOpen } = useSidebar();
  const isMobile = useIsMobile();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate('/');
  };

  const toggleSidebar = () => {
    setOpen(!collapsed);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const navItems = [
    { icon: <Home />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Clock />, label: 'Timer', path: '/timer' },
    { icon: <CheckSquare />, label: 'Tasks', path: '/tasks' },
    { icon: <BookOpen />, label: 'Notes', path: '/notes' },
  ];

  return (
    <div
      className={`border-r bg-sidebar-background text-sidebar-foreground transition-all ${
        collapsed ? 'w-16' : 'w-64'
      } min-h-screen`}
    >
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 text-sidebar-foreground"
          onClick={toggleSidebar}
        >
          <Menu />
        </Button>
      )}
      
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <h1 className="text-xl font-bold text-sidebar-primary">StudiOra</h1>
        )}
        {collapsed && <div className="text-2xl font-bold text-sidebar-primary">S</div>}
      </div>
      
      {user && (
        <div className={`mb-4 ${collapsed ? 'px-2' : 'px-4'} py-2`}>
          <div className={`flex ${collapsed ? 'justify-center' : 'items-center space-x-3'}`}>
            <Avatar className={collapsed ? "h-10 w-10" : "h-9 w-9"}>
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                {user?.name ? getInitials(user.name) : 'U'}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-sidebar-foreground/70">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <Separator className="bg-sidebar-border" />
      
      <nav className="mt-4 space-y-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center rounded-md px-3 py-2 transition-colors 
              ${isActive 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
              } ${collapsed ? 'justify-center' : 'space-x-3'}`
            }
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      
      {user && (
        <>
          <div className="absolute bottom-4 w-full px-2">
            <Button
              variant="ghost"
              className={`w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground ${
                collapsed ? 'justify-center' : ''
              }`}
              onClick={handleLogout}
            >
              <LogOut className={collapsed ? '' : 'mr-2'} />
              {!collapsed && <span>Log out</span>}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
