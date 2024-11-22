import React, { useState } from "react";
import "./App.css";
import { initialNotes } from "./utils/local-data.js";
import { showFormattedDate } from "./utils/index.js";
import NoteDetail from "./components/NoteDetail";

function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [titleCharacterLimit, setTitleCharacterLimit] = useState(50);
  const [selectedNote, setSelectedNote] = useState(null);

  const addNote = () => {
    if (
      inputTitle.trim().length > 0 &&
      inputTitle.trim().length <= titleCharacterLimit
    ) {
      const newNote = {
        id: +new Date(),
        title: inputTitle.trim(),
        body: inputBody,
        archived: false,
        createdAt: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
      setInputTitle("");
      setInputBody("");
      setTitleCharacterLimit(50);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleTitleChange = (event) => {
    const maxChar = 50;
    setInputTitle(event.target.value.slice(0, maxChar));
    setTitleCharacterLimit(maxChar - event.target.value.length);
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map((note) => 
      note.id === updatedNote.id ? updatedNote : note
    ));
    setSelectedNote(null);
  };

  const displayedNotes = searchTerm
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : notes;

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Notes App</h1>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes..."
            className="search-input"
          />
        </div>
      </nav>
      
      <div className="main-content">
        <div className="input-container">
          <input
            type="text"
            value={inputTitle}
            onChange={handleTitleChange}
            placeholder="Note title"
            className="full-width-input"
            maxLength="50"
            required
          />
          <div className={`character-limit ${titleCharacterLimit === 0 ? 'warning' : ''}`}>
            Characters remaining: {titleCharacterLimit}
          </div>
          
          <textarea
            value={inputBody}
            onChange={(e) => setInputBody(e.target.value)}
            placeholder="Write your note here..."
            required
          />

          <button onClick={addNote}>Add Note</button>
        </div>

        <div className="notes-list">
          {displayedNotes.length > 0 ? (
            displayedNotes.map((note) => (
              <div key={note.id} className="note" onClick={() => setSelectedNote(note)}>
                <h2>{note.title}</h2>
                <p className="date">{showFormattedDate(note.createdAt)}</p>
                <p>{note.body}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>No notes found</p>
          )}
        </div>
      </div>

      {selectedNote && (
        <NoteDetail
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onSave={updateNote}
        />
      )}
    </div>
  );
}

export default App;
