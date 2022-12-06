import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMe: false,
  user: {},
};
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    isMe: (state, action) => {
      state.isMe = action.payload;
    },
    user: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;
