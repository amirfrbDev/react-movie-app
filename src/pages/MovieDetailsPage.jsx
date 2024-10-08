import React, { useEffect, useState } from 'react';
import "./MovieDetailsPage.css";
import { Link, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMovieCastById, getMovieDetailsById, getMovieImagesById, getMovieKeywordsById, getMovieReviewsById, getMovieSocialsById } from '../services/movie';
import { GoDotFill } from 'react-icons/go';
import { FaUserGroup } from 'react-icons/fa6';
import { FaBookmark, FaFacebook, FaFilm, FaImdb, FaInstagram, FaLink, FaStar, FaTwitter } from 'react-icons/fa';
import { IoListOutline } from 'react-icons/io5';
import { IoMdHeart } from 'react-icons/io';
import MovieCastSlider from '../components/MovieCastSlider';
import SerieLastSeason from '../components/SerieLastSeason';
import MovieReviewsSection from '../components/MovieReviewsSection';
import MovieMediaSection from '../components/MovieMediaSection';
import MovieSimilarSection from '../components/MovieSimilarSection';
import MovieRecommendations from '../components/MovieRecommendations';

function MovieDetailsPage({ mediaType }) {

  // const [reviews, setReviews] = useState(null)

  const { id } = useParams();

  const location = useLocation()

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["movie-details", id, mediaType],
    queryFn: getMovieDetailsById
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

  useEffect(() => {
    window.scroll(0, 0)
  }, [location])


  if (isError) console.log(error);

  const backdropUrl = `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${data?.data?.backdrop_path}`;


  return (
    <>
      <div className='relative w-full pt-[48px] text-white/100 text-3xl' id='heading'>
        <div
          className='absolute inset-0 z-0 h-[160vh]  sm:h-[140vh] md:h-[85vh] lg:h-screen w-full'
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
          <div className='relative z-10 h-[160vh] sm:h-[140vh] md:h-[85vh] lg:h-screen w-[92%] gap-3 mx-auto flex flex-col items-center pt-5 md:pt-10 md:flex-row md:items-start'>
            {isPending && <h2>Loading...</h2>}
            {data?.data && (
              <>
                {
                  data?.data?.poster_path ? (
                    <img
                      src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.data?.poster_path}`}
                      alt={data?.data.title}
                      className='rounded-lg w-[250px] h-[400px] md:w-[250px] md:h-[350px] lg:w-[300px] lg:h-[450px] object-cover'
                    />
                  ) : (
                    <div className='bg-gray-700 rounded-lg flex items-center justify-center w-[250px] h-[400px] md:w-[250px] md:h-[350px] lg:w-[300px] lg:h-[450px]'>
                      <span><FaFilm fontSize={120} /></span>
                    </div>
                  )
                }
                <div className='ml-6'>
                  <div >
                    <h1 className='text-2xl lg:text-4xl font-semibold '>
                      {data?.data?.original_title} {data?.data?.first_air_date && `(${data?.data?.first_air_date?.split("-")[0]})`}
                    </h1>
                    <div className='flex items-center md:items-start md:flex-col mt-1 gap-2'>
                      <p>
                        {data?.data?.release_date.split("-").join("/")}
                        ({
                          data?.data?.origin_country.map((country, index) =>
                            <span key={index}>{index !== 0 ? ` & ${country}` : country}</span>
                          )
                        })
                      </p>
                      {
                        data?.data?.genres?.length ? (
                          <>
                            <span className='text-sm'>
                              <GoDotFill />
                            </span>
                            <p>
                              {data?.data?.genres.map((genre, index) =>
                                <span key={genre.id}>
                                  {index !== data?.data?.genres?.length - 1 ? `${genre.name}, ` : genre.name}
                                </span>
                              )}
                            </p>
                          </>
                        ) : null
                      }
                      {
                        data?.data?.runtime ? (
                          <>
                            <span className='text-sm'>
                              <GoDotFill />
                            </span>
                            <p>
                              {data?.data?.runtime > 59 && `${Math.floor(data?.data?.runtime / 60)}h`} {data?.data?.runtime % 60}m
                            </p>
                          </>
                        ) : null
                      }
                    </div>
                    <span className='md:hidden text-xs self-end pb-[6px]'>
                      <GoDotFill />
                    </span>
                    <div className='flex items-center text-sm lg:text-[16px] mt-2 gap-4'>
                      <p className='flex items-center gap-2 group relative'>
                        <FaUserGroup />
                        {data?.data?.vote_count?.toLocaleString()}
                        <div className="absolute hidden md:group-hover:block bg-gray-700 text-white text-sm rounded py-2 px-4 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          {data?.data?.vote_count?.toLocaleString()} votes
                        </div>
                      </p>
                      <p className='flex items-center gap-2 group relative'>
                        <FaStar />
                        {data?.data?.vote_average}
                        <div className="absolute hidden md:group-hover:block bg-gray-700 text-white text-sm rounded py-2 px-4 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          {data?.data?.average} is the average rating of this movie.
                        </div>
                      </p>

                      {data?.data?.imdb_id ? (
                        <p className=''>
                          <a target='_blank' href={`https://imdb.com/title/${data?.data?.imdb_id}`} className='flex items-center gap-1 text-sm'>
                            <span className='text-yellow-300 transition-all hover:text-yellow-300/80'>
                              <FaImdb fontSize={30} />
                            </span>
                            <span className='transition-all hover:text-white/80'>IMDB</span>
                          </a>
                        </p>
                      ) : null
                      }
                    </div>
                    <div className='flex mt-4 lg:mt-5 gap-3'>
                      <button className='flex items-center justify-center group relative bg-[#ff2450] rounded-full p-1  w-9 h-9 lg:w-12 lg:h-12  text-xl lg:text-2xl transition-all hover:bg-red-700'>
                        <IoListOutline />
                        <div className="absolute hidden md:group-hover:block bg-gray-700 text-white text-sm rounded w-24 py-2 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          Add To List
                        </div>
                      </button>
                      <button className='flex items-center justify-center group relative bg-[#ff2450] rounded-full p-1  w-9 h-9 lg:w-12 lg:h-12  text-xl lg:text-2xl transition-all hover:bg-red-600'>
                        <IoMdHeart />
                        <div className="absolute hidden md:group-hover:block bg-gray-700 text-white text-sm rounded w-32 py-2 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          Mark As Favourite
                        </div>
                      </button>
                      <button className='flex items-center justify-center group relative bg-[#ff2450] rounded-full p-1  w-9 h-9 lg:w-12 lg:h-12  text-xl lg:text-2xl transition-all hover:bg-red-600'>
                        <FaBookmark />
                        <div className="absolute hidden md:group-hover:block bg-gray-700 text-white text-sm rounded w-40 py-2 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          Add To Your Watchlist
                        </div>
                      </button>
                    </div>
                    <p className='italic text-[16px] lg:text-lg lg:mt-6 mt-3 font-thin'>{data?.data?.tagline}</p>
                    <div className='-mt-3 lg:mt-1'>
                      <h4 className='text-xl lg:text-2xl  mt-5 md:mt-3'>Overview</h4>
                      <p className='text-[16px] leading-6 text-justify lg:text-lg lg:leading-6 mt-1 '>{data?.data?.overview}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className='relative z-10 h-[160vh] sm:h-[140vh] md:h-[85vh] lg:h-screen w-[92%] gap-3 mx-auto flex flex-col items-center pt-5 md:pt-10 md:flex-row md:items-start'>
            {isPending && <h2>Loading...</h2>}
            {data?.data && (
              <>
                {
                  data?.data?.poster_path ? (
                    <img
                      src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.data?.poster_path}`}
                      alt={data.data?.original_name}
                      className='rounded-lg w-[250px] h-[400px] md:w-[250px] md:h-[350px] lg:w-[300px] lg:h-[450px] object-cover'
                    />
                  ) : (
                    <div className='bg-gray-700 rounded-lg flex items-center justify-center w-[250px] h-[400px] md:w-[250px] md:h-[350px] lg:w-[300px] lg:h-[450px]'>
                      <span><FaFilm fontSize={120} /></span>
                    </div>
                  )
                }
                <div className='ml-6'>
                  <div className='flex flex-col items-center md:items-start'>
                    <h1 className='text-2xl lg:text-4xl font-semibold '>
                      {data?.data?.original_name} {data?.data?.first_air_date && `(${data?.data?.first_air_date?.split("-")[0]})`}
                    </h1>
                    <div className='flex items-center md:items-start md:flex-col mt-1 gap-2'>
                      <div className='flex items-center text-sm lg:text-[16px]  mt-1 gap-1 lg:gap-3'>
                        {
                          data?.data?.genres?.length && (
                            <>
                              <p>
                                {data?.data?.genres.map((genre, index) =>
                                  <span key={genre.id}>
                                    {index !== data?.data?.genres?.length - 1 ? `${genre.name}, ` : genre.name}
                                  </span>
                                )}
                              </p>
                            </>
                          )
                        }

                        {
                          data?.data?.number_of_seasons && data?.data?.number_of_episodes ? (
                            <>
                              <span className='text-xs'><GoDotFill /></span>
                              <p>
                                {data?.data?.number_of_seasons?.toLocaleString()} seasons, {data?.data?.number_of_episodes?.toLocaleString()} episodes
                              </p>
                            </>
                          ) : null
                        }
                      </div>
                      <span className='md:hidden text-xs self-end pb-[6px]'>
                        <GoDotFill />
                      </span>
                      <div className='flex items-center text-sm lg:text-[16px] mt-2 gap-4'>
                        <p className='flex items-center gap-2 group relative'>
                          <FaUserGroup />
                          {data?.data?.vote_count?.toLocaleString()}
                          <div className="absolute hidden md:group-hover:block bg-gray-700 text-white text-sm rounded py-2 px-4 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                            {data?.data?.vote_count?.toLocaleString()} users have voted.
                          </div>
                        </p>
                        <p className='flex items-center gap-2 group relative'>
                          <FaStar />
                          {data?.data?.vote_average}
                          <div className="absolute hidden md:group-hover:block bg-gray-700 text-white text-sm rounded py-2 px-4 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                            {data?.data?.vote_average} is the average rating of this show.
                          </div>
                        </p>
                      </div>
                    </div>
                    <div className='flex mt-4 lg:mt-5 gap-3'>
                      <button className='flex items-center justify-center group relative bg-[#ff2450] rounded-full p-1  w-9 h-9 lg:w-12 lg:h-12  text-xl lg:text-2xl transition-all hover:bg-red-600'>
                        <IoListOutline />
                        <div className="absolute hidden md:group-hover:block bg-gray-700 text-white text-sm rounded w-24 py-2 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          Add to List
                        </div>
                      </button>
                      <button className='flex items-center justify-center group relative bg-[#ff2450] rounded-full p-1  w-9 h-9 lg:w-12 lg:h-12  text-xl lg:text-2xl transition-all hover:bg-red-600'>
                        <IoMdHeart />
                        <div className="absolute hidden md:group-hover:block bg-gray-700 text-white text-sm rounded w-32 py-2 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          Mark as Favorite
                        </div>
                      </button>
                      <button className='flex items-center justify-center group relative bg-[#ff2450] rounded-full p-1  w-9 h-9 lg:w-12 lg:h-12  text-xl lg:text-2xl transition-all hover:bg-red-600'>
                        <FaBookmark />
                        <div className="absolute hidden md:group-hover:block bg-gray-700 text-white text-sm rounded w-32 py-2 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                          Add to Watchlist
                        </div>
                      </button>
                    </div>
                    <p className='italic text-[16px] lg:text-lg lg:mt-6 mt-3 font-thin'>{data?.data?.tagline}</p>
                    <div className='-mt-3 lg:mt-1'>
                      <h4 className='text-xl lg:text-2xl  mt-5 md:mt-3'>Overview</h4>
                      <p className='text-[16px] leading-6 text-justify lg:text-lg lg:leading-6 mt-1'>{data?.data?.overview}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )
        }
      </div>
      <div className='w-[96%] mx-auto grid grid-cols-1 md:grid-cols-[68%_30%] lg:grid-cols-[75%_24%] xl:grid-cols-[79%_19%] md:flex-col  justify-between -mt-5 gap-4'>
        <div className='order-2 md:order-none'>
          <MovieCastSlider castData={castData} />
          <hr className='mt-10 mb-14 mx-2 border-zinc-700' />
          {
            mediaType === "tv" && (
              <>
                <SerieLastSeason data={data} />
                <hr className='mt-10 mb-14 mx-2 border-zinc-700' />
              </>
            )
          }
          <MovieReviewsSection id={id} mediaType={mediaType} />
          <hr className='mt-10 mb-14 mx-2 border-zinc-700' />
          <MovieMediaSection id={id} mediaType={mediaType} />
          <hr className='mt-10 mb-14 mx-2 border-zinc-700' />
          <MovieSimilarSection id={id} mediaType={mediaType} />
          <hr className='mt-10 mb-14 mx-2 border-zinc-700' />
          <MovieRecommendations id={id} mediaType={mediaType} />
        </div>
        <div className='md-5 md:mt-[44px] p-4 order-1 md:order-none rounded-lg shadow-2xl shadow-black bg-zinc-900 h-fit pb-20'>
          <ul className="flex  md:justify-between text-3xl gap-5 md:gap-2 list-none">
            {socialData?.data?.facebook_id && (
              <li className="relative group transition-all hover:text-white/65 hover:scale-125">
                <a href={`https://facebook.com/${socialData?.data?.facebook_id}`} target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
                <div className="absolute hidden md:group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Visit Facebook
                </div>
              </li>
            )}
            {socialData?.data?.twitter_id && (
              <li className="relative group transition-all hover:text-white/65 hover:scale-125">
                <a href={`https://twitter.com/${socialData?.data?.twitter_id}`} target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <div className="absolute hidden md:group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Visit Twitter
                </div>
              </li>
            )}
            {socialData?.data?.instagram_id && (
              <li className="relative group transition-all hover:text-white/65 hover:scale-125">
                <a href={`https://instagram.com/${socialData?.data?.instagram_id}`} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <div className="absolute hidden md:group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Visit Instagram
                </div>
              </li>
            )}
            {data?.data?.homepage && (
              <li className="relative group transition-all hover:text-white/65 hover:scale-125">
                <a href={data?.data?.homepage} target="_blank" rel="noopener noreferrer">
                  <FaLink />
                </a>
                <div className="absolute hidden md:group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Visit Website
                </div>
              </li>
            )}
          </ul>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-5 md:gap-0 mt-9 md:mt-0'>
            <div className='md:mt-8'>
              <p className='font-bold text-lg'>Status:</p>
              <p className='text-sm mt-[3px]'>{data?.data?.status}</p>
            </div>
            <div className='md:mt-5'>
              <p className='font-bold text-lg'>Original Language:</p>
              <p className='text-sm mt-[3px]'>{data?.data?.original_language?.toUpperCase()}</p>
            </div>
            {
              mediaType === "movie" ? (
                <>
                  {data?.data?.budget ? (
                    <div className='md:mt-5'>
                      <p className='font-bold text-lg'>Budget:</p>
                      <p className='text-sm mt-[3px]'>${data?.data?.budget?.toLocaleString()}</p>
                    </div>
                  ) : null}
                  {data?.data?.revenue ? (
                    <div className='md:mt-5'>
                      <p className='font-bold text-lg'>Revenue:</p>
                      <p className='text-sm mt-[3px]'>${data?.data?.revenue.toLocaleString()}</p>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <div className='md:mt-5'>
                    <p className='font-bold text-lg'>Network:</p>
                    <ul className='text-sm mt-[3px] flex gap-3'>{data?.data?.networks?.map(network => <li key={network.id} className='bg-zinc-400 w-fit p-1 rounded'><Link><img src={`https://media.themoviedb.org/t/p/h30${network.logo_path}`} alt="" /></Link></li>)}</ul>
                  </div>
                  <div className='md:mt-5'>
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
      </div>

    </>
  )
}

export default MovieDetailsPage;
