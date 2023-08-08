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
      const photographer = state.data.photographers.find(photographer => photographer.id === parseInt(action.payload.medium.photographerId));
      const medium = photographer.media.list.find(medium => medium.id === parseInt(action.payload.medium.id));
      if(medium.liked) {
        medium.likes--;
        photographer.totalLikes--;
      } else {
        medium.likes++;
        photographer.totalLikes++;
      }
      medium.liked = !medium.liked;
    },
    sortMedia: (state, action) => {
      const photographer = state.data.photographers.find(photographer => photographer.id === parseInt(action.payload.photographerId));
      const sortByDate = (a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return bDate - aDate;
      };
      const sortByPopularity = (a, b) => {
          return b.likes - a.likes;
      };
      const sortByTitle = (a, b) => {
          return a.title.localeCompare(b.title);
      };

      switch(action.payload.sorting) {
          case "Date":
              photographer.media.list = photographer.media.list.sort(sortByDate);
              break;
          case "Titre":
              photographer.media.list = photographer.media.list.sort(sortByTitle);
              break;
          default:
              photographer.media.list = photographer.media.list.sort(sortByPopularity);
              break;
      };
      photographer.media.sorting = action.payload.sorting;
    }
  }
});

export const { setData, toggleLike, sortMedia } = photographerSlice.actions;
export default photographerSlice.reducer;