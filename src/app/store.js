import { configureStore } from "@reduxjs/toolkit";
import photographerSliceReducer from "./slices/photographerSlice";

export const store = configureStore({
  reducer: {
    photographers: photographerSliceReducer
  }
});