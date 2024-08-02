import { Image } from 'react-bootstrap'
import { MdAccountCircle } from 'react-icons/md'

const renderAvatar = (avatarUrl, size) => {
  return avatarUrl ? (
    <Image
      src={avatarUrl}
      roundedCircle
      width={size}
      height={size}
      alt="avatar"
    />
  ) : (
    <MdAccountCircle size={size} color="#e8eaed" />
  )
}

export default renderAvatar
