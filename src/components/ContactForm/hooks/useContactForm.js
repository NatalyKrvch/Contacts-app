import { useState } from 'react'
import { useAddContactMutation } from 'services/api/contactsApi'
import { getContactData, validateForm } from '../helpers'

const useContactForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState({ show: false, message: '' })
  const [addContact, { isLoading }] = useAddContactMutation()

  const contactData = getContactData(firstName, lastName, email)

  const resetForm = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setErrors({})
    setValidated(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm(firstName, lastName, email)

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setValidated(false)
      return
    }

    setErrors({})
    setValidated(true)

    try {
      await addContact(contactData).unwrap()
      resetForm()
    } catch (error) {
      console.error('Failed to add contact:', error)
      setToast({ show: true, message: 'Failed to add contact. Please try again.' })
    }
  }

  const closeToast = () => setToast({ ...toast, show: false })

  return {
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
  }
}

export default useContactForm
