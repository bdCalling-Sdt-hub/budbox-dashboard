import { baseApi } from "../../baseApi/baseApi";

const earningsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query({
      query: ({ page, limit, filters }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (filters) {
          filters.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
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
