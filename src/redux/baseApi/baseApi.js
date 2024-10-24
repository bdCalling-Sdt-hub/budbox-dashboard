import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.169:8080/api/v1",
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the token from your store or local storage
      const token = getState().auth.token;

      // If a token exists, add it to the headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      // You can also set other headers here if needed
      headers.set("Content-Type", "application/json");
      
      return headers;
    }
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
