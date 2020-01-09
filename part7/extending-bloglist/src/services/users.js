import axios from 'axios'

const getUser = async id => {
    const user = await axios.get(`/users/${id}`)
    return user
}

const getAllUsers = async () => {
    const users = await axios.get("/users")
    return users
}

const createUser = async credentials => {
    const user = await axios.post("/signup", credentials)
    return user
}

export default { getUser, getAllUsers, createUser }