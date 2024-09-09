import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getMovieImagesById, getMovieVideosById } from '../services/movie';
import { useLocation } from 'react-router-dom';

function MovieMediaSection({ id, mediaType }) {
    const [tab, setTab] = useState("backdrops");
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation()

    const { data: imagesData } = useQuery({
        queryKey: ["movie-images", id, mediaType],
        queryFn: getMovieImagesById
    });

    const { data: videosData } = useQuery({
        queryKey: ["movie-videos", id, mediaType],
        queryFn: getMovieVideosById
    });

    const tabHandler = (event) => {
        setTab(event.currentTarget.dataset.tab);
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    };

    useEffect(() => {
        setTab("backdrops")
    }, [location])

    return (
        <div className=''>
            <div className='flex items-baseline justify-between w-full '>
                <div className='flex flex-col md:flex-row md:gap-10 items-baseline w-full min-w-full '>
                    <h2 className='text-xl md:text-2xl font-bold mb-3 md:mb-5  md:mt-0'>Media</h2>
                    <ul className='flex md:gap-4 text-sm justify-between sm:justify-start w-full p-1'>
                        <li className={`${tab === "backdrops" && "border-b-2 md:border-b-4"} p-1 md:p-2 cursor-pointer flex gap-1 md:gap-2 items-center`} onClick={tabHandler} data-tab="backdrops">
                            <p>Backdrops</p>
                            {imagesData?.data?.backdrops && (
                                <span className='bg-zinc-700 rounded-badge p-1 w-fit h-fit text-xs md:text-sm'>{imagesData?.data?.backdrops?.length}</span>
                            )}
                        </li>
                        <li className={`${tab === "posters" && "border-b-2 md:border-b-4"} p-1 md:p-2 cursor-pointer flex gap-1 md:gap-2 items-center`} onClick={tabHandler} data-tab="posters">
                            <p>Posters</p>
                            {imagesData?.data?.posters && (
                                <span className='bg-zinc-700 rounded-badge p-1 w-fit h-fit text-xs md:text-sm'>{imagesData?.data?.posters?.length}</span>
                            )}
                        </li>
                        <li className={`${tab === "videos" && "border-b-2 md:border-b-4"} p-1 md:p-2 cursor-pointer flex gap-1 md:gap-2 items-center`} onClick={tabHandler} data-tab="videos">
                            <p>Videos</p>
                            {videosData?.data?.results && (
                                <span className='bg-zinc-700 rounded-badge p-1 w-fit h-fit text-xs md:text-sm'>{videosData?.data?.results?.length}</span>
                            )}
                        </li>
                    </ul>
                </div>
                
            </div>

            <ul className="flex overflow-x-scroll mt-2 overflow-y-hidden h-[318px] rounded-lg">
                {isLoading ? "Loading..." : (
                    <>
                        {tab === "videos" && videosData?.data?.results?.slice(0, 3)?.map(video => (
                            <li key={video.id} className='border-r-8' style={{ width: "533px", minWidth: "533px", height: "300px" }}>
                                <iframe
                                    className='w-full h-full'
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title={video.name}
                                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                                    allowFullScreen
                                ></iframe>
                            </li>
                        ))}

                        {tab === "posters" && imagesData?.data?.posters?.slice(0, 10)?.map(image => (
                            <li key={image.file_path} style={{ width: "200px", minWidth: "200px", height: "300px" }}>
                                <img src={`https://media.themoviedb.org/t/p/w220_and_h330_face${image.file_path}`} alt="" className='w-full h-full object-cover' />
                            </li>
                        ))}

                        {tab === "backdrops" && imagesData?.data?.backdrops?.slice(0, 10)?.map(image => (
                            <li key={image.file_path} style={{ width: "533px", minWidth: "533px", height: "300px" }}>
                                <img src={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2${image.file_path}`} alt="" className='w-full h-full object-cover' />
                            </li>
                        ))}
                    </>
                )}
            </ul>
            <a href='#' className='text-xs sm:text-sm mt-2 w-fit mr-2 text-blue-400 transition-all hover:text-blue-500'>
                <p className='inline whitespace-nowrap'>
                    View all <span className='inline'>{tab}</span>
                </p>
            </a>
        </div>
    );
}

export default MovieMediaSection;
