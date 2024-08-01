import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import useContactForm from './hooks/useContactForm'
import CustomToast from 'components/CustomToast/CustomToast'
import {
  FORM_STYLES,
  FORM_EMAIL_ID,
  FORM_FIRST_NAME_ID,
  FORM_LAST_NAME_ID,
} from './constants'

const ContactForm = () => {
  const {
    firstName,
    lastName,
    email,
    isLoading,
    setFirstName,
    setLastName,
    setEmail,
    handleSubmit,
    validated,
    errors,
    toast,
    closeToast,
  } = useContactForm()

  return (
    <Container className="contact-form" style={FORM_STYLES}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId={FORM_FIRST_NAME_ID}>
          <Form.Label className='mb-1'>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            isInvalid={!!errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId={FORM_LAST_NAME_ID}>
          <Form.Label className='mt-3'>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            isInvalid={!!errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId={FORM_EMAIL_ID}>
          <Form.Label className='mt-3'>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid" className='mt-1'>
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
