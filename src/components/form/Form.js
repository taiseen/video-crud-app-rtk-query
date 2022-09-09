import { useAddVideoMutation, useEditVideoMutation } from "../../redux/features/apiSlice/apiSlice";
import { TextInput, TextArea, Success, Error } from '..';
import { useEffect, useState } from "react";


export default function Form({ video = {}, videoId = '' }) {

    const [addVideo, { isLoading, isSuccess, isError }] = useAddVideoMutation();
    const [editVideo, { isLoading: editLoading, isSuccess: editSuccess, isError: editError }] = useEditVideoMutation();

    const [videoObject, setVideoObject] = useState({
        title: '',
        author: '',
        description: '',
        link: '',
        thumbnail: '',
        date: '',
        duration: '',
        views: ''
    })


    const handleInputOnChange = e => setVideoObject(pre => ({ ...pre, [e.target.name]: e.target.value }));


    const handleOnSubmit = e => {
        e.preventDefault();

        if (videoId) {
            editVideo({ id: videoId, data: videoObject });
        } else {
            addVideo(videoObject);
        }

        //  clear all input field's...
        Object.keys(videoObject).map(key => setVideoObject(pre => ({ ...pre, [key]: '' })))
    }


    // if videoId present ===> edit mode on...
    useEffect(() => setVideoObject(video), [videoId]);


    return (
        <form action="#" method="POST" onSubmit={handleOnSubmit}>

            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">

                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput title="Video Title" name='title' value={videoObject?.title} onChange={handleInputOnChange} />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput title="Author" name='author' value={videoObject?.author} onChange={handleInputOnChange} />
                        </div>

                        <div className="col-span-6">
                            <TextArea title="Description" name='description' value={videoObject?.description} onChange={handleInputOnChange} />
                        </div>

                        <div className="col-span-6">
                            <TextInput title="YouTube Video link" name='link' value={videoObject?.link} onChange={handleInputOnChange} />
                        </div>

                        <div className="col-span-6">
                            <TextInput title="Thumbnail link" name='thumbnail' value={videoObject?.thumbnail} onChange={handleInputOnChange} />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <TextInput title="Upload Date" name='date' value={videoObject?.date} onChange={handleInputOnChange} />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput title="Video Duration" name='duration' value={videoObject?.duration} onChange={handleInputOnChange} />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput title="Video no of views" name='views' value={videoObject?.views} onChange={handleInputOnChange} />
                        </div>
                    </div>
                    
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type="submit"
                        disabled={videoId ? editLoading : isLoading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>


                {
                    videoId
                        ? editSuccess && <Success message="Video edit successful" />
                        : isSuccess && <Success message="Video added successfully" />
                }

                {
                    videoId
                        ? editError && <Error info='Can not edit video' />
                        : isError && <Error info='Can not add video' />
                }

            </div>
        </form>
    );
}
