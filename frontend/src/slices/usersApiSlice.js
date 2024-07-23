import { apiSlice } from "./apiSlice";

/* const USERS_URL = "https://travendev.com/api/api/users"; */
const USERS_URL = "http://localhost:5000/api/users";
/* const USERS_URL = `${process.env.REACT_APP_BACKEND_URL}/api/users`; */

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    auth: builder.mutation({
      query: (data) => ({
        /* url: `https://travendev.com/api/api/auth`, */
        /*      url: `http://localhost:5000/api/auth`, */
        url: `${process.env.REACT_APP_BACKEND_URL}/api/auth`,
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateUserBasic: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/basic/${data.id}`,
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.mutation({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
    }),
    getUserById: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
    }),
    getResetCode: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotPassword`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resetPassword/${data.id}/${data.token}`,
        method: "POST",
        body: data,
      }),
    }),

    sendSms: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/sms`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useAuthMutation,
  useUpdateUserMutation,
  useUpdateUserBasicMutation,
  useGetAllUsersMutation,
  useGetUserByIdMutation,
  useGetResetCodeMutation,
  useResetPasswordMutation,
  useSendSmsMutation,
} = usersApiSlice;
