import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getPersonMovieCreditsById, getPersonDetailsById, getPersonSocialsById, getPersonTvCreditsById } from "../services/person"
import { FaFacebook, FaImdb, FaInstagram } from 'react-icons/fa6';
import { format } from 'date-fns';
import { IoIosArrowForward, IoIosArrowUp } from 'react-icons/io';

function PersonDetailsPage() {

    const location = useLocation()

    const [isBioComplete, setIsBioComplete] = useState(false)

    const { id } = useParams();

    const { data: detailsData } = useQuery({
        queryKey: ["person-details", id],
        queryFn: getPersonDetailsById
    });

    const { data: socialsData } = useQuery({
        queryKey: ["person-socials", id],
        queryFn: getPersonSocialsById
    });

    const { data: movieCreditsData } = useQuery({
        queryKey: ["person-movie-credits", id],
        queryFn: getPersonMovieCreditsById
    })

    const { data: tvCreditsData } = useQuery({
        queryKey: ["person-tv-credits", id],
        queryFn: getPersonTvCreditsById
    })

    console.log(tvCreditsData)

    const genderByNumber = () => {
        switch (detailsData?.data?.gender) {
            case 0:
                return "Not specified"
            case 1:
                return "Female"
            case 2:
                return "Male"
            case 3:
                return "Non-binary"
        }
    }


    const sortByPopularity = (array) => {
        return array?.sort((a, b) => b.popularity - a.popularity)
    }
    const movieCreditsByPopularity = sortByPopularity(movieCreditsData?.data?.cast)

    useEffect(() => {
        window.scroll(0, 0)
    }, [location])

    const returnAgeByBirthdate = (birthdate) => {
        const today = new Date();
        const birth = new Date(birthdate)

        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age
    }

    return (
        <div className='relative w-full pt-[48px] text-white/100 text-3xl'>
            <div className='w-[95%] mx-auto grid grid-cols-[24%,70%] pt-12 gap-7'>
                <div className='flex flex-col'>
                    <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${detailsData?.data?.profile_path}`} alt="" className='rounded-md shadow-lg shadow-black/50' />
                    <ul className='my-7 mt-9 flex gap-4 text-2xl'>
                        {socialsData?.data?.facebook_id && <Link to={`https://facebook.com/${socialsData?.data?.facebook_id}`} target='_blank'><FaFacebook /></Link>}
                        {socialsData?.data?.instagram_id && <Link to={`https://instagram.com/${socialsData?.data?.instagram_id}`} target='_blank'><FaInstagram /></Link>}
                        {socialsData?.data?.imdb_id && <Link to={`https://imdb.com/name/${socialsData?.data?.imdb_id}`} target='_blank'><FaImdb /></Link>}
                    </ul>
                    <h3 className='text-xl font-semibold'>Personal Info</h3>
                    <div className='ml-2'>
                        <div>
                            <div className='mt-3'>
                                <p className='text-lg font-semibold'>Known For</p>
                                <p className='text-sm font-thin mt-1'>{detailsData?.data?.known_for_department}</p>
                            </div>
                            <div className='my-5'>
                                <p className='text-lg font-semibold'>Known Credits</p>
                                <p className='text-sm font-thin mt-1'>{movieCreditsData?.data?.crew?.length + movieCreditsData?.data?.cast?.length}</p>
                            </div>
                            <div className='my-5'>
                                <p className='text-lg font-semibold'>Gender</p>
                                <p className='text-sm font-thin mt-1'>{genderByNumber()}</p>
                            </div>
                            <div className='my-5'>
                                <p className='text-lg font-semibold'>Birthdate</p>
                                <p className='text-sm font-thin mt-1'>{(new Date(detailsData?.data?.birthday).toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' }))} ({returnAgeByBirthdate(detailsData?.data?.birthday)})</p>
                            </div>
                            <div className='my-5'>
                                <p className='text-lg font-semibold'>Date Of Birth</p>
                                <p className='text-sm font-thin mt-1'>{detailsData?.data?.place_of_birth}</p>
                            </div>
                            <div className='my-5'>
                                <p className='text-lg font-semibold'>Also Known As</p>
                                <ul className='text-sm font-thin mt-2'>
                                    {detailsData?.data?.also_known_as?.map((name, index) => (
                                        <li key={index} className='my-2'>{name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Link to={`/person/${detailsData?.data?.id}`} className='text-3xl font-bold'>{detailsData?.data?.name}</Link>
                    <div>
                        <h2 className='text-xl font-semibold mb-2 mt-6'>Biography</h2>
                        <div className='text-lg '>
                            {detailsData?.data?.biography?.split(" ")?.length > 79 ? (
                                <>
                                    <p className='inline font-thin'>
                                        {!isBioComplete ? `${detailsData?.data?.biography?.split(" ")?.slice(0, 80)?.join(" ")}...` : detailsData?.data?.biography}
                                    </p>
                                    <button className=' ml-2 font-semibold inline-flex items-center underline text-blue-500 rounded-3xl p-1 pl-2 transition-colors hover:text-blue-400' onClick={() => setIsBioComplete(state => !state)} style={{ boxShadow: !isBioComplete && "-20px 0 20px 0px rgba(70, 70, 70, 0.973)", }}>
                                        <p className=''>Read {isBioComplete ? "Less" : "More"}</p>
                                        <span className='inline'>{isBioComplete ? <IoIosArrowUp /> : <IoIosArrowForward />}</span>
                                    </button>
                                </>
                            ) : <p className='font-thin'>{detailsData?.data?.biography}</p>
                            }
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h2 className='text-xl font-semibold '>Popular Movies</h2>
                        <ul className='flex gap-3 overflow-x-scroll mt-3'>
                            {movieCreditsByPopularity?.slice(0, 8)?.map(movie => (
                                <Link to={`/movie/${movie.id}`} className='flex flex-col items-center gap-2 text-center' style={{ width: "130px", minWidth: "130px" }}>
                                    <img src={`https://media.themoviedb.org/t/p/w150_and_h225_bestv2${movie.poster_path}`} alt="" className='rounded-lg' style={{ width: "130px", minWidth: "130px", height: "195px" }} />
                                    <p className='text-sm'>{movie.title || movie.name || movie.original_title || movie.original_name}</p>
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div className='mt-8'>
                        <h2 className='text-xl font-semibold '>Popular Tv Shows</h2>
                        <ul className='flex gap-3 overflow-x-scroll mt-3'>
                            {tvCreditsData?.data?.cast?.slice(0, 8)?.map(movie => (
                                <Link to={`/tv/${movie.id}`} className='flex flex-col items-center gap-2 text-center' style={{ width: "130px", minWidth: "130px" }}>
                                    <img src={`https://media.themoviedb.org/t/p/w150_and_h225_bestv2${movie.poster_path}`} alt="" className='rounded-lg' style={{ width: "130px", minWidth: "130px", height: "195px" }} />
                                    <p className='text-sm'>{movie.title || movie.name || movie.original_title || movie.original_name}</p>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonDetailsPage