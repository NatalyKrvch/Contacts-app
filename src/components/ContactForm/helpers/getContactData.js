export const getContactData = (firstName, lastName, email) => ({
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
})
