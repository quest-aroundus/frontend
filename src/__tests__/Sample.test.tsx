// src/__tests__/Sample.test.tsx
import { render, screen } from '@testing-library/react';

describe('Sample Component', () => {
  it('renders a heading', () => {
    render(<h1>Hello Jest</h1>);
    const heading = screen.getByText('Hello Jest');
    expect(heading).toBeInTheDocument();
  });
});
