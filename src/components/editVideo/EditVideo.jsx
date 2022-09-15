import { useGetVideoByIdQuery } from "../../redux/features/apiSlice";
import { useParams } from "react-router-dom";
import { Error, Form } from "..";


export default function EditVideo() {

    const { videoId } = useParams();
    const { data: video, isLoading, isError } = useGetVideoByIdQuery(videoId);


    let content = null;
    if (isLoading) content = <div>Loading...</div>;
    if (!isLoading && isError) content = <Error info='There was an error in this edit option...' />;
    if (!isLoading && !isError && video?.id) content = <Form video={video} videoId={videoId} />


    return (
        <div className="max-w-7xl mx-auto px-5 lg:px-0">
            <div className="w-full">
                <div className="px-4 sm:px-0 pb-4 mt-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Edit video
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Please re-check this form to edit video
                    </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    {
                        content
                    }
                </div>
            </div>
        </div>
    );
}