import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// White listed tag... for re-fetching data OR re-validate cache data when POST request happen 
const video = 'video'
const videos = 'videos'
const relatedVideos = 'relatedVideos'


// const baseUrl = 'http://localhost:9000';
const baseUrl = 'https://a-json-db.herokuapp.com';
const videoApiEndPoint = '/videos';


export const apiSlice = createApi({

    reducerPath: 'api',

    baseQuery: fetchBaseQuery({ baseUrl }),

    tagTypes: [videos, video, relatedVideos],

    endpoints: builder => ({


        // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩 GET Method 
        getVideos: builder.query({
            query: _ => videoApiEndPoint,
            keepUnusedDataFor: 60,
            providesTags: [videos],
        }),


        // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩 GET Method 
        getVideoById: builder.query({
            query: videoId => `${videoApiEndPoint}/${videoId}`,
            providesTags: (result, error, arg) => [{ type: video, id: arg }],
        }),


        // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩 GET Method 
        getRelatedVideos: builder.query({
            query: ({ id, title }) => {

                // const tags = title.split(' ').map(tag => `title_like=${tag}`).join('&');
                const tags = title.split(' ').map(tag => tag !== '-' && ('title_like=' + tag)).join('&');

                const queryString = `${videoApiEndPoint}?${tags}&_limit=5&id_ne=${id}`;

                return queryString;
            },
            providesTags: (result, error, arg) => [{ type: relatedVideos, id: arg.id }],
        }),


        // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨 POST Method 
        addVideo: builder.mutation({
            query: data => ({
                url: videoApiEndPoint,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [videos],
        }),


        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧 PATCH Method 
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `${videoApiEndPoint}/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [
                videos,
                { type: video, id: arg.id },
                { type: relatedVideos, id: arg.id },
            ],
        }),


        // 🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥 DELETE Method 
        deleteVideo: builder.mutation({
            query: id => ({
                url: `${videoApiEndPoint}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [videos],
        }),

    }),

});


export const {
    useGetVideosQuery,
    useGetVideoByIdQuery,
    useGetRelatedVideosQuery,
    useAddVideoMutation,
    useEditVideoMutation,
    useDeleteVideoMutation,
} = apiSlice;