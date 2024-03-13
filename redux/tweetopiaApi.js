"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tweetopiaApi = createApi({
  reducerPath: "tweetopiaApi",
  tagTypes: ["Tweets", "Favorite"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (build) => ({
    // GET TWEETS

    getTweets: build.query({
      query: ({ limit = 5, page = 1 }) => `tweet?limit=${limit}&page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tweets", id })),
              { type: "Tweets", id: "LIST" },
            ]
          : [{ type: "Tweets", id: "LIST" }],
    }),

    // GET TWEET BY ID

    getTweet: build.query({
      query: (tweetId) => `tweet/${tweetId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tweets", id })),
              { type: "Tweets", id: "LIST" },
            ]
          : [{ type: "Tweets", id: "LIST" }],
    }),

    // GET PROFILE

    getProfile: build.query({
      query: (userId) => `users/${userId}/posts`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tweets", id })),
              { type: "Tweets", id: "LIST" },
            ]
          : [{ type: "Tweets", id: "LIST" }],
    }),

    // GET FAVORITE

    getFavorite: build.query({
      query: (userId) => `users/${userId}/favorite`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Favorite", id })),
              { type: "Favorite", id: "LIST" },
            ]
          : [{ type: "Favorite", id: "LIST" }],
    }),

    // CREATE NEW TWEET

    createTweet: build.mutation({
      query: (body) => ({
        url: "tweet/new",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Tweets", id: "LIST" }],
    }),

    // UPDATE TWEET

    updateTweet: build.mutation({
      query: ({ tweetId, body }) => ({
        url: `tweet/${tweetId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Tweets", id: "LIST" }],
    }),

    // DELETE TWEET

    deleteTweet: build.mutation({
      query: (tweetId) => ({
        url: `tweet/${tweetId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Tweets", id: "LIST" }],
    }),

    // ADD FAVORITE

    addFavorite: build.mutation({
      query: ({ userId, body }) => ({
        url: `users/${userId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Tweets", id: "LIST" }],
    }),

    // DELETE FAVORITE

    deleteFavorite: build.mutation({
      query: ({ userId, body }) => ({
        url: `users/${userId}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [{ type: "Tweets", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTweetsQuery,
  useGetTweetQuery,
  useGetProfileQuery,
  useCreateTweetMutation,
  useDeleteTweetMutation,
  useUpdateTweetMutation,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useGetFavoriteQuery,
} = tweetopiaApi;
