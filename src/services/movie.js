import api from "../configs/api";

const getMovieDetailsById = (id, mediaType) => api.get(`${mediaType}/${id}`)

const getMovieCastById = ({queryKey}) => api.get(`${queryKey[2]}/${queryKey[1]}/credits`)

const getMovieSocialsById = ({queryKey}) => api.get(`${queryKey[2]}/${queryKey[1]}/external_ids`)

const getMovieKeywordsById = ({queryKey}) => api.get(`${queryKey[2]}/${queryKey[1]}/keywords`)

export {
    getMovieDetailsById,
    getMovieCastById,
    getMovieSocialsById,
    getMovieKeywordsById
}