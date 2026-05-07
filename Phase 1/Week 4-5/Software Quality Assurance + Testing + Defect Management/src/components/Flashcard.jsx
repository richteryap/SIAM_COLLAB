// src/components/Flashcard.jsx
import React, { useState } from 'react';

function Flashcard({ card, onDelete, onEdit }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editQuestion, setEditQuestion] = useState(card.question);
  const [editAnswer, setEditAnswer] = useState(card.answer);

  const handleFlip = () => {
    if (!isEditing) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleSaveEdit = () => {
    if (editQuestion.trim() && editAnswer.trim()) {
      onEdit(card.id, editQuestion.trim(), editAnswer.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditQuestion(card.question);
    setEditAnswer(card.answer);
    setIsEditing(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this card?')) {
      onDelete(card.id);
    }
  };

  if (isEditing) {
    return (
      <div data-testid={`card-${card.id}`} className="flashcard editing">
        <input
          value={editQuestion}
          onChange={(e) => setEditQuestion(e.target.value)}
          data-testid="edit-question-input"
        />
        <input
          value={editAnswer}
          onChange={(e) => setEditAnswer(e.target.value)}
          data-testid="edit-answer-input"
        />
        <button onClick={handleSaveEdit} data-testid="save-edit-btn">Save</button>
        <button onClick={handleCancelEdit} data-testid="cancel-edit-btn">Cancel</button>
      </div>
    );
  }

  return (
    <div
      data-testid={`card-${card.id}`}
      className={`flashcard ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div className="card-content">
        {isFlipped ? (
          <p data-testid="card-answer"><strong>A:</strong> {card.answer}</p>
        ) : (
          <p data-testid="card-question"><strong>Q:</strong> {card.question}</p>
        )}
      </div>
      <div className="card-actions">
        <button
          onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
          data-testid="edit-btn"
        >
          Edit
        </button>
        <button onClick={handleDelete} data-testid="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Flashcard;