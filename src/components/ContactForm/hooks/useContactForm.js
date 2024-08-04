import { useState } from 'react'
import { useAddContactMutation, contactsApi } from 'services/api/contactsApi'
import { getContactData, validateForm } from '../helpers'
import { useDispatch } from 'react-redux'
import { EMPTY_LENGTH } from 'constants'

const useContactForm = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })
  const [toast, setToast] = useState({
    show: false,
    message: '',
    bg: '',
    label: '',
  })
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})
  const [addContact, { isLoading }] = useAddContactMutation()
  const dispatch = useDispatch()

  const contactData = getContactData(
    userInfo.firstName.trim(),
    userInfo.lastName.trim(),
    userInfo.email.trim(),
  )

  const resetForm = () => {
    setUserInfo({ firstName: '', lastName: '', email: '' })
    setErrors({})
    setValidated(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm(
      userInfo.firstName,
      userInfo.lastName,
      userInfo.email
    )

    if (Object.keys(newErrors).length > EMPTY_LENGTH) {
      setErrors(newErrors)
      setValidated(false)
      return
    }

    setErrors({})
    setValidated(true)

    try {
      const addedContact = await addContact(contactData).unwrap()
      dispatch(
        contactsApi.util.updateQueryData('getContacts', undefined, (draft) => {
          draft.resources.unshift(addedContact)
        })
      )
      resetForm()
    } catch (error) {
      console.error('Failed to add contact:', error)
      setToast({
        show: true,
        message: 'Failed to add contact. Please try again.',
        bg: 'danger',
        label: 'Oooops',
      })
    }
  }

  const closeToast = () => setToast({ ...toast, show: false })

  return {
    userInfo,
    isLoading,
    setUserInfo,
    handleSubmit,
    validated,
    errors,
    toast,
    closeToast,
  }
}

export default useContactForm
