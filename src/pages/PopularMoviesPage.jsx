import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getLanguages, getPopularMoviesByPage } from '../services/allMovies'
import { Link, useSearchParams } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'


import { FaFilm } from 'react-icons/fa'
import { createQueryObject } from '../helpers/helper'
import Pagination from '../components/Pagination'
import { getMoviesGenres } from '../services/genres'
import FilterSidebar from '../components/FilterSidebar'

function PopularMoviesPage({mediaType}) {
    console.log(mediaType)

    const nextSixMonth = useCallback(() => new Date(new Date().setMonth(new Date().getMonth() + 6)).toLocaleDateString("en-GB", { year: "numeric", month: "numeric", day: 'numeric' }).split("/").reverse().join("-"), [],)

    const [searchParams, setSearchParams] = useSearchParams()

    const [page, setPage] = useState(Number(searchParams.get("page")) || 1)



    const [sortValue, setSortValue] = useState(searchParams.get("sortBy") || "popularity.desc");
    const [filters, setFilters] = useState({
        show_me: "everything",
        "release_date.gte": "",
        "release_date.lte": nextSixMonth(),
        "with_genres": [],
        "should_have_all_genres": false,
        "with_original_language": null
    })

    const [showSearchButton, setShowSearchButton] = useState(false)

    const { isPending, data: popMovieData, refetch } = useQuery({
        queryKey: ["movies-popular", page, sortValue, filters],
        queryFn: getPopularMoviesByPage,
        enabled: !showSearchButton
    });

    const { data: genresData } = useQuery({
        queryKey: ["movies-genres"],
        queryFn: getMoviesGenres
    })

    


    const pageHandler = (page) => {
        setPage(page);
        setSearchParams(createQueryObject(searchParams, { page })); 
        refetch(); // Refetch data when page changes
    }
    

    const sortHandler = useCallback((event) => {
        setSortValue(event.target.value)
        setPage(1)
        setSearchParams(createQueryObject(searchParams, { sortBy: event.target.value }))
        setShowSearchButton(true)
    }, [])

    const filterHandler = useCallback((event) => {
        setPage(1)
        setShowSearchButton(true)


        const name = event.target.name;
        const value = event.target.value;

        const genreId = event.target.dataset.genreId;


        if (name === "show_me") {
            setFilters(filters => ({ ...filters, show_me: event.target.dataset.showMe }))
        } else if (name.includes("release_date")) {
            console.log(name, event.target.value)
            setFilters(filters => ({ ...filters, [name]: event.target.value }))
        } else if (name === "with_genres") {
            setFilters(prevFilters => {
                let updatedGenres = prevFilters.with_genres.includes(genreId) ?
                    prevFilters.with_genres.filter(genre => genre !== genreId) :
                    [...prevFilters.with_genres, genreId];
                console.log(updatedGenres)
                return { ...prevFilters, with_genres: updatedGenres }

            })
            console.log(event.target.dataset.genreId)
        } else if (name === "with_original_language") {
            if (value === "-") return
            setFilters(prevFilters => ({ ...prevFilters, [name]: value }))
            console.log(value)
        }
    }, [])

    const searchHandler = () => {
        refetch()
        setShowSearchButton(false)
    }



    useEffect(() => {
        const pageParam = Number(searchParams.get("page")) || 1;
        if (page !== pageParam) {
            setPage(pageParam);
        }
        const sortByParam = searchParams.get("sortBy") || "popularity.desc";
        if (sortValue !== sortByParam) {
            setSortValue(sortByParam);
        }
    }, [searchParams, page, sortValue]);




    return (
        <div className='relative w-full pt-[48px] text-white/100 text-3xl'>
            <div className='pt-8 w-[93%] mx-auto'>
                <h2>Popular Movies</h2>
                <div className=' mx-auto grid grid-cols-[30%,67%] gap-6 pt-6'>
                    <FilterSidebar 
                        showSearchButton={showSearchButton}
                        searchHandler={searchHandler}
                        sortValue={sortValue}
                        sortHandler={sortHandler}
                        filterHandler={filterHandler}
                        filters={filters}
                        genresData={genresData}
                    />
                    <div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {
                                popMovieData?.data?.results?.map(movie => (
                                    <div key={movie.id} className='shadow-lg shadow-black rounded-lg'>
                                        <Link to={`/movie/${movie.id}`}>
                                            <div className="w-full h-80 relative">
                                                {movie.poster_path ? (
                                                    <img
                                                        src={`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                                                        alt={movie.title}
                                                        className="w-full h-full object-cover rounded-t-lg hover:brightness-110"
                                                        loading='lazy'
                                                    />
                                                ) : (
                                                    <div className='w-full h-full flex items-center justify-center bg-gray-200 rounded-t-lg'>
                                                        <FaFilm className='text-4xl' />
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                        <div className="mt-2 text-center m-4">
                                            <Link to={`/movie/${movie.id}`}>
                                                <p className="font-semibold text-lg transition-colors hover:text-white/70">{movie.title}</p>
                                            </Link>
                                            {movie.release_date &&
                                                <p className='text-sm text-white/70 mt-1'>
                                                    {new Date(movie.release_date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}
                                                </p>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>


                        {
                             (
                                <Pagination
                                    currentPage={page}
                                    totalPages={popMovieData?.data?.total_pages > 500 ? 500 : popMovieData?.data?.total_pages}
                                    onPageChange={pageHandler}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PopularMoviesPage