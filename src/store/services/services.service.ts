import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '~/store/store'
import { ICreateServices } from '~/types/services.type'
import { IUserDocs } from '~/types/user.type'

export const servicesApi = createApi({
  reducerPath: 'servicesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + '/Services',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).persistedReducer.auth.user?.accessToken

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }
      return headers
    }
  }),
  tagTypes: ['Services'],
  endpoints: (builder) => ({
    getAllServices: builder.query<IUserDocs, void>({
      query: () => `/`,
      providesTags: ['Services']
    }),
    getService: builder.query<IUserDocs, void>({
      query: (id) => `/${id}`,
      providesTags: ['Services']
    }),

    addServices: builder.mutation<any, ICreateServices>({
      query: (addServices) => ({
        url: '/',
        method: 'POST',
        body: addServices
      }),
      invalidatesTags: ['Services']
    }),

    updateServices: builder.mutation<any, any>({
      query: (updateServices) => ({
        url: `/${updateServices.id}`,
        method: 'PUT',
        body: {
          ...updateServices
        }
      }),
      invalidatesTags: ['Services']
    }),

    deleteServices: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Services']
    })
  })
})

export const {
  useGetAllServicesQuery,
  useAddServicesMutation,
  useDeleteServicesMutation,
  useGetServiceQuery,
  useUpdateServicesMutation
} = servicesApi
