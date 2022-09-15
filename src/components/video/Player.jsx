export default function Player({ video = {} }) {

    return (

        <iframe
            width="100%"
            className="aspect-video"
            src={video.link}
            title={video.title}
            frameBorder=""
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
}