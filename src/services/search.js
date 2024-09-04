import api from "../configs/api";

const getSearchedItems = (query, signal) => {
    if (query === "") return;

    return api.get(`search/multi?query=${query}&page=1`, { signal }) || null
}

export {
    getSearchedItems
}