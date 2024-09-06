import api from "../configs/api";

const getMovieDetailsById = ({ queryKey }) => api.get(`${queryKey[2]}/${queryKey[1]}`)

const getMovieCastById = ({ queryKey }) => api.get(`${queryKey[2]}/${queryKey[1]}/credits`)

const getMovieSocialsById = ({ queryKey }) => api.get(`${queryKey[2]}/${queryKey[1]}/external_ids`)

const getMovieKeywordsById = ({ queryKey }) => api.get(`${queryKey[2]}/${queryKey[1]}/keywords`);

const getMovieReviewsById = ({ queryKey }) => api.get(`${queryKey[2]}/${queryKey[1]}/reviews`)

const getMovieImagesById = ({ queryKey }) => api.get(`${queryKey[2]}/${queryKey[1]}/images`);

const getMovieVideosById = ({ queryKey }) => api.get(`${queryKey[2]}/${queryKey[1]}/videos`);

const getSimilarMoviesById = ({queryKey}) => api.get(`${queryKey[2]}/${queryKey[1]}/similar`)

const getRecommendationMoviesById = ({queryKey}) => api.get(`${queryKey[2]}/${queryKey[1]}/recommendations`)


export {
    getMovieDetailsById,
    getMovieCastById,
    getMovieSocialsById,
    getMovieKeywordsById,
    getMovieReviewsById,
    getMovieImagesById,
    getMovieVideosById,
    getSimilarMoviesById,
    getRecommendationMoviesById
}