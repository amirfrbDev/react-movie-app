import api from "../configs/api";

const getPopularMoviesByPage = ({ queryKey }) => api.get(`discover/movie?page=${queryKey[1]}&sort_by=${queryKey[2]}`, {
    body: JSON.stringify({
        "release_date.lte" : queryKey[3],
        
    })
})

export {
    getPopularMoviesByPage
}