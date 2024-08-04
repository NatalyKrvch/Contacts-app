import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteContactMutation, contactsApi } from 'services/api/contactsApi'
import { getFieldValue } from '../helpers/getFieldValue'
import { useDispatch } from 'react-redux'

const useContactCard = (contact) => {
  const { id, fields, avatar_url, tags } = contact
  const [toast, setToast] = useState({ show: false, message: '', bg: '' })
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDelete = async () => {
    try {
      await deleteContact(id).unwrap()
      dispatch(
        contactsApi.util.updateQueryData('getContacts', undefined, (draft) => {
          return {
            ...draft,
            resources: draft.resources.filter((contact) => contact.id !== id),
          }
        })
      )
    } catch (error) {
      setToast({
        show: true,
        message: 'Failed to delete contact',
        label: 'Oooops',
        bg: 'danger',
      })
    }
  }

  const onToastClose = () => setToast({ show: false, message: '', bg: '' })

  const navigateToContact = () => {
    navigate(`/contact/${id}`)
  }

  const firstName = getFieldValue(fields, 'first name')
  const lastName = getFieldValue(fields, 'last name')
  const email = getFieldValue(fields, 'email')

  const userInfo = {
    firstName,
    lastName,
    email,
    avatarUrl: avatar_url,
    tags,
  }

  return {
    handleDelete,
    isDeleting,
    toast,
    onToastClose,
    userInfo,
    navigateToContact,
  }
}

export default useContactCard
