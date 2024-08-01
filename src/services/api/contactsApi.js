import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL, AUTH_TOKEN, CORS_PROXY_URL } from '../../constants/globalConstants'

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${CORS_PROXY_URL}${API_URL}`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${AUTH_TOKEN}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: 'contacts',
        params: {
          sort: 'created:desc',
        },
      }),
    }),
    getContact: builder.query({
      query: (id) => `contact/${id}`,
    }),
    addContact: builder.mutation({
      query: (newContact) => ({
        url: 'contact',
        method: 'POST',
        body: newContact,
      }),
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contact/${id}`,
        method: 'DELETE',
      }),
    }),
    addContactTags: builder.mutation({
      query: ({ id, tags }) => ({
        url: `contact/${id}/tags`,
        method: 'PUT',
        body: tags,
      }),
    }),
  }),
})

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useAddContactTagsMutation,
} = contactsApi
