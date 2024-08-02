import { Form, Button, Container } from 'react-bootstrap'
import useContactForm from './hooks/useContactForm'
import CustomToast from 'components/CustomToast/CustomToast'
import {
  FORM_EMAIL_ID,
  FORM_FIRST_NAME_ID,
  FORM_LAST_NAME_ID,
} from './constants'
import './ContactForm.css'

const ContactForm = () => {
  const {
    userInfo,
    isLoading,
    setUserInfo,
    handleSubmit,
    validated,
    errors,
    toast,
    closeToast,
  } = useContactForm()

  return (
    <Container className='contact-form-container'>
      <p className="mb-3 fs-5 fw-medium">Create Contact</p>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId={FORM_FIRST_NAME_ID}>
          <Form.Label className="mb-1 fs-8">First Name</Form.Label>
          <Form.Control
            type="text"
            value={userInfo.firstName}
            onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
            isInvalid={!!errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId={FORM_LAST_NAME_ID}>
          <Form.Label className="mt-3 fs-8">Last Name</Form.Label>
          <Form.Control
            type="text"
            value={userInfo.lastName}
            onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
            isInvalid={!!errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId={FORM_EMAIL_ID}>
          <Form.Label className="mt-3 fs-8">Email</Form.Label>
          <Form.Control
            type="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            required
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid" className="mt-1">
            {errors.email || 'Please enter a valid email.'}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          className="mt-3 w-100"
          variant="success"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Contact'}
        </Button>
      </Form>
      <CustomToast
        show={toast.show}
        message={toast.message}
        onClose={closeToast}
      />
    </Container>
  )
}

export default ContactForm
