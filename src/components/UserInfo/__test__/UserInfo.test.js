import { render, screen } from '@testing-library/react';
import UserInfo from '../UserInfo';
import renderAvatar from '../helpers/renderAvatar';

jest.mock('../helpers/renderAvatar');

describe('UserInfo', () => {
  const mockProps = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    avatarUrl: 'https://example.com/avatar.jpg',
    avatarSize: 50,
  };

  it('renders component correctly', () => {
    const { container } = render(<UserInfo {...mockProps} />);
    
    expect(container).toMatchSnapshot();
  });

  it('renders user info with avatar', () => {
    renderAvatar.mockReturnValue(
      <img src="https://example.com/avatar.jpg" alt="avatar" />
    );
    const { container } = render(<UserInfo {...mockProps} />);
    
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders user info with default avatar', () => {
    renderAvatar.mockReturnValue(
      <svg data-testid="default-avatar-icon"></svg>
    );
    const propsWithoutAvatar = { ...mockProps, avatarUrl: '' };
    const { container } = render(<UserInfo {...propsWithoutAvatar} />);
    
    expect(screen.getByTestId('default-avatar-icon')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});

