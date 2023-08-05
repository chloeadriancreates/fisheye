import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const photographerSlice = createSlice({
  name: "photographers",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setData } = photographerSlice.actions;
export default photographerSlice.reducer;