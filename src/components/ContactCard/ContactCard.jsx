import { Card, Button } from 'react-bootstrap'
import { MdClose } from 'react-icons/md'
import { CLOSE_BUTTON_SIZE, LARGE_AVATAR_SIZE } from 'constants'
import CustomToast from 'components/CustomToast/CustomToast'
import useContactCard from './hooks/useContactCard'
import UserInfo from 'components/UserInfo/UserInfo'
import TagsList from 'components/TagsList/TagList'
import './ContactCard.css'

const ContactCard = ({ contact }) => {
  const {
    handleDelete,
    isDeleting,
    toast,
    onToastClose,
    userInfo,
    navigateToContact,
  } = useContactCard(contact)

  return (
    <>
      <Card className="contact-card" onClick={navigateToContact}>
        <Card.Body className="contact-card-body">
          <div className="d-flex flex-column">
            <UserInfo {...userInfo} avatarSize={LARGE_AVATAR_SIZE} />
            <span className="contact-card-tags">
              <TagsList tags={userInfo.tags} />
            </span>
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
            <MdClose size={CLOSE_BUTTON_SIZE} />
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
