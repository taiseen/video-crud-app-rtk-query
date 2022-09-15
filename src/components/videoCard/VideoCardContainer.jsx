import { useGetVideosQuery } from "../../redux/features/apiSlice";
import { VideoLoader, Error } from '..';
import VideoCard from "./VideoCard";


export default function VideoCardContainer() {

    const { data: videos, isLoading, isError, error } = useGetVideosQuery(undefined, {
        // refetchOnFocus: true,
        // refetchOnMountOrArgChange: 2,
        // pollingInterval : 2000 // auto re-fetch after every 2 second... 
    });


    let content = null;
    if (isLoading) content = <> <VideoLoader /><VideoLoader /><VideoLoader /> <VideoLoader /></>;
    if (!isLoading && isError) content = <Error info={error} />;
    if (!isLoading && !isError && videos?.length === 0) content = <Error info='No Videos Found...' />;
    if (!isLoading && !isError && videos?.length > 0) content =
        videos.map(video => <VideoCard video={video} key={video.id} />);


    return (
        <>
            {
                content
            }
        </>
    );
}