const { baseApi } = require("@/redux/baseApi/baseApi");

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      url: "/user",
      method: "GET",
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/user/update",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
} = profileApi;
