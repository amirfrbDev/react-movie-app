import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import { getPersonDetailsById, getPersonSocialsById } from "../services/person"
import { FaFacebook, FaImdb, FaInstagram } from 'react-icons/fa6';

function PersonDetailsPage() {

    const { id } = useParams();

    const { data: detailsData } = useQuery({
        queryKey: ["person-details", id],
        queryFn: getPersonDetailsById
    });

    const { data: socialsData } = useQuery({
        queryKey: ["person-socials", id],
        queryFn: getPersonSocialsById
    })

    console.log(socialsData)

    return (
        <div className='relative w-full pt-[48px] text-white/100 text-3xl'>
            <div className='w-[93%] mx-auto grid grid-cols-[30%,70%] pt-12'>
                <div>
                    <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${detailsData?.data?.profile_path}`} alt="" className='rounded-md shadow-lg shadow-black/70' />
                    <ul>
                        {socialsData?.data?.facebook_id && <li><FaFacebook /></li>}
                        {socialsData?.data?.instagram_id && <li><FaInstagram /></li>}
                        {socialsData?.data?.imdb_id && <li><FaImdb /></li>}

                    </ul>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default PersonDetailsPage