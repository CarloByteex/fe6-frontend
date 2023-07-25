import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    id: 0,
    name: "",
    isAdmin: false,
    status: ""
  }
}

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      console.log(action.payload)
      let temp = {
        id: action.payload.data._id,
        name: action.payload.data.name,
        isAdmin: action.payload.isAdmin,
        status: action.payload.status
      };
      state.auth = temp;
    },
    reset(state) {
      state.auth = initialState.auth
    }
  }
});

export const { setAuth, reset} = AuthSlice.actions;
export default AuthSlice.reducer;