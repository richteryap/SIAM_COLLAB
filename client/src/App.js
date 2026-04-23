import React, { useState } from 'react';
import './App.css';
import FlashcardForm from './components/FlashcardForm';
import Quiz from './components/Quiz';
import CardCounter from './components/CardCounter';
import Flashcard from './components/Flashcard';
import { createFlashcard, addFlashcard, deleteFlashcard } from './flashcardUtils';

function App() {
  const [deck, setDeck] = useState([]);
  const [isQuizMode, setIsQuizMode] = useState(false);

  const handleAddCard = ({ question, answer }) => {
    const newCard = createFlashcard(question, answer);
    setDeck(addFlashcard(deck, newCard));
  };

  const handleDeleteCard = (id) => {
    setDeck(deleteFlashcard(deck, id));
  };

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
                    <Flashcard key={card.id} card={card} onDelete={handleDeleteCard} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
