import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MovieDetailsPage from '../pages/MovieDetailsPage'

function Router() {
  return (
    <Routes>
        <Route index element={<HomePage />} />                                      
        <Route path="/movie/:id" element={<MovieDetailsPage mediaType="movie" />} />
        <Route path="/tv/:id" element={<MovieDetailsPage mediaType="tv" />} />      
    </Routes>
  )
}

export default Router