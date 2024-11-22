import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import NoteInput from '../components/NoteInput/NoteInput';
import NoteList from '../components/NoteList/NoteList';
import NoteDetail from '../components/NoteDetail/NoteDetail';
import { initialNotes } from '../utils/local-data.js';
import './HomePage.css';

function HomePage() {
  const [notes, setNotes] = useState(initialNotes);
  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [titleCharacterLimit, setTitleCharacterLimit] = useState(50);
  const [selectedNote, setSelectedNote] = useState(null);

  const addNote = () => {
    const trimmedTitle = inputTitle.trim();
    const trimmedBody = inputBody.trim();
    
    if (trimmedTitle.length > 0 && trimmedTitle.length <= 50 && trimmedBody.length > 0) {
      const newNote = {
        id: +new Date(),
        title: trimmedTitle,
        body: trimmedBody,
        archived: false,
        createdAt: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
      setInputTitle("");
      setInputBody("");
      setTitleCharacterLimit(50);
    }
  };

  const handleTitleChange = (event) => {
    const maxChar = 50;
    const newTitle = event.target.value;
    if (newTitle.length <= maxChar) {
      setInputTitle(newTitle);
      setTitleCharacterLimit(maxChar - newTitle.length);
    }
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map((note) => 
      note.id === updatedNote.id ? updatedNote : note
    ));
    setSelectedNote(null);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const displayedNotes = searchTerm
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : notes;

  return (
    <div className="App">
      <Navbar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <div className="main-content">
        <NoteInput
          inputTitle={inputTitle}
          inputBody={inputBody}
          titleCharacterLimit={titleCharacterLimit}
          onTitleChange={handleTitleChange}
          onBodyChange={setInputBody}
          onAddNote={addNote}
        />

        <NoteList 
          notes={displayedNotes}
          onNoteClick={setSelectedNote}
          onDeleteNote={deleteNote}
        />

        {selectedNote && (
          <NoteDetail
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
            onSave={updateNote}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
