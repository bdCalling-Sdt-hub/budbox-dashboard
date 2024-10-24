import { baseApi } from "../../baseApi/baseApi";

const comboboxApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComboBox: builder.query({
      query: () => ({
        url: "/user/budbox?categoryType=combo-box",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
  }),
});

export const { useGetAllComboBoxQuery } = comboboxApi;
