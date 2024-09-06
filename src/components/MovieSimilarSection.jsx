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
            <h2 className='text-2xl font-bold mb-4'>Similar Movies</h2>
            <ul className='flex justify-evenly gap-5'>
                {similarData?.data?.results?.slice(0, 4)?.map(movie => (
                    <Link to={`/${mediaType}/${movie.id}`} key={movie.id} className='bg-zinc-900 shadow-black shadow-md w-fit p-3 px-4 pb-5 rounded-md' style={{width:"200px"}}>
                        
                            {
                                movie.poster_path ? (
                                    <img src={`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`} alt="" className='rounded-md shadow-black shadow-md' style={{ width: "170px", height: "280px" }} />
                                ) : <div className='shadow-black shadow-md bg-gray-800 rounded-md flex items-center justify-center' style={{ width: "170px", height: "280px" }}><FaFilm fontSize={80} /></div>
                            }
                        
                        <div className='mt-3'>
                            <h4 className='w-fit font-semibold hover:text-white/80'>{movie?.original_name || movie.original_title}</h4>
                            <div className='flex gap-5 mt-1'>
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