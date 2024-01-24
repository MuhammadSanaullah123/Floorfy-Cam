import { apiSlice } from "./apiSlice";

/* const USERS_URL = "https://travendev.com/api/api/document"; */
const USERS_URL = "http://localhost:5000/api/video";

export const videoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideo: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/session`,
        method: "GET",
        /*   credentials: "include", */
      }),
    }),
  }),
});

export const { useGetVideoMutation } = videoApiSlice;
