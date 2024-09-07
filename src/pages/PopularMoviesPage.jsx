import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getPopularMoviesByPage } from '../services/allMovies'
import { Link, useSearchParams } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

import styles from "./PopularMovies.module.css"
import { FaFilm } from 'react-icons/fa'

function PopularMoviesPage() {

    const [page, setPage] = useState(1)
    const [query, setQuery] = useState({})
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [sortValue, setSortValue] = useState("popularity.asc")

    const [searchParams, setSearchParams] = useSearchParams()

    const nextSixMonth = () => {
        return new Date(new Date().setMonth(new Date().getMonth() + 6)).toLocaleDateString("en-GB", { year: "numeric", month: "numeric", day: 'numeric' }).split("/").reverse().join("-");
    }

    const { isFetching, data: popMovieData } = useQuery({
        queryKey: ["movies-popular", page, sortValue, nextSixMonth()],
        queryFn: getPopularMoviesByPage
    })

    // console.log(popMovieData);

    const pageHandler = (event) => {
        console.log(event.currentTarget)
        setPage(+event.currentTarget.innerText);
        setQuery(prevQueries => ({ ...prevQueries, page }))
    }

    useEffect(() => {
        console.log(sortValue)
    }, [sortValue])



    return (
        <div className='relative w-full pt-[48px] text-white/100 text-3xl'>
            <div className='pt-8 w-[93%] mx-auto'>
                <h2>Popular Movies</h2>
                <div className=' mx-auto grid grid-cols-[25%,73%] gap-6 pt-6'>
                    <div className={`w-full shadow-lg shadow-black p-3 pl-5 rounded-lg`}>
                        <div>
                            <div className={`flex items-center text-xl gap-1 bg-zinc-800 p-3 rounded-xl cursor-pointer ${isSortMenuOpen && "rounded-b-none"}`}>
                                <h2 className=''>Sort</h2>
                                <span onClick={() => setIsSortMenuOpen(state => !state)}>
                                    {
                                        isSortMenuOpen ? <IoIosArrowDown /> : <IoIosArrowForward />
                                    }
                                </span>
                            </div>
                            {
                                isSortMenuOpen ? (
                                    <div className="bg-zinc-800">
                                        <p>Sort Results By</p>
                                        <select onChange={(e) => setSortValue(e.target.value)}>
                                            <option value="popularity.desc">Popularity Descending</option>
                                            <option value="popularity.asc">Popularity Ascending</option>
                                            <option value="vote_count.desc">Ratings Count Descending</option>
                                            <option value="vote_count.asc">Ratings Count Ascending</option>
                                            <option value="primary_release_date.desc">Release Date Descending</option>
                                            <option value="primary_release_date.asc">Release Date Ascending</option>
                                            <option value="title.asc">Title (A-Z)</option>
                                            <option value="title.desc ">Title (Z-A)</option>
                                        </select>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div></div>

                    </div>
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
                            isFetching ? null : (
                                <div className='flex justify-center mt-10 items-center text-sm gap-4 w-full'>
                                    <button className={styles.arrowButton} onClick={() => setPage(page => page - 1)} disabled={page === 1}>
                                        <IoIosArrowBack className='mx-auto' />
                                    </button>
                                    <button className={page === 1 ? styles.selected : styles.notSelected} onClick={pageHandler}>1</button>
                                    <button className={page === 2 ? styles.selected : styles.notSelected} onClick={pageHandler}>2</button>
                                    <span className={styles.notSelected} id='dots'>...</span>
                                    {
                                        page > 3 && page < 499 && (
                                            <>

                                                <button className={page === popMovieData?.data?.page ? styles.selected : styles.notSelected} onClick={pageHandler}>
                                                    {page}
                                                </button>
                                                <span className={styles.notSelected} id='dots'>...</span>
                                            </>
                                        )
                                    }
                                    <button className={page === 499 ? styles.selected : styles.notSelected} onClick={pageHandler}>499</button>
                                    <button className={page === 500 ? styles.selected : styles.notSelected} onClick={pageHandler}>500</button>
                                    <button className={styles.arrowButton} onClick={() => setPage(page => page + 1)} disabled={page === 500}>
                                        <IoIosArrowForward className=' mx-auto' />
                                        
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PopularMoviesPage