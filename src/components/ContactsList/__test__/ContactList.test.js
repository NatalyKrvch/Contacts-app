import { render, screen, fireEvent } from '@testing-library/react'
import ContactList from '../ContactsList'
import useContactList from '../hooks/useContactList'

jest.mock('../hooks/useContactList')
jest.mock(
  'components/CustomToast/CustomToast',
  () =>
    ({ show, label, message, onClose, bg }) =>
      (
        <div data-testid="custom-toast">
          {label && <strong>{label}</strong>}
          {message && <div>{message}</div>}
          {show && <button onClick={onClose}>Close</button>}
        </div>
      )
)
jest.mock('components/ContactCard/ContactCard', () => ({ contact }) => (
  <div data-testid="contact-card">{contact.name}</div>
))

describe('ContactList', () => {
  const mockSetToast = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading spinner when loading', () => {
    useContactList.mockReturnValue({
      contacts: [],
      toast: { show: false, message: '', bg: '', label: '' },
      isLoading: true,
      setToast: mockSetToast,
    })

    const { container } = render(<ContactList />)

    expect(screen.queryByTestId('custom-toast')).not.toBeInTheDocument()
    expect(screen.queryByTestId('contact-card')).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('renders custom toast when no contacts available', () => {
    useContactList.mockReturnValue({
      contacts: null,
      toast: {
        show: true,
        message: 'No contacts available. Please add some',
        bg: '',
        label: 'Oooops',
      },
      isLoading: false,
      setToast: mockSetToast,
    })

    const { container } = render(<ContactList />)

    expect(screen.getByText('Oooops')).toBeInTheDocument()
    expect(
      screen.getByText('No contacts available. Please add some')
    ).toBeInTheDocument()
    expect(screen.getByText('Close')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Close'))

    expect(mockSetToast).toHaveBeenCalledWith({
      show: false,
      message: '',
      bg: '',
      label: '',
    })
    expect(container).toMatchSnapshot()
  })

  it('renders contacts correctly', () => {
    const mockContacts = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ]
    useContactList.mockReturnValue({
      contacts: mockContacts,
      toast: { show: false, message: '', bg: '', label: '' },
      isLoading: false,
      setToast: mockSetToast,
    })

    const { container } = render(<ContactList />)

    expect(screen.getByText('Contacts')).toBeInTheDocument()
    mockContacts.forEach((contact) => {
      expect(screen.getByText(contact.name)).toBeInTheDocument()
    })
    expect(container).toMatchSnapshot()
  })

  it('renders error toast when there is an error', () => {
    useContactList.mockReturnValue({
      contacts: [],
      toast: {
        show: true,
        message: 'An error occurred',
        bg: '',
        label: 'Error happened',
      },
      isLoading: false,
      setToast: mockSetToast,
    })

    const { container } = render(<ContactList />)

    expect(screen.getByText('Error happened')).toBeInTheDocument()
    expect(screen.getByText('An error occurred')).toBeInTheDocument()
    expect(screen.getByText('Close')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Close'))
    expect(mockSetToast).toHaveBeenCalledWith({
      show: false,
      message: '',
      bg: '',
      label: '',
    })
    expect(container).toMatchSnapshot()
  })
})
