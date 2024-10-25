import { baseApi } from "../../baseApi/baseApi";


const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllCategories: builder.query({
        query: () => ({
          url: "/common/categorys",
          method: "GET",
        }),
        transformResponse: (response) => response?.data?.attributes
      }),
      addCategory: builder.mutation({
        query: (data) => ({
          url: "/admin/category",
          method: "POST",
          body: data,
        }),
        transformResponse: (response) => response?.data?.attributes,
      })
    }),
})

export const { useGetAllCategoriesQuery,useAddCategoryMutation } = categoryApi;
