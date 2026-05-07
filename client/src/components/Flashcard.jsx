// src/components/Flashcard.jsx — AFTER REFACTOR (v0.8-maintenance + Security)
import React, { useState } from 'react';

function Flashcard({ card, onDelete, onEdit, isAdmin }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editQuestion, setEditQuestion] = useState(card.question);
    const [editAnswer, setEditAnswer] = useState(card.answer);
    const [editError, setEditError] = useState('');

    const handleSaveEdit = () => {
        setEditError('');
        const trimmedQ = editQuestion.trim();
        const trimmedA = editAnswer.trim();

        // 1. Empty state validation
        if (!trimmedQ || !trimmedA) {
            setEditError('Fields cannot be empty.');
            return;
        }

        // 2. Boundary limits
        if (trimmedQ.length > 200 || trimmedA.length > 500) {
            setEditError('Input exceeds maximum character limits.');
            return;
        }

        // 3. XSS Mitigation
        const htmlTagRegex = /<[^>]*>?/gm;
        if (htmlTagRegex.test(trimmedQ) || htmlTagRegex.test(trimmedA)) {
            setEditError('Special characters like < and > are not allowed.');
            return;
        }

        onEdit(card.id, trimmedQ, trimmedA);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditQuestion(card.question);
        setEditAnswer(card.answer);
        setEditError('');
        setIsEditing(false);
    };

    // ✅ EDIT MODE — inline form replaces the card content
    if (isEditing) {
        return (
            <div className="flashcard-list-item editing" data-testid="flashcard-item">
                <div className="card-content">
                    {editError && <p style={{ color: 'red', fontSize: '0.85rem', margin: '0 0 10px 0' }}>{editError}</p>}
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

    // ✅ NORMAL MODE — Edit and Delete buttons are now protected by isAdmin
    return (
        <div className="flashcard-list-item" data-testid="flashcard-item">
            <div className="card-content">
                <strong>Q:</strong> <span className="question">{card.question}</span>
                <br />
                <strong>A:</strong> <span className="answer">{card.answer}</span>
            </div>

            {/* ✅ Security: Conditionally render action buttons */}
            {isAdmin && (
                <div className="card-buttons">
                    <button className="edit-btn" onClick={() => setIsEditing(true)} data-testid="edit-btn">Edit</button>
                    <button className="delete-btn" onClick={() => onDelete(card.id)} data-testid="delete-btn">Delete</button>
                </div>
            )}
        </div>
    );
}

export default Flashcard;