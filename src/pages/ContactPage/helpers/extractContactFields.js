export const extractContactFields = (contact) => {
  const { resources } = contact || {}
  const fields = resources?.[0]?.fields || {}

  return {
    firstName: fields['first name']?.[0]?.value || '',
    lastName: fields['last name']?.[0]?.value || '',
    email: fields.email?.[0]?.value || '',
    avatarUrl: resources?.[0]?.avatar_url || '',
    tags: resources?.[0]?.tags || [],
  }
}
