
import React, { createContext, useState, useContext, useEffect } from 'react';

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Load notes from localStorage on mount
  useEffect(() => {
    const storedNotes = localStorage.getItem('studiora_notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      // Initialize with sample notes if none exist
      const sampleNotes: Note[] = [
        {
          id: 'note-1',
          title: 'Biology Fundamentals',
          content: 'Cell theory states that all living organisms are composed of cells, cells are the basic unit of structure and function in living things, and all cells come from pre-existing cells.',
          category: 'Science',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'note-2',
          title: 'Linear Algebra Overview',
          content: 'A matrix is a rectangular array of numbers arranged in rows and columns. Matrix operations include addition, scalar multiplication, and matrix multiplication.',
          category: 'Mathematics',
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      setNotes(sampleNotes);
      localStorage.setItem('studiora_notes', JSON.stringify(sampleNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studiora_notes', JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newNote: Note = {
      ...note,
      id: 'note-' + Math.random().toString(36).substr(2, 9),
      createdAt: now,
      updatedAt: now
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // Update an existing note
  const updateNote = (id: string, noteUpdate: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? { ...note, ...noteUpdate, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  // Delete a note
  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  // Get a specific note
  const getNote = (id: string) => {
    return notes.find((note) => note.id === id);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        updateNote,
        deleteNote,
        getNote
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
