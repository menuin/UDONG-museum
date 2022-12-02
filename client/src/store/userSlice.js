import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: "",
  user: {},
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.user = {};
    },
    me: (state, action) => {
      state.user = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    toggleFollow: (state, action) => {
      if (state.user.following.includes(action.payload)) {
        state.user.following = state.user.following.filter(
          (x) => x !== action.payload
        );
      } else {
        state.user.following.append(action.payload);
      }
    },
  },
});

export const userActions = userSlice.actions;
