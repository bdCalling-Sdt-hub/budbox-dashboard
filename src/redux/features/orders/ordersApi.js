import { baseApi } from "../../baseApi/baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit)
        return {
          url: "/order/admin-all",
          method: "GET",
          params,
        };
      },
      providesTags: ["Orders"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    updateOder: builder.mutation({
      query: ({id, data}) => ({
        url: `/order/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersQuery, useUpdateOderMutation } = ordersApi;
