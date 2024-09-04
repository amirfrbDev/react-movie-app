import React from 'react'
import { FaArrowRight, FaStar } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { Link } from 'react-router-dom';

function SerieLastSeason({ data }) {
    // console.log(data?.data?.seasons)
    const lastSeason = data?.data?.seasons[data?.data?.seasons?.length - 1];
    console.log(lastSeason)
    return (
        <div className='w-full'>
            <h2 className='text-2xl font-bold mb-4'>Last Season</h2>
            <div className='flex shadow-2xl shadow-black rounded-lg gap-5 pr-5'>
                <Link className='flex flex-shrink-0' style={{ width: "130px", height: "195px" }}>
                    <img
                        src={`https://media.themoviedb.org/t/p/w130_and_h195_bestv2${lastSeason?.poster_path}`}
                        alt={lastSeason?.name}
                        className='rounded-l-lg h-full w-full transition-all hover:brightness-110'
                    />
                </Link>
                <div className='mt-1 mb-1'>
                    <h2 className='text-2xl '>
                        <Link className='transition-all hover:text-white/70'>
                            {lastSeason?.name}
                        </Link>
                        <span className='text-sm bg-blue-900 p-1 rounded-md ml-3'>
                            Last Season
                        </span>
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
    )
}

export default SerieLastSeason