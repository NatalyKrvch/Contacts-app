import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { EMPTY_LENGTH } from 'constants'
import {
  useGetContactQuery,
  useAddContactTagsMutation,
} from 'services/api/contactsApi'
import { extractContactFields } from '../helpers/extractContactFields'

const useContactPage = () => {
  const { id } = useParams()
  const { data, error, isLoading } = useGetContactQuery(id)
  const [addContactTags] = useAddContactTagsMutation()
  const [showToast, setShowToast] = useState(false)
  const [tags, setTags] = useState([])

  const contact = data?.resources?.[0]
  const isTagsHaveValues = tags.length > EMPTY_LENGTH

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
      const existingTags = isTagsHaveValues ? tags.map((tag) => tag.tag) : []
      const allTags = [...existingTags, ...newTags]
      const updatedContact = await addContactTags({
        id: contact.id,
        tags: allTags,
      }).unwrap()
      const isValidContactResponse =
        updatedContact.resources && updatedContact.resources[0]

      if (isValidContactResponse) {
        setTags(updatedContact.resources[0].tags)
      } else {
        console.error('Unexpected response structure:', updatedContact)
      }
    } catch (error) {
      console.error('Failed to add tags:', error)
    }
  }

  const contactFields = contact
    ? extractContactFields({ resources: [contact] })
    : {}

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
