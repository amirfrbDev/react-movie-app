import api from "../configs/api";

const getPopularMoviesByPage = ({ queryKey }) => api.get(
    `discover/movie?page=${queryKey[1]}&sort_by=${queryKey[2]}&show_me=${queryKey[3].show_me}&release_date.gte=${queryKey[3]["release_date.gte"]}&release_date.lte=${queryKey[3]["release_date.lte"]}&with_genres=${queryKey[3].with_genres?.join(",")}&with_original_language=${queryKey[3].with_original_language || ""}`
);

const getLanguages = () => api.get('configuration/languages')

export {
    getPopularMoviesByPage,
    getLanguages
}