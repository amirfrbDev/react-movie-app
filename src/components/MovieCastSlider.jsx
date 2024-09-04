import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function MovieCastSlider({ castData }) {

    
    return (
        <div className='w-full rounded-lg '>
            <h2 className='text-xl font-bold mb-4'>Top Billed Cast</h2>
            <ul className='flex overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400  gap-4 p-3 pl-2 shadow-inner shadow-black rounded-lg' id='chos'>
                {castData?.data?.cast?.slice(0, 10)?.map((actor) => (
                    <li key={actor.id} className='flex-shrink-0 w-[150px] h-[300px] rounded-lg shadow-xl shadow-black '>
                        <Link>
                            {
                                actor.profile_path ? (
                                    <img
                                        src={`https://media.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`}
                                        alt={actor.name}
                                        className='w-full h-[175px] object-cover rounded-t-lg transition-all hover:brightness-110'
                                    />
                                ) : (
                                    <div className='w-full h-[175px] flex items-center justify-center bg-black/50 rounded-lg rounded-b-none'><span className='w-fit h-fit'><FaUser fontSize={60} className="text-gray" /></span></div>
                                )
                            }
                        </Link>
                        <Link>
                            <p className='font-semibold text-center mt-2 transition-colors hover:text-white/70'>{actor.name}</p>
                        </Link>
                        <p className='text-xs text-center text-gray-600'>{actor.character}</p>
                    </li>
                ))
                }
                <li>
                    <p>View more <span></span></p>
                </li>
            </ul>
        </div>
    );
}

export default MovieCastSlider;
