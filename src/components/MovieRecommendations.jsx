import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getRecommendationMoviesById } from '../services/movie';
import { Link } from 'react-router-dom';

function MovieRecommendations({ id, mediaType }) {

    const { data: recommendData } = useQuery({
        queryKey: ["movie-recommendation", id, mediaType],
        queryFn: getRecommendationMoviesById
    });

    console.log(recommendData)

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>Recommended For You</h2>
            <ul className='flex gap-5 rounded-lg overflow-x-scroll p-2 shadow-inner shadow-black'>
                {recommendData?.data?.results?.map(movie => (
                    <Link to={`/${movie.media_type}/${movie.id}`} className='w-full h-full rounded-lg'>
                        <li className='relative group' style={{ width: "270px", minWidth: "290px", height: "180px" }}>
                            <div className='h-full w-full rounded-lg'>
                                <img src={`https://media.themoviedb.org/t/p/w250_and_h141_face${movie.poster_path}`} className='w-full h-full rounded-lg object-cover' />

                            </div>
                            <div className='absolute bottom-0 w-full p-1 pl-2 shadow-md shadow-black bg-zinc-800/70 rounded-b-lg transition-all group-hover:bg-zinc-800/90'>
                                <div>
                                    <Link className='font-semibold'>{movie.name || movie.original_name || movie.orignial_title}</Link>

                                </div>
                            </div>

                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default MovieRecommendations