import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saleList: [],
}

const ClientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setSaleList(state, action) {
      state.saleList = action.payload;
    },
    createSale(state, action){
      let temp = state.saleList;
      temp.push(action.payload);
      state.saleList = temp;
    },
    editSale(state, action){
      let temp = state.saleList;
      let index = temp.findIndex(item => {
        return item._id === action.payload._id
      });
      temp.splice(index,1,action.payload);
      state.saleList = temp;
    }
  }
});

export const { setSaleList, createSale, editSale } = ClientSlice.actions;
export default ClientSlice.reducer;