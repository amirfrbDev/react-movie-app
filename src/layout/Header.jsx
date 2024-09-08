import React from 'react'
import { FaChevronDown, FaFilm } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <nav className="bg-white/5 backdrop-blur border-b border-b-white/5 shadow-md w-full flex justify-between fixed z-50 text-white px-4">
            <div className="container w-full max-w-full flex justify-between items-center">

                <div className='flex items-center gap-8'>
                    <Link to="/">
                        <div className="flex items-center space-x-2">
                            <FaFilm className="text-2xl text-red-500" />
                            <span className="font-bold text-xl">MovieApp</span>
                        </div>
                    </Link>


                    <ul className="flex space-x-6 items-center">
                        <li className="relative group h-full">
                            <a href="#" className="flex items-center space-x-1 h-12 text-sm hover:text-gray-300">
                                <span>Movies</span>
                                <FaChevronDown className="text-sm" />
                            </a>

                            <ul className="absolute left-0 w-48 p-2  space-y-2 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                                <li>
                                    <Link to="/movie" className="block px-4 py-2 transition-all hover:bg-gray-200">Popular</Link>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 transition-all hover:bg-gray-200">Up Coming</a>
                                </li>
                                <li>
                                    <Link to={`movie?sortBy=vote_count.desc`} className="block px-4 py-2 transition-all hover:bg-gray-200">Top Rated</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="relative group h-full">
                            <a href="#" className="flex items-center space-x-1 h-12 text-sm hover:text-gray-300">
                                <span>TV Shows</span>
                                <FaChevronDown className="text-sm" />
                            </a>

                            <ul className="absolute left-0 w-48 p-2  space-y-2 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                                <li>
                                    <Link to={`/tv`} className="block px-4 py-2 transition-all hover:bg-gray-200">Popular</Link>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 transition-all hover:bg-gray-200">On Air</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 transition-all hover:bg-gray-200">Popular</a>
                                </li>
                            </ul>
                        </li>


                        <li className="relative group">
                            <a href="#" className="flex items-center space-x-1 h-12 text-sm hover:text-gray-300">
                                <span>More</span>
                                <FaChevronDown className="text-sm" />
                            </a>

                            <ul className="absolute left-0 w-48 p-2  bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                                <li>
                                    <a href="#" className="block px-4 py-2 transition-all hover:bg-gray-200">Genres</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 transition-all hover:bg-gray-200">Actors</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 transition-all hover:bg-gray-200">Directors</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>


                <div>
                    <a href="#" className="hover:text-gray-300">Login</a>
                </div>
            </div>
        </nav>
    )
}

export default Header