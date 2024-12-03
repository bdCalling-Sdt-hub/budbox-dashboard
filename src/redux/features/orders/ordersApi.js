import { baseApi } from "../../baseApi/baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
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
          url: "/order/admin-all",
          method: "GET",
          params,
        };
      },
      providesTags: ["Orders"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    updateOder: builder.mutation({
      query: (data) => ({
        url: `/order/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersQuery, useUpdateOderMutation } = ordersApi;
