import { baseApi } from "../../baseApi/baseApi"


const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllProducts: builder.query({
        query: () => ({
          url: "/common/products",
          method: "GET",
        }),
        transformResponse: (response) => response?.data?.attributes?.results
      }),
    }),
})

export const {useGetAllProductsQuery} = productApi