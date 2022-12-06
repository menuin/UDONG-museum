import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  near: [],
};
export const exhibitionSlice = createSlice({
  name: "exhibition",
  initialState,
  reducers: {
    near: (state, action) => {
      state.near = action.payload;
    },
  },
});

export const exhibitionActions = exhibitionSlice.actions;
