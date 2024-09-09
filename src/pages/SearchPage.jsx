import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { RxCross2 } from 'react-icons/rx'
import { getSearchedItems } from '../services/search';
import { Link } from 'react-router-dom';
import { FaFilm, FaUser } from 'react-icons/fa';

function SearchPage() {

    const commonClasses = 'flex-shrink-0 w-[98px] h-[147px] rounded border-2 border-gray-100 overflow-hidden transition-all shadow-zinc-900 hover:shadow-2xl'; // Ensure fixed size and prevent shrinkage

    const [input, setInput] = useState("");

    const { data, refetch } = useQuery({
        queryKey: ["search"],
        queryFn: () => getSearchedItems(input),
        enabled: false
    })

    console.log(data)

    const searchHandler = (event) => {
        event.preventDefault()
        // console.log("search")
        refetch()
    }

    return (
        <div className='pt-[48px] px-7'>
            <h1 className='text-3xl mt-3'>Search</h1>
            <form className='w-full flex flex-col text-xl mt-2' onSubmit={searchHandler}>
                <div className='h-12 flex relative'>
                    <input
                        type="text"
                        placeholder='Search...'
                        className='flex items-center w-full h-full rounded-lg pl-5 text-white bg-white/15 transition-all focus:bg-white/35'
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />

                    {
                        input &&
                        <button type='button' className='flex justify-center items-center w-8 h-8 absolute right-[60px] top-[7px] text-white rounded-full transition-all hover:bg-black/30' onClick={() => setInput("")}>
                            <RxCross2 fontSize={25} />
                        </button>
                    }
                    <button type='submit' className='ml-1 btn btn-square bg-blue-700 text-white hover:bg-blue-800'>
                        <CiSearch fontSize={30} />
                    </button>

                </div>

            </form>
            {
                data?.data?.results?.length && data?.data?.results?.map(item => (

                    item.media_type === "person" ? (
                        <li className="flex gap-2 mt-3 hover:bg-gray-600 p-2 rounded-lg">
                            <Link to={`persons/${item.id}`} className={`${commonClasses} h-[98px] `}>
                                {item.profile_path ? (
                                    <img
                                        src={`https://media.themoviedb.org/t/p/w90_and_h90_face/${item.profile_path}`}
                                        alt={item.title || item.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-gray-900">
                                        <FaUser fontSize={60} className="text-white" />
                                    </div>
                                )}
                            </Link>

                            <div className="flex flex-col justify-between pb-4 pl-2">
                                <div>
                                    <Link to={`person/${item.id}`}>
                                        <h1 className="text-xl text-white/100 transition-all hover:text-white/70">
                                            {item.title || item.name}{' '}

                                            <span className="text-white/40">(person)</span>

                                        </h1>
                                    </Link>
                                    <p className="text-sm mt-1 text-white/50 ">{item.first_air_date}</p>
                                </div>
                            </div>
                        </li>
                    ) : (
                        <li className="flex gap-2 mt-3 hover:bg-gray-600 p-2 rounded-lg">
                            <Link to={`${item.media_type}/${item.id}`} className={commonClasses}>
                                {item.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2/${item.poster_path}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-gray-900">
                                        <FaFilm fontSize={40} className="text-white" />
                                    </div>
                                )}
                            </Link>

                            <div className="flex flex-col justify-between pb-4">
                                <div>
                                    <Link to={`${item.media_type}/${item.id}`}>
                                        <h1 className="text-xl text-white/100 transition-all hover:text-white/70">
                                            {item.title || item.name}{' '}
                                            {(item.original_name || item.original_title) && (
                                                <span className="text-white/40">({item.original_name || item.original_title})</span>
                                            )}
                                        </h1>
                                    </Link>
                                    <p className="text-sm mt-1 text-white/50 ">{item.first_air_date}</p>
                                </div>
                                <p className="text-sm text-white">
                                    {item?.overview?.split(' ').slice(0, 40).join(' ')}...
                                </p>
                            </div>
                        </li>
                    )

                ))
            }

        </div>
    )
}

export default SearchPage