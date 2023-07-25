import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saleList: [],
  clientList: []
}

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSaleList(state, action) {
      state.saleList = action.payload;
    },
    editSale(state, action){
      let temp = state.saleList;
      let index = temp.findIndex(item => {
        return item._id === action.payload._id
      });
      temp.splice(index,1,action.payload);
      state.saleList = temp;
    },
    setClientList(state, action){
      state.clientList = action.payload;
    },
    editClient(state, action){
      let temp = state.clientList;
      let index = temp.findIndex(item => {
        return item._id === action.payload._id
      });
      temp.splice(index,1,action.payload);
      state.clientList = temp;
    },
  }
});

export const { setSaleList, editSale, setClientList, editClient } = AdminSlice.actions;
export default AdminSlice.reducer;