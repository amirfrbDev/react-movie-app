import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MovieDetailsPage from '../pages/MovieDetailsPage'
import PersonDetailsPage from "../pages/PersonDetailsPage"
import PopularMoviesPage from '../pages/PopularMoviesPage'
import SearchPage from '../pages/SearchPage'

function Router() {
  return (
    <Routes>
        <Route index element={<HomePage />} />                                      
        <Route path='/movie' element={<PopularMoviesPage mediaType="movie" /> } />
        <Route path="/movie/:id" element={<MovieDetailsPage mediaType="movie" />} />
        <Route path='/tv' element={<PopularMoviesPage mediaType="tv" /> } />
        <Route path="/tv/:id" element={<MovieDetailsPage mediaType="tv" />} />      
        <Route path='/tv/airing-today' element={<PopularMoviesPage mediaType="tv" /> } />
        <Route path="/person/:id" element={<PersonDetailsPage />} />  
        <Route path='/search' element={<SearchPage />} />    
    </Routes>
  )
}

export default Router