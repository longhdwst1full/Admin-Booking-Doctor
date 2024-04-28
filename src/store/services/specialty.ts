import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CreateSpecialty, ISpecialty, PostSpecialtyResponse, ResponeDoctorInSpec } from '~/types/specialties.type'

export const specialtyApi = createApi({
  reducerPath: 'specialtyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + '/Specialty',
    credentials: 'include'
    // prepareHeaders: (headers, { getState }) => {
    //   const accessToken = (getState() as RootState).persistedReducer.auth.user?.accessToken

    //   if (accessToken) {
    //     headers.set('authorization', `Bearer ${accessToken}`)
    //   }
    //   return headers
    // }
  }),
  tagTypes: ['Specialty'],
  endpoints: (builder) => ({
    getAllSpecialty: builder.query<ISpecialty[], void>({
      query: () => `/`,
      providesTags: ['Specialty']
    }),
    getSpecialty: builder.query<ISpecialty, void>({
      query: (id) => `/${id}`,
      providesTags: ['Specialty']
    }),
    getSpecialtyDoctor: builder.query<ResponeDoctorInSpec, void>({
      query: (id) => `/get-doctor/${id}`,
      providesTags: ['Specialty']
    }),

    addSpecialty: builder.mutation<PostSpecialtyResponse, CreateSpecialty>({
      query: (specialty) => ({
        url: '/',
        method: 'POST',
        body: specialty
      }),
      invalidatesTags: ['Specialty']
    }),

    updateSpecialty: builder.mutation<any, any>({
      query: (specialty) => ({
        url: `/${specialty.id}`,
        method: 'PUT',
        body: {
          ...specialty
        }
      }),
      invalidatesTags: ['Specialty']
    }),

    deleteSpecialty: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Specialty']
    })
  })
})

export const {
  useGetAllSpecialtyQuery,
  useGetSpecialtyDoctorQuery,
  useGetSpecialtyQuery,
  useAddSpecialtyMutation,
  useDeleteSpecialtyMutation,
  useUpdateSpecialtyMutation
} = specialtyApi
