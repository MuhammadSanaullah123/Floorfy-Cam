import { apiSlice } from "./apiSlice";

/* const USERS_URL = "https://travendev.com/api/api/document"; */

const USERS_URL = `${process.env.REACT_APP_BACKEND_URL}/api/tour`;
/* const USERS_URL = "http://localhost:5000/api/tour"; */
export const tourApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTour: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateTourImages: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTourImages: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "DELETE",
        body: data,
      }),
    }),
    getTour: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
    }),
    getAllTour: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateTourMutation,
  useGetTourMutation,
  useGetAllTourMutation,
  useUpdateTourImagesMutation,
  useDeleteTourImagesMutation,
} = tourApiSlice;
