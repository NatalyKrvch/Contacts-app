import { render, screen } from '@testing-library/react';
import TagsList from '../TagList';

describe('TagsList', () => {
  const mockTags = [
    { id: 1, tag: 'Tag1' },
    { id: 2, tag: 'Tag2' },
    { id: 3, tag: 'Tag3' },
  ];

  it('renders tags correctly', () => {
    const { container } = render(<TagsList tags={mockTags} />);
    
    mockTags.forEach(tag => {
      expect(screen.getByTestId(`tag-${tag.id}`)).toBeInTheDocument();
      expect(screen.getByText(tag.tag)).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });

  it('renders an empty div when no tags are provided', () => {
    const { container } = render(<TagsList tags={[]} />);
    
    expect(screen.getByTestId('tags-list')).toBeEmptyDOMElement();
    expect(container).toMatchSnapshot();
  });
});
