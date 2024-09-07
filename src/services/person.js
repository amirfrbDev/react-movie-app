import api from "../configs/api";

const getPersonDetailsById = ({ queryKey }) =>  api.get(`person/${queryKey[1]}`)

const getPersonSocialsById = ({queryKey}) => api.get(`person/${queryKey[1]}/external_ids`)

const getPersonMovieCreditsById = ({queryKey}) => api.get(`person/${queryKey[1]}/movie_credits`)

const getPersonTvCreditsById = ({queryKey}) => api.get(`person/${queryKey[1]}/tv_credits`)

export {
    getPersonDetailsById,
    getPersonSocialsById,
    getPersonMovieCreditsById,
    getPersonTvCreditsById
}