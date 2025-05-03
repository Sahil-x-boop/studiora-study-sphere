
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Users, BookOpen, Calendar, UserPlus, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  created_by: string;
  created_at: string;
  members_count: number;
}

const StudyGroupPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewGroupForm, setShowNewGroupForm] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    subject: ''
  });

  useEffect(() => {
    const fetchStudyGroups = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('study_groups')
          .select('*');
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setStudyGroups(data);
        }
      } catch (error) {
        console.error('Error fetching study groups:', error);
        toast({
          title: "Failed to load study groups",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudyGroups();
  }, [toast]);
  
  const handleCreateGroup = async () => {
    if (!user) return;
    
    if (!newGroup.name || !newGroup.subject) {
      toast({
        title: "Missing information",
        description: "Please provide a name and subject for your study group",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('study_groups')
        .insert([{
          name: newGroup.name,
          description: newGroup.description,
          subject: newGroup.subject,
          created_by: user.id,
        }])
        .select();
        
      if (error) throw error;
      
      if (data) {
        setStudyGroups([...studyGroups, data[0]]);
        setNewGroup({ name: '', description: '', subject: '' });
        setShowNewGroupForm(false);
        
        toast({
          title: "Study group created",
          description: "Your study group has been created successfully",
        });
      }
    } catch (error) {
      console.error('Error creating study group:', error);
      toast({
        title: "Failed to create study group",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('group_members')
        .insert([{
          group_id: groupId,
          user_id: user.id,
        }]);
        
      if (error) throw error;
      
      toast({
        title: "Joined study group",
        description: "You have successfully joined the study group",
      });
    } catch (error) {
      console.error('Error joining study group:', error);
      toast({
        title: "Failed to join study group",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="container py-8 max-w-6xl">
            <header className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-studiora-950 flex items-center">
                    <Users className="mr-2 h-7 w-7 text-studiora-600" />
                    Study Groups
                  </h1>
                  <p className="text-gray-500">
                    Join study groups or create your own to collaborate with peers
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button 
                    className="bg-studiora-600 hover:bg-studiora-700 text-white"
                    onClick={() => setShowNewGroupForm(true)}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create New Group
                  </Button>
                </div>
              </div>
            </header>
            
            {showNewGroupForm && (
              <Card className="mb-8 border-studiora-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold text-studiora-900">
                    Create a New Study Group
                  </CardTitle>
                  <CardDescription>
                    Fill in the details to create your study group
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="groupName" className="text-sm font-medium">Group Name</label>
                    <Input 
                      id="groupName" 
                      value={newGroup.name} 
                      onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                      placeholder="e.g., Calculus Study Group"
                    />
                  </div>
                  <div>
                    <label htmlFor="groupSubject" className="text-sm font-medium">Subject</label>
                    <Input 
                      id="groupSubject" 
                      value={newGroup.subject} 
                      onChange={(e) => setNewGroup({...newGroup, subject: e.target.value})}
                      placeholder="e.g., Mathematics, Biology, Computer Science"
                    />
                  </div>
                  <div>
                    <label htmlFor="groupDescription" className="text-sm font-medium">Description</label>
                    <Textarea 
                      id="groupDescription" 
                      value={newGroup.description} 
                      onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                      placeholder="Describe the focus and goals of your study group"
                      rows={3}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNewGroupForm(false)}>Cancel</Button>
                  <Button 
                    className="bg-studiora-600 hover:bg-studiora-700"
                    onClick={handleCreateGroup}
                  >
                    Create Group
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            <div>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin inline-block w-8 h-8 border-4 border-studiora-600 border-t-transparent rounded-full mb-4"></div>
                  <p className="text-gray-500">Loading study groups...</p>
                </div>
              ) : studyGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {studyGroups.map((group) => (
                    <Card key={group.id} className="border-studiora-100 hover:border-studiora-300 transition-colors duration-200">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl font-semibold text-studiora-900">
                            {group.name}
                          </CardTitle>
                          <Badge variant="outline" className="bg-studiora-50 text-studiora-700 border-studiora-200">
                            {group.subject}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm text-gray-500">
                          Created on {new Date(group.created_at).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-gray-600 text-sm">{group.description}</p>
                        <div className="flex items-center mt-3 text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{group.members_count || 0} members</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <div className="flex gap-2 w-full">
                          <Button 
                            className="flex-1 bg-studiora-600 hover:bg-studiora-700"
                            onClick={() => handleJoinGroup(group.id)}
                          >
                            Join Group
                          </Button>
                          <Button variant="outline" className="flex-1 border-studiora-200">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            View Discussions
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                  <Users className="h-12 w-12 text-studiora-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No study groups yet</h3>
                  <p className="text-gray-500 mb-4">Create the first study group to get started!</p>
                  <Button 
                    className="bg-studiora-600 hover:bg-studiora-700"
                    onClick={() => setShowNewGroupForm(true)}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create New Group
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default StudyGroupPage;
