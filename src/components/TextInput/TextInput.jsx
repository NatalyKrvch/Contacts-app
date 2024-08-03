import { Form } from 'react-bootstrap'

const TextInput = ({
  label,
  errorMessage,
  value,
  onChange,
  className,
  id,
  type = 'text',
  placeholder = '',
  required = false,
}) => {
  return (
    <Form.Group controlId={id}>
      {label && <Form.Label className={className}>{label}</Form.Label>}
      <Form.Control
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        isInvalid={!!errorMessage}
        required={required}
        placeholder={placeholder}
      />
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default TextInput
