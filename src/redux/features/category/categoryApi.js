const { baseApi } = require("@/redux/baseApi/baseApi");

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllCategories: builder.query({
        query: () => ({
          url: "/common/categorys",
          method: "GET",
        }),
        transformResponse: (response) => response?.data?.attributes
      }),
    }),
})

export const { useGetAllCategoriesQuery } = categoryApi;
