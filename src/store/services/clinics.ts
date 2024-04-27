import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '~/store/store'
import { IAddClinic } from '~/types/clinic.type'
import { IUserDocs } from '~/types/user.type'

export const clinicsApi = createApi({
  reducerPath: 'clinicsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + '/Clinics',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).persistedReducer.auth.user?.accessToken

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }
      return headers
    }
  }),
  tagTypes: ['Clinics'],
  endpoints: (builder) => ({
    getAllClinics: builder.query<IUserDocs, void>({
      query: () => `/`,
      providesTags: ['Clinics']
    }),
    getClinic: builder.query<IUserDocs, void>({
      query: (id) => `/${id}`,
      providesTags: ['Clinics']
    }),

    addClinic: builder.mutation<any, IAddClinic>({
      query: (clinic) => ({
        url: '/',
        method: 'POST',
        body: clinic
      }),
      invalidatesTags: ['Clinics']
    }),

    updateClinic: builder.mutation<any, any>({
      query: (clinics) => ({
        url: `/${clinics.id}`,
        method: 'PUT',
        body: {
          ...clinics
        }
      }),
      invalidatesTags: ['Clinics']
    }),

    deleteClinic: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Clinics']
    })
  })
})

export const {
  useAddClinicMutation,
  useDeleteClinicMutation,
  useGetAllClinicsQuery,
  useGetClinicQuery,
  useUpdateClinicMutation
} = clinicsApi
