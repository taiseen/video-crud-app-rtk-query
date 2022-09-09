import { useDeleteVideoMutation } from "../../redux/features/apiSlice/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Error } from '..';
import deleteImage from "../../assets/delete.svg";
import editImage from "../../assets/edit.svg";


export default function Description({ video = {} }) {

    const navigate = useNavigate();
    const { id, title, date, description } = video || {};

    const [deleteVideo, { isSuccess, isLoading, isError }] = useDeleteVideoMutation();

    
    const handleDelete = _ => deleteVideo(id);


    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess, navigate]);


    return (
        <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-800">
                {title}
            </h1>
            <div className="pb-4 flex items-center space-between border-b gap-4">
                <h2 className="text-sm leading-[1.7142857] text-slate-600 w-full">
                    Uploaded on {date}
                </h2>

                <div className="flex gap-6 w-full justify-end">

                    <div className="flex gap-1 group">
                        <div className="shrink-0">
                            <Link to={`/videos/edit/${id}`}>
                                <img
                                    className="w-5 block"
                                    src={editImage}
                                    alt="Edit"
                                />
                            </Link>
                        </div>

                        <Link to={`/videos/edit/${id}`}>
                            <span className="group-hover:text-orange-400 duration-200 text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
                                Edit
                            </span>
                        </Link>
                    </div>

                    <div className="flex gap-1 cursor-pointer group" onClick={handleDelete}>
                        <div className="shrink-0">
                            <img
                                className="w-5 block"
                                src={deleteImage}
                                alt="Delete"
                            />
                        </div>
                        <div className="group-hover:text-red-700 duration-200 text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
                            Delete
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-sm text-[#334155] dark:text-slate-400">
                {
                    description
                }
            </div>

            {
                !isLoading && isError &&
                <Error info='Video deleting error...' />
            }
        </div>
    );
}