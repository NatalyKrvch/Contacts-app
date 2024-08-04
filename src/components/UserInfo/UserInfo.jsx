import { Card } from 'react-bootstrap'
import renderAvatar from './helpers/renderAvatar'

const UserInfo = ({ firstName, lastName, email, avatarUrl, avatarSize }) => {
  return (
    <div className="d-flex align-items-center">
      {renderAvatar(avatarUrl, avatarSize)}
      <div className="ms-3">
        <Card.Title className="contact-title">
          {firstName} {lastName}
        </Card.Title>
        <Card.Text className="contact-email">{email}</Card.Text>
      </div>
    </div>
  )
}

export default UserInfo
