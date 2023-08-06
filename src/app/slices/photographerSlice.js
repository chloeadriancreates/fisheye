import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const photographerSlice = createSlice({
  name: "photographers",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    toggleLike: (state, action) => {
      const medium = state.data.media.find(medium => medium.id === parseInt(action.payload.id));
      console.log(medium.liked);
      if(medium.liked) {
        medium.likes--;
      } else {
        medium.likes++;
      }
      medium.liked = !medium.liked;
    }
  }
});

export const { setData, toggleLike } = photographerSlice.actions;
export default photographerSlice.reducer;