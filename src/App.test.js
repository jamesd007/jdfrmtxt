import { render, screen } from '@testing-library/react';
import App from './App';

//maybe discover what this does
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
