import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import useContactForm from './useContactForm'

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
  } = useContactForm()

  return (
    <Container
      className="contact-form"
      style={{
        position: 'sticky',
        top: '50px',
        width: '280px',
        backgroundColor: 'white',
        zIndex: '10',
        padding: '1rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Contact'}
        </Button>
      </Form>
    </Container>
  )
}

export default ContactForm
