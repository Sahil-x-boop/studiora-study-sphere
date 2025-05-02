
import React, { useState } from 'react';
import { useNotes, Note } from '@/contexts/NotesContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, PlusCircle, BookOpen, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';

const NotesPage: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState<Partial<Note>>({
    title: '',
    content: '',
    category: 'Uncategorized'
  });

  // Filter notes based on search query and category
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? note.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for the filter dropdown
  const categories = Array.from(new Set(notes.map((note) => note.category)));

  // Handle new note creation
  const handleCreateNote = () => {
    if (!currentNote.title || !currentNote.content) {
      toast({
        title: "Missing information",
        description: "Please provide both title and content for your note.",
        variant: "destructive",
      });
      return;
    }

    addNote({
      title: currentNote.title,
      content: currentNote.content,
      category: currentNote.category || 'Uncategorized'
    });

    toast({
      title: "Note created",
      description: "Your note has been created successfully."
    });

    // Reset the form and close the dialog
    setCurrentNote({ title: '', content: '', category: 'Uncategorized' });
    setIsCreating(false);
  };

  // Handle note edit
  const handleEditNote = () => {
    if (!currentNote.id || !currentNote.title || !currentNote.content) {
      toast({
        title: "Missing information",
        description: "Please provide both title and content for your note.",
        variant: "destructive",
      });
      return;
    }

    updateNote(currentNote.id, {
      title: currentNote.title,
      content: currentNote.content,
      category: currentNote.category || 'Uncategorized'
    });

    toast({
      title: "Note updated",
      description: "Your note has been updated successfully."
    });

    // Reset the form and close the dialog
    setCurrentNote({ title: '', content: '', category: 'Uncategorized' });
    setIsEditing(false);
  };

  // Handle note deletion
  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    toast({
      title: "Note deleted",
      description: "Your note has been deleted successfully."
    });
  };

  // Start editing a note
  const startEdit = (note: Note) => {
    setCurrentNote(note);
    setIsEditing(true);
  };

  return (
    <div className="container py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-studiora-950">Study Notes</h1>
        <p className="text-gray-500">Organize your study materials and important concepts</p>
      </header>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search notes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-studiora-600 hover:bg-studiora-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </div>
      </div>

      {/* Notes grid */}
      {filteredNotes.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center rounded-lg bg-studiora-50 text-center">
          <BookOpen className="mb-2 h-10 w-10 text-studiora-300" />
          <h3 className="text-xl font-medium text-studiora-800">No notes found</h3>
          <p className="text-gray-500">
            {searchQuery || categoryFilter
              ? "Try changing your search or filter criteria"
              : "Create your first note to get started"}
          </p>
          {!searchQuery && !categoryFilter && (
            <Button
              variant="outline"
              onClick={() => setIsCreating(true)}
              className="mt-4 border-studiora-300 text-studiora-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Note
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="line-clamp-1">{note.title}</CardTitle>
                    <CardDescription>
                      Updated {format(new Date(note.updatedAt), 'PP')}
                    </CardDescription>
                  </div>
                  <Badge variant="studiora">{note.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="line-clamp-4 text-sm text-gray-600">{note.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-studiora-700"
                  onClick={() => startEdit(note)}
                >
                  <Pencil className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Create Note Dialog */}
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
            <DialogDescription>
              Add a new study note with title, content, and category
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={currentNote.title}
                onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                placeholder="Note title"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Select
                value={currentNote.category}
                onValueChange={(value) => setCurrentNote({ ...currentNote, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Languages">Languages</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                value={currentNote.content}
                onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                placeholder="Note content"
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateNote} className="bg-studiora-600 hover:bg-studiora-700">
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Note Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
            <DialogDescription>
              Update your study note details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="edit-title"
                value={currentNote.title}
                onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-category" className="text-sm font-medium">
                Category
              </label>
              <Select
                value={currentNote.category}
                onValueChange={(value) => setCurrentNote({ ...currentNote, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Languages">Languages</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="edit-content"
                value={currentNote.content}
                onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditNote} className="bg-studiora-600 hover:bg-studiora-700">
              Update Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotesPage;
