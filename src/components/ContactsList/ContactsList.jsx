import { Container, Spinner } from 'react-bootstrap'
import CustomToast from 'components/CustomToast/CustomToast'
import useContactList from './hooks/useContactList'
import ContactCard from 'components/ContactCard/ContactCard'

const ContactList = () => {
  const { contacts, toast, isLoading, setToast } = useContactList()

  if (isLoading)
    return <Spinner style={{ margin: '50px auto' }} animation="border" />

  if (!Array.isArray(contacts)) {
    return (
      <>
        <CustomToast
          show={toast.show}
          label="Oooops"
          bg=""
          message="No contacts available. Please add some"
          onClose={() =>
            setToast({ show: false, message: '', bg: '', label: '' })
          }
        />
      </>
    )
  }

  return (
    <Container style={{ maxWidth: '558px', margin: '0 auto' }}>
      <p className="fw-medium fs-5 mt-3">Contacts</p>
      {contacts.map((contact) => (
        <div key={contact.id} className="mb-3">
          <ContactCard contact={contact} />
        </div>
      ))}
      <CustomToast
        show={toast.show}
        label="Error happened"
        message={toast.message}
        onClose={() =>
          setToast({ show: false, message: '', bg: '', label: '' })
        }
      />
    </Container>
  )
}

export default ContactList
