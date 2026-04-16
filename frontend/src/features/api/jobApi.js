import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
    reducerPath: "jobApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
    }),
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: () => "/jobs",
            providesTags: ["Jobs"],
        }),

        addJob: builder.mutation({
            query: (newJob) => ({
                url: "/jobs",
                method: "POST",
                body: newJob,
            }),
            invalidatesTags: ["Jobs"],
        }),

        updateJob: builder.mutation({
            query: ({id, ...updateJob}) => ({
                url: `/jobs/${id}`,
                method: "PUT",
                body: updateJob,
            }),
            invalidatesTags: ["Jobs"],
        }),

        deleteJob: builder.mutation({
            query: (id) => ({
                url: `/jobs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Jobs"],
        }),
    })
})

export const {useGetJobsQuery, useAddJobMutation, useUpdateJobMutation, useDeleteJobMutation} = jobApi;