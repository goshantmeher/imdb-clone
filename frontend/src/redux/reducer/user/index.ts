import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  _id?: string;
  name?: string;
  email?: string;
}

const initialState: UserState = {
  _id: "",
  name: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      state._id = action.payload._id || state._id;
      state.name = action.payload.name || state.name;
      state.email = action.payload.email || state.email;
    },
  },
});

// Action creators are generated for each case reducer function
export const { clearUser, setUser, updateUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export const userState = (state: RootState) => state.user;

export default userReducer;
