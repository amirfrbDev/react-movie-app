import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';

import { getLanguages } from '../services/allMovies';

import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

function FilterSidebar({
    showSearchButton,
    searchHandler,
    sortValue,
    sortHandler,
    filterHandler,
    filters,
    genresData
}) {

    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

    const { data: langsData } = useQuery({
        queryKey: ["languages"],
        queryFn: getLanguages
    })

    const sortArrayByProperty = (source, propertyName) => {
        return [...source].sort((a, b) => {
            const valA = a[propertyName] ? a[propertyName].toLowerCase() : '';
            const valB = b[propertyName] ? b[propertyName].toLowerCase() : '';

            if (valA < valB) return -1;  // a comes before b
            if (valA > valB) return 1;   // a comes after b
            return 0;                    // a and b are equal
        });
    }

    return (
        <div className={`w-full `}>
            {showSearchButton && <button className='btn w-full mb-3 shadow-lg shadow-black bg-blue-600 text-white transition-all hover:bg-blue-800' onClick={searchHandler}>Search</button>}
            <div>
                <div className={`flex items-center justify-between text-xl gap-1 bg-zinc-800 p-3 rounded-lg cursor-pointer ${isSortMenuOpen && "rounded-b-none"}`} onClick={() => setIsSortMenuOpen(state => !state)}>
                    <h2>Sort</h2>
                    <span>
                        {
                            isSortMenuOpen ? <IoIosArrowDown /> : <IoIosArrowForward />
                        }
                    </span>
                </div>
                {
                    isSortMenuOpen ? (
                        <div className="bg-zinc-800 rounded-b-lg w-full pb-3">
                            <hr className='border-zinc-700' />
                            <p className='text-sm font-thin  w-full pl-2 pt-3'>Sort Results By</p>
                            <select value={sortValue} onChange={sortHandler} className='w-[92%] mx-auto text-sm ml-2 mt-0 p-1 rounded-lg'>
                                <option value="popularity.desc">Popularity Descending</option>
                                <option value="popularity.asc">Popularity Ascending</option>
                                <option value="vote_count.desc">Ratings Count Descending</option>
                                <option value="vote_count.asc">Ratings Count Ascending</option>
                                <option value="primary_release_date.desc">Release Date Descending</option>
                                <option value="primary_release_date.asc">Release Date Ascending</option>
                                <option value="title.asc">Title (A-Z)</option>
                                <option value="title.desc">Title (Z-A)</option>
                            </select>
                        </div>
                    ) : null
                }
            </div>
            <div className='mt-2'>
                <div className={`flex items-center justify-between text-xl gap-1 bg-zinc-800 p-3 rounded-lg cursor-pointer ${isFilterMenuOpen && "rounded-b-none"}`} onClick={() => setIsFilterMenuOpen(state => !state)}>
                    <h2>Filter</h2>
                    <span>
                        {
                            isFilterMenuOpen ? <IoIosArrowDown /> : <IoIosArrowForward />
                        }
                    </span>
                </div>
                {
                    isFilterMenuOpen ? (
                        <div className='bg-zinc-800 rounded-b-lg w-full pb-3'>
                            <hr className='border-zinc-700' />
                            <div className='text-sm m-3'>
                                <h4 className='font-thin mb-1'>Show me</h4>
                                <form onChange={filterHandler} className=''>
                                    <input type="radio" name='show_me' id='everything' data-show-me="everything" className='mt-1' checked={filters.show_me === "everything"} />
                                    <label htmlFor="everything" className='ml-1'>Everything</label>
                                    <br />
                                    <input type="radio" name='show_me' id='unwatched' data-show-me="unwatched" className='mt-1' checked={filters.show_me === "unwatched"} />
                                    <label htmlFor="unwatched" className='ml-1'>Movies I Haven't Seen</label>
                                    <br />
                                    <input type="radio" name='show_me' id='watched' data-show-me="watched" className='mt-1' checked={filters.show_me === "watched"} />
                                    <label htmlFor="watched" className='ml-1'>Movies I Have Seen</label>
                                </form>
                            </div>
                            <hr className='border-zinc-700' />
                            <div className='text-sm m-3'>
                                <h4 className='font-thin mb-1'>Release Dates</h4>
                                <div className='flex justify-between items-center mt-2 mb-1'>
                                    <p className='text-white/50'>from</p>
                                    <input type="date" className='rounded-md p-[3px]' name='release_date.gte' value={filters["release_date.gte"]} onChange={filterHandler} />
                                </div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-white/50'>to</p>
                                    <input type="date" className='rounded-md p-[3px]' name='release_date.lte' value={filters["release_date.lte"]} onChange={filterHandler} />
                                </div>
                            </div>
                            <hr className='border-zinc-700' />
                            <div className='text-sm m-3'>
                                <h4 className='font-thin mb-1'>Genres</h4>
                                <div className='flex gap-2 flex-wrap mt-2'>
                                    {
                                        genresData?.data?.genres?.map(genre => (
                                            <button
                                                className={`rounded-full p-1 px-2 ${filters.with_genres.includes(String(genre.id)) ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"} transition-colors  `}
                                                key={genre.id}
                                                data-genre-id={genre.id}
                                                name='with_genres'
                                                onClick={filterHandler}
                                            >
                                                {genre.name}
                                            </button>


                                        )
                                        )
                                    }
                                </div>
                            </div>
                            <hr className='border-zinc-700' />
                            <div className='text-sm m-3'>
                                <h4 className='font-thin mb-1'>Language</h4>
                                <select className='w-[92%] mx-auto text-sm ml-2 mt-2 p-[1px] py-[6px] rounded-lg' value={filters.with_original_language} onChange={filterHandler} name='with_original_language'>
                                    <option value="-">
                                        -None Selected-
                                    </option>
                                    {sortArrayByProperty(langsData?.data, "english_name")?.map(lang =>
                                        <option value={lang.iso_639_1}>
                                            {lang.english_name}
                                        </option>
                                    )}
                                </select>
                            </div>
                        </div>
                    ) : null
                }
            </div>

        </div>
    )
}

export default FilterSidebar