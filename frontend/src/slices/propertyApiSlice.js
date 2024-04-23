import { apiSlice } from "./apiSlice";

/* const USERS_URL = "https://travendev.com/api/api/document"; */
/* const USERS_URL = "http://localhost:5000/api/document"; */
const USERS_URL = `${process.env.REACT_APP_BACKEND_URL}/api/property`;

export const propertyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProperty: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.tour_id}`,
        method: "POST",
        body: data,
      }),
    }),
    getProperty: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useUpdatePropertyMutation, useGetPropertyMutation } =
  propertyApiSlice;
