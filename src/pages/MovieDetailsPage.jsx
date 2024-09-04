import React, { useEffect } from 'react';
import "./MovieDetailsPage.css";
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMovieCastById, getMovieDetailsById, getMovieKeywordsById, getMovieSocialsById } from '../services/movie';
import { GoDotFill } from 'react-icons/go';
import { FaUserGroup } from 'react-icons/fa6';
import { FaBookmark, FaFacebook, FaImdb, FaInstagram, FaLink, FaStar, FaTwitter } from 'react-icons/fa';
import { IoListOutline } from 'react-icons/io5';
import { IoMdHeart } from 'react-icons/io';
import MovieCastSlider from '../components/MovieCastSlider';
import SerieLastSeason from '../components/SerieLastSeason';

function MovieDetailsPage({ mediaType }) {
  const { id } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["movie-details", id, mediaType],
    queryFn: () => getMovieDetailsById(id, mediaType),
  });

  const { data: castData } = useQuery({
    queryKey: ["movie-cast", id, mediaType],
    queryFn: getMovieCastById
  });

  const { data: socialData } = useQuery({
    queryKey: ["movie-socials", id, mediaType],
    queryFn: getMovieSocialsById
  })

  const { data: keywordsData } = useQuery({
    queryKey: ["movie-keywords", id, mediaType],
    queryFn: getMovieKeywordsById
  })



  if (isError) console.log(error);

  const backdropUrl = `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${data?.data?.backdrop_path}`;

  // console.log(keywordsData?.data?.keywords)
  console.log(keywordsData?.data?.results)

  return (
    <>
      <div className='relative w-full pt-[48px] text-white/100 text-3xl' id='heading'>
        <div
          className='absolute inset-0 z-0 h-screen w-full'
          style={{
            filter: 'brightness(70%) blur(3px)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: `linear-gradient(to top, rgb(0, 0, 0),rgb(80, 80, 80), rgba(158, 158, 158, 0.726)), url(${backdropUrl})`,
            backgroundBlendMode: 'overlay',
            backdropFilter: 'blur(10px)',
          }}
        />

        {mediaType === "movie" ? (
          <div className='relative z-10 h-[85vh] w-[92%] gap-3 mx-auto mt-16 flex'>
            {isPending && <h2>Loading...</h2>}
            {data?.data && (
              <>
                <img
                  src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.data?.poster_path}`}
                  alt={data?.data.title}
                  className='rounded-lg w-[300px] h-[450px]'
                />
                <div className='ml-6'>
                  <div>
                    <h1 className='text-4xl font-semibold'>{data?.data?.title} ({data?.data?.release_date?.split("-")[0]})</h1>
                    <div className='flex items-center text-lg mt-1 gap-3'>
                      <p>{data?.data?.release_date.split("-").join("/")} ({data?.data?.origin_country.map((country, index) => <span>{index !== 0 ? ` & ${country}` : country}</span>)})</p>
                      <span className='text-sm'><GoDotFill /></span>
                      <p>{data?.data?.genres.map((genre, index) => <span>{index !== data?.data?.genres?.length - 1 ? `${genre.name}, ` : genre.name}</span>)}</p>
                      <span className='text-sm'><GoDotFill /></span>
                      <p>{data?.data?.runtime > 59 && `${Math.floor(data?.data?.runtime / 60)}h`} {data?.data?.runtime % 60}m</p>
                    </div>
                    <div className='flex items-center text-lg mt-2 gap-4'>
                      <p className='flex items-center gap-2 group relative'>
                        <FaUserGroup />
                        {data?.data?.vote_count?.toLocaleString()}
                        <div class="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded py-2 px-4 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          {data?.data?.vote_count?.toLocaleString()} votes
                        </div>
                      </p>
                      <p className='flex items-center gap-2 group relative'>
                        <FaStar />
                        {data?.data?.vote_average}
                        <div class="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded py-2 px-4 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          {data?.data?.average} is the average rating of this movie.
                        </div>
                      </p>
                      <p className=''><a target='_blank' href={`https://imdb.com/title/${data?.data?.imdb_id}`} className='flex items-center gap-1 text-sm'><span className='text-yellow-300 transition-all hover:text-yellow-300/80'><FaImdb fontSize={30} /></span> <span className='transition-all hover:text-white/80'>IMDB</span></a></p>
                    </div>
                    <div className='flex my-4 gap-3'>
                      <button className='flex items-center justify-center group relative bg-[#ff2450] rounded-full p-2 w-12 h-12 text-2xl transition-all hover:bg-red-700'>
                        <IoListOutline />
                        <div class="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded w-24 py-2 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          Add To List
                        </div>
                      </button>
                      <button className='flex items-center justify-center group relative bg-[#ff2450] rounded-full p-2 w-12 h-12 text-2xl transition-all hover:bg-red-600'>
                        <IoMdHeart />
                        <div class="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded w-32 py-2 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          Mark As Favourite
                        </div>
                      </button>
                      <button className='flex items-center justify-center group relative bg-[#ff2450] rounded-full p-2 w-12 h-12 text-2xl transition-all hover:bg-red-600'>
                        <FaBookmark />
                        <div class="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded w-40 py-2 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          Add To Your Watchlist
                        </div>
                      </button>
                    </div>
                    <p className='italic text-lg mt-6'>{data?.data?.tagline}</p>
                    <div>
                      <h4 className='text-2xl mt-3'>Overview</h4>
                      <p className='text-lg mt-1 '>{data?.data?.overview}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className='relative z-10 h-[85vh] w-[92%] gap-3 mx-auto mt-16 flex'>
            {isPending && <h2>Loading...</h2>}
            {data?.data && (
              <>
                <img
                  src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.data?.poster_path}`}
                  alt={data.data?.original_name}
                  className='rounded-lg w-[250px] h-[400px]'
                />
                <div className='ml-6'>
                  <div>
                    <h1 className='text-4xl font-semibold'>
                      {data?.data?.original_name} ({data?.data?.first_air_date?.split("-")[0]})
                    </h1>
                    <div className='flex items-center text-lg mt-1 gap-3'>
                      <p>
                        {data?.data?.genres.map((genre, index) => (
                          <span key={index}>{index !== data?.data?.genres?.length - 1 ? `${genre.name}, ` : genre.name}</span>
                        ))}
                      </p>
                      <span><GoDotFill fontSize={20} /></span>
                      <p>{data?.data?.number_of_seasons?.toLocaleString()} seasons, {data?.data?.number_of_episodes?.toLocaleString()} episodes</p>
                    </div>
                    <div className='flex items-center text-lg mt-2 gap-4'>
                      <p className='flex items-center gap-2 group relative'>
                        <FaUserGroup />
                        {data?.data?.vote_count?.toLocaleString()}
                        <div className="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded py-2 px-4 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          {data?.data?.vote_count?.toLocaleString()} users have voted.
                        </div>
                      </p>
                      <p className='flex items-center gap-2 group relative'>
                        <FaStar />
                        {data?.data?.vote_average}
                        <div className="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded py-2 px-4 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          {data?.data?.vote_average} is the average rating of this show.
                        </div>
                      </p>
                    </div>
                    <div className='flex mt-4 gap-3'>
                      <button className='flex items-center justify-center group relative bg-[#ff2450] rounded-full p-2 w-12 h-12 text-2xl transition-all hover:bg-red-700'>
                        <IoListOutline />
                        <div className="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded w-24 py-2 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          Add to List
                        </div>
                      </button>
                      <button className='flex items-center justify-center group relative bg-[#ff2450] rounded-full p-2 w-12 h-12 text-2xl transition-all hover:bg-red-600'>
                        <IoMdHeart />
                        <div className="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded w-32 py-2 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          Mark as Favorite
                        </div>
                      </button>
                      <button className='flex items-center justify-center group relative bg-[#ff2450] rounded-full p-2 w-12 h-12 text-2xl transition-all hover:bg-red-600'>
                        <FaBookmark />
                        <div className="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded w-32 py-2 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          Add to Watchlist
                        </div>
                      </button>
                    </div>
                    <p className='italic text-lg mt-6'>{data?.data?.tagline}</p>
                    <div>
                      <h4 className='text-2xl mt-3'>Overview</h4>
                      <p className='text-lg mt-1'>{data?.data?.overview}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )
        }
      </div >
      <div className='w-[96%] mx-auto grid grid-cols-[79%_19%] justify-between gap-4'>
        <div>
          <MovieCastSlider castData={castData} />
          <hr className='my-14 mx-5 border-zinc-700' />
          {mediaType === "tv" && <SerieLastSeason data={data} />}
        </div>
        <div className='mt-[44px] p-4 rounded-lg shadow-2xl shadow-black bg-zinc-900'>
          <ul className="flex justify-between text-3xl gap-2 list-none">
            {socialData?.data?.facebook_id && (
              <li className="relative group transition-all hover:text-white/75">
                <a href={`https://facebook.com/${socialData?.data?.facebook_id}`} target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
                <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Visit Facebook
                </div>
              </li>
            )}
            {socialData?.data?.twitter_id && (
              <li className="relative group transition-all hover:text-white/75">
                <a href={`https://twitter.com/${socialData?.data?.twitter_id}`} target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Visit Twitter
                </div>
              </li>
            )}
            {socialData?.data?.instagram_id && (
              <li className="relative group transition-all hover:text-white/75">
                <a href={`https://instagram.com/${socialData?.data?.instagram_id}`} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Visit Instagram
                </div>
              </li>
            )}
            {data?.data?.homepage && (
              <li className="relative group transition-all hover:text-white/75">
                <a href={data?.data?.homepage} target="_blank" rel="noopener noreferrer">
                  <FaLink />
                </a>
                <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Visit Website
                </div>
              </li>
            )}
          </ul>
          <div className='mt-8'>
            <p className='font-bold text-lg'>Status:</p>
            <p className='text-sm mt-[3px]'>{data?.data?.status}</p>
          </div>
          <div className='mt-5'>
            <p className='font-bold text-lg'>Original Language:</p>
            <p className='text-sm mt-[3px]'>{data?.data?.original_language?.toUpperCase()}</p>
          </div>
          {
            mediaType === "movie" ? (
              <>
                {data?.data?.budget ? (
                  <div className='mt-5'>
                    <p className='font-bold text-lg'>Budget:</p>
                    <p className='text-sm mt-[3px]'>${data?.data?.budget?.toLocaleString()}</p>
                  </div>
                ) : null}
                {data?.data?.revenue ? (
                  <div className='mt-5'>
                    <p className='font-bold text-lg'>Revenue:</p>
                    <p className='text-sm mt-[3px]'>${data?.data?.revenue.toLocaleString()}</p>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <div className='mt-5'>
                  <p className='font-bold text-lg'>Network:</p>
                  <ul className='text-sm mt-[3px]'>{data?.data?.networks?.map(network => <li className='bg-zinc-400 w-fit p-1 rounded'><Link><img src={`https://media.themoviedb.org/t/p/h30${network.logo_path}`} alt="" /></Link></li>)}</ul>
                </div>
                <div className='mt-5'>
                  <p className='font-bold text-lg'>Type:</p>
                  <p className='text-sm mt-[3px]'>{data?.data?.type}</p>
                </div>
              </>
            )
          }
          {keywordsData?.data?.keywords?.length ? (
            <div className='mt-6'>
              <p className='font-bold text-lg'>Keywords:</p>
              <ul className='flex flex-wrap gap-1 mt-2'>
                {
                  keywordsData?.data?.keywords ?
                    keywordsData?.data?.keywords?.map(keyword =>
                      <li key={keyword.id} className='text-sm  text-center p-[3px] rounded-[4px] bg-zinc-700 shadow-black shadow-2xl'>
                        <a href='#'>{keyword.name}</a>
                      </li>
                    ) : keywordsData?.data?.results?.map(keyword =>
                      <li key={keyword.id} className='text-sm  text-center p-[3px] rounded-[4px] bg-zinc-700 shadow-black shadow-2xl'>
                        <a href='#'>{keyword.name}</a>
                      </li>)
                }
              </ul>
            </div>
          ) : null}
        </div>
      </div>

    </>
  )
}

export default MovieDetailsPage;
