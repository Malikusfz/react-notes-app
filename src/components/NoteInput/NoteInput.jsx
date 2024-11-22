import React from 'react';
import './NoteInput.css';

function NoteInput({ 
  inputTitle, 
  inputBody, 
  titleCharacterLimit, 
  onTitleChange, 
  onBodyChange, 
  onAddNote 
}) {
  return (
    <div className="input-container">
      <input
        type="text"
        value={inputTitle}
        onChange={onTitleChange}
        placeholder="Note title"
        className="full-width-input"
        maxLength={50}
        required
      />
      <div className={`character-limit ${titleCharacterLimit <= 0 ? 'warning' : ''}`}>
        Characters remaining: {titleCharacterLimit}
      </div>
      
      <textarea
        value={inputBody}
        onChange={(e) => onBodyChange(e.target.value)}
        placeholder="Write your note here..."
        required
      />

      <button 
        onClick={onAddNote}
        disabled={inputTitle.trim().length === 0 || inputTitle.trim().length > 50 || inputBody.trim().length === 0}
      >
        Add Note
      </button>
    </div>
  );
}

export default NoteInput;
