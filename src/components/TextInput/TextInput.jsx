import { Form } from 'react-bootstrap'

const TextInput = ({
  label,
  errorMessage,
  value,
  onChange,
  className,
  id,
  type = 'text',
  required = false,
}) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label className={className}>{label}</Form.Label>
      <Form.Control
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        isInvalid={!!errorMessage}
        required={required}
      />
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default TextInput
