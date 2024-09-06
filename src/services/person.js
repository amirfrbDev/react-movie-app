import api from "../configs/api";

const getPersonDetailsById = ({ queryKey }) =>  api.get(`person/${queryKey[1]}`)

const getPersonSocialsById = ({queryKey}) => api.get(`person/${queryKey[1]}/external_ids`)

export {
    getPersonDetailsById,
    getPersonSocialsById
}