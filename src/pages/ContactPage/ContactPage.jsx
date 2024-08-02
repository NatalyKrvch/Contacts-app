import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { useGetContactQuery } from 'services/api/contactsApi'
import CustomToast from 'components/CustomToast/CustomToast'
import UserInfo from 'components/UserInfo/UserInfo'
import TagsList from 'components/TagsList/TagList'
import { extractContactFields } from './helpers/extractContactFields'
import './ContactPage.css'

const ContactPage = () => {
  const { id } = useParams()
  const { data: contact, error, isLoading } = useGetContactQuery(id)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (error) {
      setShowToast(true)
    }
  }, [error])

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

  const contactFields = extractContactFields(contact)
  const { firstName, lastName, email, avatarUrl } = contactFields

  const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5']

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
