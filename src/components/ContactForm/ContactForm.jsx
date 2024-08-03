import { Form, Button, Container } from 'react-bootstrap'
import useContactForm from './hooks/useContactForm'
import CustomToast from 'components/CustomToast/CustomToast'
import {
  FORM_EMAIL_ID,
  FORM_FIRST_NAME_ID,
  FORM_LAST_NAME_ID,
} from './constants'
import './ContactForm.css'
import TextInput from 'components/TextInput/TextInput'

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
    <Container className="contact-form-container">
      <p className="mb-3 fs-5 fw-medium">Create Contact</p>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <TextInput
          label="First Name"
          errorMessage={errors.firstName}
          value={userInfo.firstName}
          onChange={(value) => setUserInfo({ ...userInfo, firstName: value })}
          className={'mb-1 fs-8'}
          id={FORM_FIRST_NAME_ID}
        />
        <TextInput
          label="Last Name"
          errorMessage={errors.lastName}
          value={userInfo.lastName}
          onChange={(value) => setUserInfo({ ...userInfo, lastName: value })}
          className={'mt-3 fs-8'}
          id={FORM_LAST_NAME_ID}
        />
        <TextInput
          label="Email"
          type="email"
          errorMessage={errors.email}
          value={userInfo.email}
          onChange={(value) => setUserInfo({ ...userInfo, email: value })}
          required
          className={'mt-3 fs-8'}
          id={FORM_EMAIL_ID}
        />
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
