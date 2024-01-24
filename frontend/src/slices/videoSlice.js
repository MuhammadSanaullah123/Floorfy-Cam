import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoInfo: [],
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideo: (state, action) => {
      state.videoInfo = Object.values(action.payload);
    },
    clearVideo: (state, action) => {
      state.videoInfo = [];
    },
  },
});

export const { setVideo, clearVideo } = videoSlice.actions;

export default videoSlice.reducer;
