import { baseApi } from "../../baseApi/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit)
        return {
          url: "/admin/all-users",
          method: "GET",
          params,
        };
      },
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
