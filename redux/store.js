"use client";
import { configureStore } from "@reduxjs/toolkit";
import pantryReducer from "@/redux/pantrySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      pantry: pantryReducer,
    },
  });
};
