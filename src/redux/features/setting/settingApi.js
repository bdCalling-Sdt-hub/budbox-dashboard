import { baseApi } from "../../baseApi/baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTermsCondition: builder.mutation({
      query: (data) => ({
        url: "/info/terms-condition",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Terms"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    addPrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/info/privacy-policy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Privacy"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    addAboutUs: builder.mutation({
      query: (data) => ({
        url: "/info/about-us",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["AboutUs"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    getTermsCondition: builder.query({
      query: () => ({
        url: "/info/terms-condition",
        method: "GET",
      }),
      providesTags: ["Terms"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/info/privacy-policy",
        method: "GET",
      }),
      providesTags: ["Privacy"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    getAboutUs: builder.query({
      query: () => ({
        url: "/info/about-us",
        method: "GET",
      }),
      providesTags: ["AboutUs"],
      transformResponse: (response) => response?.data?.attributes,
    }),
  }),
});

export const {
  useAddAboutUsMutation,
  useAddPrivacyPolicyMutation,
  useAddTermsConditionMutation,
  useGetTermsConditionQuery,
  useGetPrivacyPolicyQuery,
  useGetAboutUsQuery,
} = settingApi;
