import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL, AUTH_TOKEN, CORS_PROXY_URL } from 'constants'

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${CORS_PROXY_URL}${API_URL}`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${AUTH_TOKEN}`)
      return headers
    },
  }),
  tagTypes: ['Contacts', 'Contact'],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: 'contacts',
        params: {
          sort: 'created:desc',
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.resources.map(({ id }) => ({ type: 'Contact', id })),
              { type: 'Contacts', id: 'LIST' },
            ]
          : [{ type: 'Contacts', id: 'LIST' }],
    }),
    getContact: builder.query({
      query: (id) => `contact/${id}`,
      providesTags: (result, error, id) => [{ type: 'Contact', id }],
    }),
    addContact: builder.mutation({
      query: (newContact) => ({
        url: 'contact',
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contact/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Contacts', id: 'LIST' },
        { type: 'Contact', id },
      ],
    }),
    addContactTags: builder.mutation({
      query: ({ id, tags }) => ({
        url: `contacts/${id}/tags`,
        method: 'PUT',
        body: { tags },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Contact', id }],
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
