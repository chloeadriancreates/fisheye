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
      const photographer = state.data.photographers.find(photographer => photographer.id === medium.photographerId);
      if(medium.liked) {
        medium.likes--;
        photographer.totalLikes--;
      } else {
        medium.likes++;
        photographer.totalLikes++;
      }
      medium.liked = !medium.liked;
    },
    updateSorting: (state, action) => {
      state.data.sorting = action.payload.sorting;
    }
  }
});

export const { setData, toggleLike, updateSorting } = photographerSlice.actions;
export default photographerSlice.reducer;