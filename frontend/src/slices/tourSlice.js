import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tourInfo: [],
};

const TourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setTour: (state, action) => {
      state.tourInfo = action.payload;
    },
    setAllTour: (state, action) => {
      state.tourInfo = Object.values(action.payload);
    },
    clearTour: (state, action) => {
      state.tourInfo = [];
    },
  },
});

export const { setAllTour, setTour, clearTour } = TourSlice.actions;

export default TourSlice.reducer;
