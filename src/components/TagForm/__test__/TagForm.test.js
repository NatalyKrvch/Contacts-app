import { render, screen, fireEvent } from '@testing-library/react';
import TagForm from '../TagForm';

describe('TagForm', () => {
  const mockOnAddTags = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders TagForm correctly', () => {
    const { container } = render(<TagForm onAddTags={mockOnAddTags} />);
    
    expect(screen.getByPlaceholderText('Add new Tags separated by commas')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add tags/i })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('updates input value when typing', () => {
    render(<TagForm onAddTags={mockOnAddTags} />);
    
    const input = screen.getByPlaceholderText('Add new Tags separated by commas');
    fireEvent.change(input, { target: { value: 'tag1, tag2' } });
    
    expect(input.value).toBe('tag1, tag2');
    expect(input).toMatchSnapshot();
  });

  it('does not call onAddTags if input is empty', () => {
    render(<TagForm onAddTags={mockOnAddTags} />);
    
    fireEvent.click(screen.getByRole('button', { name: /add tags/i }));
    
    expect(mockOnAddTags).not.toHaveBeenCalled();
    expect(screen.getByPlaceholderText('Add new Tags separated by commas')).toMatchSnapshot();
  });
});
