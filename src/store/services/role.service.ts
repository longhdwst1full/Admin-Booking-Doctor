import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '~/store/store'
import { IUserDocs } from '~/types/user.type'

export const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + '/Role',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).persistedReducer.auth.user?.accessToken

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }
      return headers
    }
  }),
  tagTypes: ['Role'],
  endpoints: (builder) => ({
    getAllRole: builder.query<IUserDocs, void>({
      query: () => `/`,
      providesTags: ['Role']
    }),
    getRole: builder.query<IUserDocs, void>({
      query: (id) => `/${id}`,
      providesTags: ['Role']
    }),

    addRole: builder.mutation<any, any>({
      query: (user) => ({
        url: '/',
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['Role']
    }),

    updateRole: builder.mutation<any, any>({
      query: (user) => ({
        url: `/${user.id}`,
        method: 'PUT',
        body: {
          ...user
        }
      }),
      invalidatesTags: ['Role']
    }),

    deleteRole: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Role']
    })
  })
})

export const { useGetAllRoleQuery, useAddRoleMutation, useDeleteRoleMutation, useGetRoleQuery, useUpdateRoleMutation } =
  roleApi
