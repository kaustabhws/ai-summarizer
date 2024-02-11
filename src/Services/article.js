import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiKeys = process.env.REACT_APP_RAPID_API_KEY;
const keys = apiKeys.slice(1, -1).split(', ');
const apiKey = keys[Math.floor(Math.random() * keys.length)];

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', apiKey);
      headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

      return headers;
    }
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
    })
  })
})

export const { useLazyGetSummaryQuery } = articleApi;