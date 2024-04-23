import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  propertyInfo: [],
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setProperty: (state, action) => {
      state.propertyInfo = action.payload;
    },

    clearProperty: (state, action) => {
      state.propertyInfo = [];
    },
  },
});

export const { setProperty, clearProperty } = propertySlice.actions;

export default propertySlice.reducer;
