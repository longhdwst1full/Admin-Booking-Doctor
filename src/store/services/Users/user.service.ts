import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICreateUser, IUpdatePassWorduserDTO, IUsers, IUserUpdateDTO } from '~/types/user.type'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    credentials: 'include'
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllUser: builder.query<IUsers[], void>({
      query: () => `/User`,
      providesTags: ['User']
    }),

    addUser: builder.mutation<any, ICreateUser>({
      query: (user) => ({
        url: '/User',
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['User']
    }),

    updateUser: builder.mutation<any, IUserUpdateDTO>({
      query: (user) => ({
        url: `/User/${user.id}`,
        method: 'PUT',
        body: {
          ...user
        }
      }),
      invalidatesTags: ['User']
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/User/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['User']
    }),

    // update password
    updatePassUserId: builder.mutation<{ message: string }, IUpdatePassWorduserDTO>({
      query: (data) => ({
        url: '/User/update/password/' + data.id,
        method: 'POST',
        body: data
      })
    }),
    // update password
    updateRoleUserId: builder.mutation<{ message: string }, any>({
      query: (data) => ({
        url: '/User/update/role-user/' + data.id,
        method: 'POST',
        body: data
      })
    })
  })
})

export const {
  useGetAllUserQuery,
  useAddUserMutation,
  useUpdatePassUserIdMutation,
  useUpdateRoleUserIdMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi
