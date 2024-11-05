import { baseApi } from "../../baseApi/baseApi";

const buildBoxApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBuildBox: builder.query({
      query: () => ({
        url: "/admin/budboxs?categoryType=build-box",
        method: "GET",
      }),
      providesTags: ["BuildBox"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    addBuildBox: builder.mutation({
      query: (data) => ({
        url: "/admin/budbox",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BuildBox"],
      transformResponse: (response) => response.data,
    }),
    getBuildBoxById: builder.query({
      query: (id) => ({
        url: `/admin/budbox/${id}`,
        method: "GET",
      }),
      providesTags: ["BuildBox"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    updateBuildBox: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/budbox/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["BuildBox"],
      transformResponse: (response) => response.data,
    }),
    deleteBuildBox: builder.mutation({
      query: (id) => ({
        url: `admin/budbox/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BuildBox"],
    }),
  }),
});

export const {
  useGetAllBuildBoxQuery,
  useAddBuildBoxMutation,
  useDeleteBuildBoxMutation,
  useGetBuildBoxByIdQuery,
  useUpdateBuildBoxMutation,
} = buildBoxApi;
