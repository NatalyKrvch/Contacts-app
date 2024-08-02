import { Card, Button } from 'react-bootstrap'
import { MdClose } from 'react-icons/md'
import CustomToast from 'components/CustomToast/CustomToast'
import useContactCard from './hooks/useContactCard'
import renderAvatar from './helpers/renderAvatar'
import './ContactCard.css'

const ContactCard = ({ contact }) => {
  const {
    handleDelete,
    isDeleting,
    toast,
    onToastClose,
    firstName,
    lastName,
    email,
    avatar_url,
    tags,
    navigateToContact,
  } = useContactCard(contact)

  return (
    <>
      <Card className="contact-card" onClick={navigateToContact}>
        <Card.Body className="contact-card-body">
          <div className="d-flex align-items-flex-start">
            {renderAvatar(avatar_url)}
            <div className="ms-3">
              <Card.Title className="contact-title">
                {firstName} {lastName}
              </Card.Title>
              <Card.Text className="contact-tags">
                Email: {email}
                <br />
                Tags: {tags.join(', ')}
              </Card.Text>
            </div>
          </div>
          <Button
            variant="link"
            className="text-danger p-0"
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }}
            disabled={isDeleting}
          >
            <MdClose size={24} />
          </Button>
        </Card.Body>
      </Card>
      <CustomToast
        show={toast.show}
        message={toast.message}
        onClose={onToastClose}
      />
    </>
  )
}

export default ContactCard
