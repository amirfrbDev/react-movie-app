import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MovieDetailsPage from '../pages/MovieDetailsPage'
import PersonDetailsPage from "../pages/PersonDetailsPage"
import PopularMoviesPage from '../pages/PopularMoviesPage'

function Router() {
  return (
    <Routes>
        <Route index element={<HomePage />} />                                      
        <Route path="/movie/:id" element={<MovieDetailsPage mediaType="movie" />} />
        <Route path='/movie' element={<PopularMoviesPage /> } />
        <Route path="/tv/:id" element={<MovieDetailsPage mediaType="tv" />} />      
        <Route path="/person/:id" element={<PersonDetailsPage />} />      
    </Routes>
  )
}

export default Router