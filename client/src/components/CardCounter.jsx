// src/components/CardCounter.jsx
// Displays deck statistics — total cards, studied, mastered, with progress bar
import React from 'react';

function CardCounter({ deck, quizResults }) {
    const totalCards = deck.length;
    const studiedCards = quizResults ? quizResults.length : 0;
    const masteredCards = quizResults
        ? quizResults.filter((r) => r.gotIt).length
        : 0;

    const progressPercent =
        totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0;

    return (
        <div data-testid="card-counter" className="card-counter">
            <h3>Deck Stats</h3>
            <div className="stats-grid">
                <div className="stat-item">
                    <span className="stat-number" data-testid="total-count">
                        {totalCards}
                    </span>
                    <span className="stat-label">Total Cards</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number" data-testid="studied-count">
                        {studiedCards}
                    </span>
                    <span className="stat-label">Studied</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number" data-testid="mastered-count">
                        {masteredCards}
                    </span>
                    <span className="stat-label">Mastered</span>
                </div>
            </div>
            <div
                className="progress-bar-container"
                style={{
                    width: '100%',
                    height: '12px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    marginTop: '10px',
                }}
            >
                <div
                    className="progress-bar"
                    style={{
                        width: `${progressPercent}%`,
                        height: '100%',
                        backgroundColor: '#4caf50',
                        borderRadius: '6px',
                        transition: 'width 0.3s ease',
                    }}
                    data-testid="progress-bar"
                />
            </div>
            <p className="progress-text" data-testid="progress-text">
                {progressPercent}% mastered
            </p>
        </div>
    );
}

export default CardCounter;