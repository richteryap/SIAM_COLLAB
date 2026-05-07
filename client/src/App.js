// src/App.js — AFTER REFACTOR (v0.8-maintenance + Security)
import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import FlashcardForm from './components/FlashcardForm';
import Quiz from './components/Quiz';
import CardCounter from './components/CardCounter';
import Flashcard from './components/Flashcard';
import { createFlashcard, addFlashcard, deleteFlashcard, editFlashcard } from './flashcardUtils';

function App() {
  const [deck, setDeck] = useState([]);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ Security: Check for auth token on initial load
  useEffect(() => {
    const token = localStorage.getItem('flashcard_admin_token');
    if (token === 'secure-admin-session-123') {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = () => {
    const password = prompt("Enter admin password (hint: siam-admin-2026):");
    if (password === 'siam-admin-2026') {
      localStorage.setItem('flashcard_admin_token', 'secure-admin-session-123');
      setIsAdmin(true);
    } else {
      alert("Unauthorized access.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('flashcard_admin_token');
    setIsAdmin(false);
  };

  const handleAddCard = useCallback(({ question, answer }) => {
    try {
      const newCard = createFlashcard(question, answer);
      setDeck((prevDeck) => addFlashcard(prevDeck, newCard));
    } catch (error) {
      console.error('Failed to create card:', error.message);
    }
  }, []);

  const handleDeleteCard = useCallback((id) => {
    setDeck((prevDeck) => deleteFlashcard(prevDeck, id));
  }, []);

  const handleEditCard = useCallback((id, newQuestion, newAnswer) => {
    setDeck((prevDeck) => editFlashcard(prevDeck, id, newQuestion, newAnswer));
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>✨ Flashcard Master</h1>
        <div className="auth-controls">
          {isAdmin ? (
            <button onClick={handleLogout} className="auth-btn">Log Out Admin</button>
          ) : (
            <button onClick={handleLogin} className="auth-btn">Admin Login</button>
          )}
        </div>
      </header>

      <main className="app-main">
        {isQuizMode ? (
          <Quiz deck={deck} onExit={() => setIsQuizMode(false)} />
        ) : (
          <div className="dashboard">
            <div className="sidebar">
              <CardCounter deck={deck} />

              {/* ✅ Security: Only admins can add cards */}
              {isAdmin ? (
                <FlashcardForm onAddCard={handleAddCard} />
              ) : (
                <div className="auth-warning">
                  <p>Read-Only Mode. Please log in to modify the deck.</p>
                </div>
              )}

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
                      onEdit={handleEditCard}
                      isAdmin={isAdmin} // ✅ Security: Pass admin state to child
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