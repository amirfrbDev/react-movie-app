import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getSimilarMoviesById } from '../services/movie'
import { Link } from 'react-router-dom'
import { FaFilm, FaStar, FaUser } from 'react-icons/fa6'

function MovieSimilarSection({ id, mediaType }) {

    const { data: similarData } = useQuery({
        queryKey: ["movie-similars", id, mediaType],
        queryFn: getSimilarMoviesById
    })

    return (
        <div>
            <h2 className='text-xl md:text-2xl font-bold mb-5 mt-8 md:mt-0'>Similar Movies</h2>
            <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
                {similarData?.data?.results?.slice(0, 4)?.map(movie => (
                    <Link to={`/${mediaType}/${movie.id}`} key={movie.id} className='bg-zinc-900 shadow-black shadow-md p-3 pb-5 rounded-md'>
                        
                        {movie.poster_path ? (
                            <img 
                                src={`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`} 
                                alt="" 
                                className='rounded-md shadow-black shadow-md w-full h-[280px] object-cover' 
                            />
                        ) : (
                            <div className='shadow-black shadow-md bg-gray-800 rounded-md flex items-center justify-center w-full h-[280px]'>
                                <FaFilm fontSize={80} />
                            </div>
                        )}

                        <div className='mt-3'>
                            <h4 className='font-semibold hover:text-white/80 truncate'>{movie?.original_name || movie.original_title}</h4>
                            <div className='flex justify-between  mt-2'>
                                <p className='flex items-center gap-1'><FaUser />{` ${movie.vote_count}`}</p>
                                <p className='flex items-center gap-1'><FaStar />{` ${movie.vote_average}`}</p>
                            </div>
                        </div>
                    </Link >
                ))}
            </ul>
        </div>
    )
}

export default MovieSimilarSection
