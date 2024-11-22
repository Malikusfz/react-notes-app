import React from 'react';
import { showFormattedDate } from '../../utils/index.js';
import './NoteList.css';

function NoteList({ notes, onNoteClick, onDeleteNote }) {
  const handleDelete = (e, id) => {
    e.stopPropagation();
    onDeleteNote(id);
  };

  return (
    <div className="notes-list">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className="note" onClick={() => onNoteClick(note)}>
            <h2>{note.title}</h2>
            <p className="date">{showFormattedDate(note.createdAt)}</p>
            <p>{note.body}</p>
            <button onClick={(e) => handleDelete(e, note.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p className="no-notes">No notes found.</p>
      )}
    </div>
  );
}

export default NoteList;
