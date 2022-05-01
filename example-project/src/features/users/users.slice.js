import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 0, name: "Simon Cowell" },
  { id: 1, name: "Scarlett Johnson" },
  { id: 2, name: "Brendan Eich" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: {
      reducer(state, action) {},
      prepare() {
        return {
          payload: {},
        };
      },
    },
  },
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
