import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: ""
}

const AuthTokenSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      console.log(action.payload)
      state.token = action.payload;
    },
    resetToken(state) {
      state.token = initialState.token
    }
  }
});

export const { setToken, resetToken } = AuthTokenSlice.actions;
export default AuthTokenSlice.reducer;