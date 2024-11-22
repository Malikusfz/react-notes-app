import React, { useState } from 'react';
import { showFormattedDate } from '../../utils/index.js';
import './NoteDetail.css';

function NoteDetail({ note, onClose, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedBody, setEditedBody] = useState(note.body);
  const [titleCharacterLimit, setTitleCharacterLimit] = useState(50 - note.title.length);

  const handleTitleChange = (event) => {
    const maxChar = 50;
    const newTitle = event.target.value.slice(0, maxChar);
    setEditedTitle(newTitle);
    setTitleCharacterLimit(maxChar - newTitle.length);
  };

  const handleSave = () => {
    if (editedTitle.trim() && editedBody.trim()) {
      onSave({
        ...note,
        title: editedTitle.trim(),
        body: editedBody.trim(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(note.title);
    setEditedBody(note.body);
    setIsEditing(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('note-detail-overlay')) {
      onClose();
    }
  };

  return (
    <div className="note-detail-overlay" onClick={handleOverlayClick}>
      <div className="note-detail-modal">
        <button className="close-button" onClick={onClose}>×</button>
        
        {isEditing ? (
          <div className="note-edit-form">
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              placeholder="Note title"
              className="edit-title-input"
              maxLength="50"
            />
            <div className={`character-limit ${titleCharacterLimit === 0 ? 'warning' : ''}`}>
              Characters remaining: {titleCharacterLimit}
            </div>
            
            <textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              placeholder="Note content"
              className="edit-body-input"
            />
            
            <div className="button-group">
              <button className="save-button" onClick={handleSave}>Save</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="note-detail-content">
            <h2>{note.title}</h2>
            <p className="date">{showFormattedDate(note.createdAt)}</p>
            <p className="body">{note.body}</p>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteDetail;
