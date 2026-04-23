# Product Backlog — Flashcard Quiz App

## Project Description
A simple web-based flashcard quiz application where users can create question/answer cards, flip them to reveal answers, and take quizzes to track their score. Built with React (frontend) and Node.js (backend).

---

## User Stories

### US-01: Create a Flashcard
- **As a** user, **I want** to create a new flashcard by entering a question and answer **so that** I can build my own study deck.
- **Priority:** High
- **Story Points:** 3
- **Acceptance Criteria:**
  - A form with "Question" and "Answer" text fields is displayed
  - Clicking "Add Card" saves the flashcard
  - Both fields are required — empty submissions show a validation error
  - The new card appears in the card list immediately

### US-02: View All Flashcards
- **As a** user, **I want** to see a list of all my flashcards **so that** I can browse and review what I've created.
- **Priority:** High
- **Story Points:** 2
- **Acceptance Criteria:**
  - All saved flashcards are displayed in a list or grid
  - Each card shows the question text (answer is hidden by default)
  - Cards are displayed in the order they were created
  - If no cards exist, a message says "No flashcards yet. Create one!"

### US-03: Flip a Flashcard
- **As a** user, **I want** to click on a flashcard to flip it and reveal the answer **so that** I can study and test my memory.
- **Priority:** High
- **Story Points:** 3
- **Acceptance Criteria:**
  - Clicking a card flips it to show the answer
  - Clicking again flips it back to the question
  - A visual flip animation plays during the transition
  - The card clearly indicates which side is showing (e.g., "Q:" or "A:" label)

### US-04: Delete a Flashcard
- **As a** user, **I want** to delete a flashcard I no longer need **so that** I can keep my deck clean and relevant.
- **Priority:** High
- **Story Points:** 2
- **Acceptance Criteria:**
  - Each card has a delete button (e.g., trash icon or "×")
  - A confirmation prompt appears before deleting ("Are you sure?")
  - The card is removed from the list immediately after confirmation
  - The total card count updates accordingly

### US-05: Edit a Flashcard
- **As a** user, **I want** to edit an existing flashcard's question or answer **so that** I can fix mistakes or update content.
- **Priority:** High
- **Story Points:** 3
- **Acceptance Criteria:**
  - Each card has an "Edit" button
  - Clicking it opens a form pre-filled with the current question and answer
  - Clicking "Save" updates the card; clicking "Cancel" discards changes
  - The updated content is reflected in the card list immediately

### US-06: Start a Quiz
- **As a** user, **I want** to start a quiz that shows my flashcards one at a time **so that** I can test my knowledge in a structured way.
- **Priority:** High
- **Story Points:** 5
- **Acceptance Criteria:**
  - A "Start Quiz" button is available when at least 1 card exists
  - Quiz shows one card at a time with only the question visible
  - User can reveal the answer by clicking the card
  - Navigation buttons ("Next", "Previous") move between cards
  - A progress indicator shows "Card 3 of 10"

### US-07: Self-Grade During Quiz
- **As a** user, **I want** to mark each card as "Got it" or "Missed it" during a quiz **so that** I can track how well I know the material.
- **Priority:** Medium
- **Story Points:** 3
- **Acceptance Criteria:**
  - After revealing the answer, two buttons appear: "Got it ✓" and "Missed it ✗"
  - User must select one before moving to the next card
  - Selections are recorded for the score summary
  - Buttons are visually distinct (e.g., green vs red)

### US-08: Quiz Score Summary
- **As a** user, **I want** to see my score at the end of a quiz **so that** I can know how well I performed.
- **Priority:** Medium
- **Story Points:** 3
- **Acceptance Criteria:**
  - After the last card, a summary screen appears
  - Shows: total cards, correct count, incorrect count, percentage score
  - A "Retake Quiz" button restarts the quiz
  - A "Back to Deck" button returns to the card list

### US-09: Shuffle Quiz Order
- **As a** user, **I want** the quiz to shuffle the card order **so that** I don't just memorize the sequence.
- **Priority:** Medium
- **Story Points:** 2
- **Acceptance Criteria:**
  - Cards are presented in a random order each time a quiz starts
  - The shuffle produces a different order than the previous attempt (when possible)
  - The progress indicator still tracks position correctly (e.g., "Card 2 of 10")
  - All cards are included — no duplicates or missing cards

### US-10: Persistent Storage
- **As a** user, **I want** my flashcards to be saved even after I close the browser **so that** I don't lose my study material.
- **Priority:** Low
- **Story Points:** 5
- **Acceptance Criteria:**
  - Flashcards are stored in the browser's localStorage (or backend database)
  - Refreshing the page retains all cards
  - Closing and reopening the browser retains all cards
  - If storage is cleared, the app shows the empty state gracefully

---

## Summary Table

| Story ID | Title               | Priority | Points |
|----------|---------------------|----------|--------|
| US-01    | Create a Flashcard   | High     | 3      |
| US-02    | View All Flashcards  | High     | 2      |
| US-03    | Flip a Flashcard     | High     | 3      |
| US-04    | Delete a Flashcard   | High     | 2      |
| US-05    | Edit a Flashcard     | High     | 3      |
| US-06    | Start a Quiz         | High     | 5      |
| US-07    | Self-Grade (Quiz)    | Medium   | 3      |
| US-08    | Quiz Score Summary   | Medium   | 3      |
| US-09    | Shuffle Quiz Order   | Medium   | 2      |
| US-10    | Persistent Storage   | Low      | 5      |

**Total Story Points:** 31
