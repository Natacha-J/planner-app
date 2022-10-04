import axios from 'axios'

const user: string = 'Natacha'
const password: string = 'admin'
export const URL_BASE: string = 'https://safe-atoll-62052.herokuapp.com/api'
const getToken: Function = async() => {
    const response = await axios.post(URL_BASE +'/login', {
        pseudo: user,
        password: password
    })
    return response.data.user
}

export default getToken