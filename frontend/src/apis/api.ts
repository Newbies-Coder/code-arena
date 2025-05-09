import { LoginFieldType, TokenType } from '@/@types/form.type'
import { getStore } from '@/utils/setting'
import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'

type AxiosBaseQueryResult = {
  data?: any
  error?: {
    status: number
    data: string | AxiosError
  }
}

type UserType = {
  email: string
  exp: string
  iat: string
  role: string
  token_type: string
  username: string
  _id: string
}

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    AxiosBaseQueryResult
  > =>
  async ({ url, method, data, params, headers }) => {
    const token = getStore('accessToken')
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...headers },
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:8080/api/v1' }),
  endpoints(build) {
    return {
      getUsers: build.query({ query: () => ({ url: '/users', method: 'get' }) }),
      login: build.mutation({
        query: (data: LoginFieldType) => ({ url: '/users/login', method: 'post', data: data }),
      }),
      isAdmin: build.mutation({
        query: () => ({ url: '/users/test-token', method: 'post' }),
      }),
      getNewToken: build.mutation({
        query: (data: TokenType) => ({ url: '/users/refresh-token', method: 'post', data: data }),
      }),
    }
  },
})

export const { useGetUsersQuery, useLoginMutation, useIsAdminMutation, useGetNewTokenMutation } = api
