import axios from "axios"

export const getData = async (url, dataState, loading) => {
    await axios.get(url)
        .then(res => {
            dataState(res.data)
            loading(true)
        })
}

export const getUserData = async (url, stateDataUsers, loading) => {
    await axios.get(url)
        .then(res => {
            stateDataUsers(res.data)
            loading(true)
        })
}
export const postData = async (url, data, loading) => {
    await axios.post(url, data)
        .then(
            loading(true)
        )
}
export const deleteData = async (url, id, loading) => {
    await axios.delete(url + id)
        .then(
            loading(true)
        )
}

export const editData = async (url, id, item, loading) => {
    await axios.put(url + id, item)
        .then(
            loading(true)
        )
}