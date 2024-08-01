import { useState, useEffect } from 'react'
import { useGetContactsQuery } from 'services/api/contactsApi'

const useContactList = () => {
  const { data, error, isLoading } = useGetContactsQuery()
  const [toast, setToast] = useState({ show: false, message: '' })

  useEffect(() => {
    if (data && !Array.isArray(data.resources)) {
      setToast({
        show: true,
        message: 'Failed to load contacts. Please try again.',
      })
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setToast({
        show: true,
        message: 'An error occurred while fetching contacts.',
      })
    }
  }, [error])

  const contacts = data?.resources

  return {
    contacts,
    toast,
    isLoading,
    setToast,
  }
}

export default useContactList
