"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tweetopiaApi = createApi({
  reducerPath: "tweetopiaApi",
  tagTypes: ["Tweets"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tweetopia-omega-rouge.vercel.app/api/",
  }),
  endpoints: (build) => ({
    // GET TWEETS

    getTweets: build.query({
      query: () => `/tweet`,
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
  }),
});

export const {
  useGetTweetsQuery,
  useGetTweetQuery,
  useGetProfileQuery,
  useCreateTweetMutation,
  useDeleteTweetMutation,
  useUpdateTweetMutation,
} = tweetopiaApi;
