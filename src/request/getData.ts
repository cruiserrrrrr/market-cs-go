import axios from "axios"

export const getData = async (url, dataState, loading) => {
    await axios.get(url)
        .then(res => dataState(res.data))
    loading(true)
}

export const getUserData = async (url, stateDataUsers, loading) => {
    const response = await axios.get(url);
    stateDataUsers(response.data)
    loading(true)
}
export const postData = async (url, data) => {
    const postUser = await axios.post(url, data)
}
export const deleteData = async (url, id) => {
    const deleteItem = await axios.delete(url + id)
}

export const editData = async (url, id, item) => {
    const edit = await axios.put(url + id, item)
}