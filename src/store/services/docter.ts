import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '~/store/store'
import { IAddDoctor, IDoctor, IGellAllDoctor, IPostDoctorResponse } from '~/types/doctor.type'

export const doctorApi = createApi({
  reducerPath: 'doctorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + '/Doctors',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
  
    }
  }),
  tagTypes: ['Doctor'],
  endpoints: (builder) => ({
    getAllDoctors: builder.query<IGellAllDoctor[], void>({
      query: () => `/`,
      providesTags: ['Doctor']
    }),
    getDoctor: builder.query<IDoctor, void>({
      query: (id) => `/${id}`,
      providesTags: ['Doctor']
    }),

    addDoctor: builder.mutation<IPostDoctorResponse, IAddDoctor>({
      query: (doctor) => ({
        url: '/',
        method: 'POST',
        body: doctor
      }),
      invalidatesTags: ['Doctor']
    }),

    updateDoctor: builder.mutation<any, any>({
      query: (doctor) => ({
        url: `/${doctor.id}`,
        method: 'PUT',
        body: {
          ...doctor
        }
      }),
      invalidatesTags: ['Doctor']
    }),

    deleteDoctor: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Doctor']
    })
  })
})

export const {
  useAddDoctorMutation,
  useGetAllDoctorsQuery,
  useDeleteDoctorMutation,
  useGetDoctorQuery,
  useUpdateDoctorMutation
} = doctorApi
