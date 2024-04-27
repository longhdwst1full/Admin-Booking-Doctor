import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '~/store/store'
import { ICreateUser, IUpdatePassWorduserDTO, IUserDocs, IUserUpdateDTO } from '~/types/user.type'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).persistedReducer.auth.user?.accessToken

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }
      return headers
    }
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllUser: builder.query<IUserDocs, void>({
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
