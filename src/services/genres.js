import api from "../configs/api";

const getMoviesGenres = () => api.get("genre/movie/list")

const getTvGenres = () => api.get("genre/tv/list")

export {
    getMoviesGenres,
    getTvGenres
}