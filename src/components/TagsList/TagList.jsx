import { Badge } from 'react-bootstrap'

const TagsList = ({ tags = [] }) => {
  return (
    <div>
      {tags.map(({ id, tag }) => (
        <Badge key={id} bg="secondary" className="me-2 mb-3 fw-light">
          {tag}
        </Badge>
      ))}
    </div>
  )
}

export default TagsList
