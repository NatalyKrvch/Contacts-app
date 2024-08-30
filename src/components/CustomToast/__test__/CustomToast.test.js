import { render, screen, fireEvent } from '@testing-library/react';
import CustomToast from '../CustomToast';

describe('CustomToast', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders CustomToast correctly when shown', () => {
    const { container } = render(
      <CustomToast
        show={true}
        label="Test Label"
        message="This is a test message"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('This is a test message')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <CustomToast
        show={true}
        label="Test Label"
        message="This is a test message"
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('This is a test message')).toBeInTheDocument();
  });

  it('renders with default background color', () => {
    const { container } = render(
      <CustomToast
        show={true}
        label="Test Label"
        message="This is a test message"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByRole('alert')).toHaveClass('bg-danger');
    expect(container).toMatchSnapshot();
  });

  it('renders with custom background color', () => {
    const { container } = render(
      <CustomToast
        show={true}
        label="Test Label"
        message="This is a test message"
        onClose={mockOnClose}
        bg="success"
      />
    );

    expect(screen.getByRole('alert')).toHaveClass('bg-success');
    expect(container).toMatchSnapshot();
  });
});
