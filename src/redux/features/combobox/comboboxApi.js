const { baseApi } = require("@/redux/baseApi/baseApi");

const comboboxApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBrands: builder.query({
            query: () => ({
                url: "/user/budbox?categoryType=combo-box",
                method: "GET",
            }),
            transformResponse: (response) => response?.data?.attributes
        }),
    }),
})

export const { useGetAllBrandsQuery } = comboboxApi;