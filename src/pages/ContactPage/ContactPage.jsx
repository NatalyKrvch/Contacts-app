import { Spinner } from 'react-bootstrap'
import CustomToast from 'components/CustomToast/CustomToast'
import UserInfo from 'components/UserInfo/UserInfo'
import TagForm from 'components/TagForm/TagForm'
import useContactPage from './hooks/useContactPage'
import TagsList from 'components/TagsList/TagList'
import './ContactPage.css'

const ContactPage = () => {
  const {
    contact,
    error,
    isLoading,
    showToast,
    setShowToast,
    tags,
    handleAddTags,
    contactFields,
  } = useContactPage()

  if (isLoading) {
    return (
      <div className="contact-page-spinner">
        <Spinner animation="border" />
      </div>
    )
  }

  if (error) {
    return (
      <CustomToast
        show={showToast}
        label="Error"
        message={`Failed to load contact: ${error.message}`}
        onClose={() => setShowToast(false)}
        bg="danger"
      />
    )
  }

  const { firstName, lastName, email, avatarUrl } = contactFields

  return (
    <div className="contact-page-container">
      {contact ? (
        <>
          <UserInfo
            firstName={firstName}
            lastName={lastName}
            email={email}
            avatarUrl={avatarUrl}
            avatarSize={83}
          />
          <p className="fw-bold mt-5">Tags</p>
          <TagsList tags={tags} />
          <TagForm
            onAddTags={(newTags) => {
              handleAddTags(newTags)
            }}
          />
        </>
      ) : (
        <CustomToast
          show={showToast}
          label="Warning"
          message="Contact not found"
          onClose={() => setShowToast(false)}
          bg="warning"
        />
      )}
    </div>
  )
}

export default ContactPage
