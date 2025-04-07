import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user";
import celebrityReducer from "./reducer/celebrity";
import movieReducer from "./reducer/movie";

export const store = configureStore({
  reducer: {
    user: userReducer,
    celebrity: celebrityReducer,
    movie: movieReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
