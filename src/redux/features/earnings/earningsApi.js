import { baseApi } from "../../baseApi/baseApi";

const earningsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        return {
          url: "/admin/getRecentTransactions",
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const { useGetEarningsQuery } = earningsApi;
