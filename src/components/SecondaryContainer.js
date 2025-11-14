import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  const movies = useSelector((store) => store.movies)
  // console.log("movies are:", movies);
  return (
    <div className='bg-black'>
      <div className='-mt-52 pl-12 relative z-20'>
        <MovieList title={'Now Playing'} movies={movies?.nowPlayingMovies} />
        <MovieList title={'Top Rated'} movies={movies?.topRatedMovies} />
        <MovieList title={'Popular'} movies={movies?.popularMovies} />
        <MovieList title={'Upcoming'} movies={movies?.upcomingMovies} />
        {/* <MovieList title={'Horror'} movies={movies?.nowPlayingMovies} /> */}
      </div>

      {/* 
      MovieList - Popular
        - MovieCard * n
      MovieList - Now playing
      MovieList - Trending
      MovieList - Horror
      
      */}
    </div>
  )
}

export default SecondaryContainer