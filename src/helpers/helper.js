const createQueryObject = (currentQuery, newQuery) => {
    let page = currentQuery.get("page");
    let sortBy = currentQuery.get("sortBy");

    if (!page) page = 1;
    if(!sortBy) sortBy = "popularity.desc"

    return { page, sortBy, ...newQuery }
}

export {
    createQueryObject
}