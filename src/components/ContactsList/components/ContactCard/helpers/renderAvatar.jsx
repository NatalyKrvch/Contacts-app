import { Image } from 'react-bootstrap'
import { MdAccountCircle } from 'react-icons/md'

const renderAvatar = (avatar_url) => {
  return avatar_url ? (
    <Image
      src={avatar_url}
      roundedCircle
      width={48}
      height={48}
      alt="avatar"
    />
  ) : (
    <MdAccountCircle size={48} color="#e8eaed" />
  )
}

export default renderAvatar
