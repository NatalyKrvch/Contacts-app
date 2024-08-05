import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '../TextInput';

describe('TextInput', () => {
  const mockProps = {
    label: 'Test Label',
    errorMessage: '',
    value: '',
    onChange: jest.fn(),
    className: 'test-class',
    id: 'test-input',
    type: 'text',
    placeholder: 'Enter text',
    required: false,
  };

  it('renders component correctly', () => {
    const { container } = render(<TextInput {...mockProps} />);
    
    expect(container).toMatchSnapshot();
  });

  it('renders input with label', () => {
    const { container } = render(<TextInput {...mockProps} />);
    
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('calls onChange when input value changes', () => {
    const { container } = render(<TextInput {...mockProps} />);
    
    fireEvent.change(screen.getByLabelText('Test Label'), { target: { value: 'new value' } });
    expect(mockProps.onChange).toHaveBeenCalledWith('new value');
    expect(container).toMatchSnapshot();
  });

  it('displays error message when errorMessage is provided', () => {
    const propsWithError = { ...mockProps, errorMessage: 'Error occurred' };
    const { container } = render(<TextInput {...propsWithError} />);
    
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders required attribute when required is true', () => {
    const requiredProps = { ...mockProps, required: true };
    const { container } = render(<TextInput {...requiredProps} />);
    
    expect(screen.getByLabelText('Test Label')).toBeRequired();
    expect(container).toMatchSnapshot();
  });
});

