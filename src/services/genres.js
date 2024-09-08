import api from "../configs/api";

const getMoviesGenres = () => api.get("genre/movie/list")

export {
    getMoviesGenres
}