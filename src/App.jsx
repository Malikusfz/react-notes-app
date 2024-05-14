import React, { useState } from "react";
import "./App.css";
import { initialNotes } from "./utils/local-data.js";
import { showFormattedDate } from "./utils/index.js";

function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [titleCharacterLimit, setTitleCharacterLimit] = useState(50);

  const addNote = () => {
    console.log("Adding note:", inputTitle.trim(), inputTitle.trim().length);
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
      setNotes([...notes, newNote]);
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

  const displayedNotes = searchTerm
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : notes;

  return (
    <div className="App">
      <nav className="navbar">
        <h1>My Notes</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari catatan..."
          className="search-input"
        />
      </nav>
      <div className="input-container">
        <input
          type="text"
          value={inputTitle}
          onChange={handleTitleChange}
          placeholder="Judul catatan"
          className="full-width-input"
          maxLength="50" // Menambahkan properti maxLength untuk membatasi input
          required
        />
        <p>Sisa karakter: {titleCharacterLimit}</p>
        {titleCharacterLimit === 0 && (
          <p style={{ color: "red" }}>Batas karakter tercapai!</p>
        )}

        <textarea
          value={inputBody}
          onChange={(e) => setInputBody(e.target.value)}
          placeholder="Isi catatan..."
          required
        />

        <button onClick={addNote}>Tambah Catatan</button>
        <div className="notes-list">
          {displayedNotes.length > 0 ? (
            displayedNotes.map((note) => (
              <div key={note.id} className="note">
                <h2>{note.title}</h2>
                <p style={{ textAlign: "left", fontWeight: "bold" }}>
                  {showFormattedDate(note.createdAt)}
                </p>

                <p style={{ textAlign: "left" }}>{note.body}</p>
                <button onClick={() => deleteNote(note.id)}>Hapus</button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>Tidak ada catatan</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
