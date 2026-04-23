import React from 'react';

function Flashcard({ card, onDelete }) {
    return (
        <div className="flashcard-list-item" data-testid="flashcard-item">
            <div className="card-content">
                <strong>Q:</strong> <span className="question">{card.question}</span>
                <br />
                <strong>A:</strong> <span className="answer">{card.answer}</span>
            </div>
            <button className="delete-btn" onClick={() => onDelete(card.id)} data-testid="delete-btn">Delete</button>
        </div>
    );
}

export default Flashcard;
