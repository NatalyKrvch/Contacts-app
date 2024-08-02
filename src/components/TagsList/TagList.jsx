import { Badge } from 'react-bootstrap'

const TagsList = ({ tags }) => {
  return (
    <div>
      {tags.map((tag) => (
        <Badge key={tag} bg="secondary" className="me-2 fw-light">
          {tag}
        </Badge>
      ))}
    </div>
  )
}

export default TagsList
