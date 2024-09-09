import React from 'react'
import { FaArrowRight, FaStar } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { PiFilmReelFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';

function SerieLastSeason({ data }) {
    const lastSeason = data?.data?.seasons[data?.data?.seasons?.length - 1];
    return (
        <>
            <div className='w-full'>
                <h2 className='text-xl md:text-2xl font-bold mb-5 mt-8 md:mt-0'>{data?.data?.status === "Returning Series" ? "Current Season" : "Last Season"}</h2>
                <div className='flex flex-col md:flex-row shadow-2xl shadow-black rounded-lg gap-5 pr-8  text-justify'>
                    <Link className='flex flex-shrink-0' style={{ width: "130px", height: "195px" }}>
                        {
                            lastSeason?.poster_path ? (
                                <img
                                    src={`https://media.themoviedb.org/t/p/w130_and_h195_bestv2${lastSeason?.poster_path}`}
                                    alt={lastSeason?.name}
                                    className='rounded-l-lg h-full w-full transition-all hover:brightness-110'
                                />
                            ) : <div className='w-full h-full flex items-center justify-center rounded-l-lg bg-zinc-800'><PiFilmReelFill fontSize={90} /></div>
                        }
                    </Link>
                    <div className='mb-5 mt-2'>
                        <h2 className='text-2xl '>
                            <Link className='transition-all hover:text-white/70'>
                                {lastSeason?.name}
                            </Link>

                            {
                                data?.data?.status === "Ended" ? (
                                    <span className='text-sm bg-blue-900 p-1 rounded-md ml-3'>
                                        Last Season
                                    </span>
                                ) : null
                            }

                        </h2>
                        <div className='flex items-center mt-2 gap-3'>
                            <p>{lastSeason?.air_date?.split("-")[0]}</p>

                            <span><GoDotFill fontSize={10} /></span>
                            <p>{lastSeason?.episode_count} Episodes</p>
                            <span><GoDotFill fontSize={10} /></span>
                            <p className='flex items-center gap-1'><FaStar color='yellow' /> <span>{lastSeason?.vote_average}</span></p>
                        </div>
                        <p className='mt-4 text-justify'>{lastSeason?.overview}</p>
                    </div>
                </div>
                <Link className='w-fit flex items-center gap-2 mt-4 transition-all hover:text-white/70'><h4 className='text-lg'>View All Seasons</h4><span><FaArrowRight /></span></Link>
            </div>
        </>
    )
}

export default SerieLastSeason