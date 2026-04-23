import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app header', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /Flashcard Master/i });
  expect(headerElement).toBeInTheDocument();
});
