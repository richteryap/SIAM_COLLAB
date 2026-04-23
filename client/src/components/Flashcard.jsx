// src/components/Flashcard.jsx — AFTER REFACTOR (v0.8-maintenance)
// TD-02 FIXED: Added edit mode with inline form
// Keeps the same layout and class names as the original

import React, { useState } from 'react';

function Flashcard({ card, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editQuestion, setEditQuestion] = useState(card.question);
    const [editAnswer, setEditAnswer] = useState(card.answer);

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

    // ✅ EDIT MODE — inline form replaces the card content
    if (isEditing) {
        return (
            <div className="flashcard-list-item editing" data-testid="flashcard-item">
                <div className="card-content">
                    <div className="edit-field">
                        <strong>Q:</strong>
                        <input
                            type="text"
                            value={editQuestion}
                            onChange={(e) => setEditQuestion(e.target.value)}
                            className="edit-input"
                            data-testid="edit-question-input"
                        />
                    </div>
                    <div className="edit-field">
                        <strong>A:</strong>
                        <input
                            type="text"
                            value={editAnswer}
                            onChange={(e) => setEditAnswer(e.target.value)}
                            className="edit-input"
                            data-testid="edit-answer-input"
                        />
                    </div>
                </div>
                <div className="card-buttons">
                    <button className="save-btn" onClick={handleSaveEdit} data-testid="save-btn">Save</button>
                    <button className="cancel-btn" onClick={handleCancelEdit} data-testid="cancel-btn">Cancel</button>
                </div>
            </div>
        );
    }

    // ✅ NORMAL MODE — same as before, but with Edit button added
    return (
        <div className="flashcard-list-item" data-testid="flashcard-item">
            <div className="card-content">
                <strong>Q:</strong> <span className="question">{card.question}</span>
                <br />
                <strong>A:</strong> <span className="answer">{card.answer}</span>
            </div>
            <div className="card-buttons">
                <button className="edit-btn" onClick={() => setIsEditing(true)} data-testid="edit-btn">Edit</button>
                <button className="delete-btn" onClick={() => onDelete(card.id)} data-testid="delete-btn">Delete</button>
            </div>
        </div>
    );
}

export default Flashcard;