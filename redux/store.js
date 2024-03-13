"use client";
import { configureStore } from "@reduxjs/toolkit";
import { tweetopiaApi } from "./tweetopiaApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [tweetopiaApi.reducerPath]: tweetopiaApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tweetopiaApi.middleware),
  });
};
