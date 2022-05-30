import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api.slice";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const extendedUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (resp) => {
        return usersAdapter.setAll(initialState, resp);
      },
      providesTags: (result, error, arg) => [
        { type: "User", id: "LIST" },
        ...result.ids.map((id) => ({ type: "User", id })),
      ],
    }),
  }),
});

export const { useGetUsersQuery } = extendedUserSlice;

export const selectUsersResult = extendedUserSlice.endpoints.getUsers.select();

export const selectUsersData = createSelector(
  selectUsersResult,
  (result) => result.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);

// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
// import { apiSlice } from "../api/api.slice";

// const usersAdapter = createEntityAdapter();

// const initialState = usersAdapter.getInitialState();

// export const extendedUserSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getUsers: builder.query({
//       query: () => "/users",
//       transformResponse: (responseData) => {
//         return usersAdapter.setAll(initialState, responseData);
//       },
//       providesTags: (result, error, arg) => [
//         { type: "User", id: "LIST" },
//         ...result.ids.map((id) => ({ type: "User", id })),
//       ],
//     }),
//   }),
// });

// export const { useGetUsersQuery } = extendedUserSlice;

// // returns the query result object
// export const selectUsersResult = extendedUserSlice.endpoints.getUsers.select();

// // Creates memoized selector
// const selectUsersData = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult.data // normalized state object with ids & entities
// );

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllUsers,
//   selectById: selectUserById,
//   selectIds: selectUserIds,
//   // Pass in a selector that returns the posts slice of state
// } = usersAdapter.getSelectors(
//   (state) => selectUsersData(state) ?? initialState
// );
