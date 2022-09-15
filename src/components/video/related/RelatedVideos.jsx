import { useGetRelatedVideosQuery } from "../../../redux/features/apiSlice";
import { RelatedVideo, RelatedVideoLoader, Error } from '../..';


export default function RelatedVideos({ id, title }) {

    const { data: relatedVideos, isLoading, isError } = useGetRelatedVideosQuery({ id, title });


    let content = null;
    if (isLoading) content = <> <RelatedVideoLoader /> <RelatedVideoLoader /> <RelatedVideoLoader /> </>;
    if (!isLoading && isError) content = <Error info='There was an error in related loading...' />;
    if (!isLoading && !isError && relatedVideos?.length === 0) content = <Error info='No related video found' />;
    if (!isLoading && !isError && relatedVideos?.length > 0) content =
        relatedVideos.map(video => <RelatedVideo key={video.id} video={video} />);


    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {
                content
            }
        </div>
    );
}