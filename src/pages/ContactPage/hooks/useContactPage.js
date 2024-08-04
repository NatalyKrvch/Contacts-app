import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetContactQuery, useAddContactTagsMutation } from 'services/api/contactsApi'
import { extractContactFields } from '../helpers/extractContactFields'

const useContactPage = () => {
  const { id } = useParams()
  const { data, error, isLoading, refetch } = useGetContactQuery(id)
  const [addContactTags] = useAddContactTagsMutation()
  const [showToast, setShowToast] = useState(false)
  const [tags, setTags] = useState([])

  const contact = data?.resources?.[0]

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
      const existingTags = tags.length > 0 ? tags.map(tag => tag.tag) : []
      const allTags = [...existingTags, ...newTags]
      const updatedContact = await addContactTags({ id: contact.id, tags: allTags }).unwrap()
      if (updatedContact.resources && updatedContact.resources[0]) {
        setTags(updatedContact.resources[0].tags)
      } else {
        console.error('Unexpected response structure:', updatedContact)
      }
    } catch (err) {
      console.error('Failed to add tags:', err)
    }
  }

  const contactFields = contact ? extractContactFields({ resources: [contact] }) : {}

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
