import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetContactQuery, useAddContactTagsMutation } from 'services/api/contactsApi'
import { extractContactFields } from '../helpers/extractContactFields'


const useContactPage = () => {
  const { id } = useParams()
  const { data: contact, error, isLoading } = useGetContactQuery(id)
  const [addContactTags] = useAddContactTagsMutation()
  const [showToast, setShowToast] = useState(false)
  const [tags, setTags] = useState([])

  useEffect(() => {
    if (contact) {
      setTags(contact.tags || [])
    }
  }, [contact])

  useEffect(() => {
    if (error) {
      setShowToast(true)
    }
  }, [error])

  const handleAddTags = async (newTags) => {
    try {
      const updatedTags = await addContactTags({ id, tags: newTags }).unwrap()
      setTags(updatedTags)
    } catch (err) {
      console.error('Failed to add tags:', err)
    }
  }

  const contactFields = contact ? extractContactFields(contact) : {}

  return {
    contact,
    error,
    isLoading,
    showToast,
    setShowToast,
    tags,
    handleAddTags,
    contactFields,
  }
}

export default useContactPage
