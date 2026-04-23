// src/App.js — AFTER REFACTOR (v0.8-maintenance)
// TD-02 FIXED: Added edit functionality using editFlashcard from utils
// TD-04 FIXED: All handlers wrapped in useCallback + functional setState

import React, { useState, useCallback } from 'react';
import './App.css';
import FlashcardForm from './components/FlashcardForm';
import Quiz from './components/Quiz';
import CardCounter from './components/CardCounter';
import Flashcard from './components/Flashcard';
import { createFlashcard, addFlashcard, deleteFlashcard, editFlashcard } from './flashcardUtils';

function App() {
  const [deck, setDeck] = useState([]);
  const [isQuizMode, setIsQuizMode] = useState(false);

  // ✅ TD-04 FIXED: useCallback prevents recreation on every render
  // ✅ Functional setState avoids stale closure bugs
  const handleAddCard = useCallback(({ question, answer }) => {
    try {
      const newCard = createFlashcard(question, answer);
      setDeck((prevDeck) => addFlashcard(prevDeck, newCard));
    } catch (error) {
      console.error('Failed to create card:', error.message);
    }
  }, []);

  // ✅ TD-04 FIXED: useCallback + functional setState
  const handleDeleteCard = useCallback((id) => {
    setDeck((prevDeck) => deleteFlashcard(prevDeck, id));
  }, []);

  // ✅ TD-02 FIXED: New edit handler using editFlashcard from utils
  const handleEditCard = useCallback((id, newQuestion, newAnswer) => {
    setDeck((prevDeck) => editFlashcard(prevDeck, id, newQuestion, newAnswer));
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>✨ Flashcard Master</h1>
      </header>

      <main className="app-main">
        {isQuizMode ? (
          <Quiz deck={deck} onExit={() => setIsQuizMode(false)} />
        ) : (
          <div className="dashboard">
            <div className="sidebar">
              <CardCounter deck={deck} />
              <FlashcardForm onAddCard={handleAddCard} />
              <button
                className="start-quiz-btn"
                disabled={deck.length === 0}
                onClick={() => setIsQuizMode(true)}
              >
                🚀 Start Quiz
              </button>
            </div>
            <div className="deck-view">
              <h2>Your Deck ({deck.length})</h2>
              {deck.length === 0 ? (
                <p className="empty-state">No flashcards yet. Add some to get started!</p>
              ) : (
                <div className="flashcard-list">
                  {deck.map((card) => (
                    <Flashcard
                      key={card.id}
                      card={card}
                      onDelete={handleDeleteCard}
                      onEdit={handleEditCard}  // ✅ TD-02: Now passing edit handler
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Flashcard Master v0.8 — SIAM Final Project</p>
      </footer>
    </div>
  );
}

export default App;