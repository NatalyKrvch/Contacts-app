import { useState } from 'react'
import { useAddContactMutation } from '../../services/api/contactsApi'

const useContactForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [addContact, { isLoading }] = useAddContactMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const contactData = {
      fields: {
        'first name': [{ value: firstName, modifier: '', label: 'first name' }],
        'last name': [{ value: lastName, modifier: '', label: 'last name' }],
        email: [{ value: email, modifier: '', label: 'email' }],
      },
      record_type: 'person',
      privacy: {
        edit: null,
        read: null,
      },
      owner_id: null,
    }

    try {
      await addContact(contactData).unwrap()
      setFirstName('')
      setLastName('')
      setEmail('')
    } catch (error) {
      console.error('Failed to add contact:', error)
    }
  }

  return {
    firstName,
    lastName,
    email,
    isLoading,
    setFirstName,
    setLastName,
    setEmail,
    handleSubmit,
  }
}

export default useContactForm
