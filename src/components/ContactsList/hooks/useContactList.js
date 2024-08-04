import { useState, useEffect } from 'react'
import { useGetContactsQuery } from 'services/api/contactsApi'

const useContactList = () => {
  const { data, error, isLoading } = useGetContactsQuery()
  const [toast, setToast] = useState({
    show: false,
    message: '',
    bg: '',
    label: '',
  })

  const toastSettings = {
    show: true,
    label: 'Something went wrong',
    bg: 'danger',
    message: 'Failed to load contacts. Please try again.',
  }

  const isValidData = data && !Array.isArray(data.resources)

  useEffect(() => {
    if (isValidData) {
      setToast(toastSettings)
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setToast(toastSettings)
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
