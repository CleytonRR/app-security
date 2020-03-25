import axios from 'axios'
import { getToken } from '../util/storage'

const api = axios.create({
    baseURL: 'http://192.168.1.33:3333/'
})


api.interceptors.response.use(
    response => {

        // Do something with response data

        return response
    },
    error => {

        if (
            error.request._hasError === true &&
            error.request._response.includes('connect')
        ) {
            alert(
                'Aviso',
                'Não foi possível conectar aos nossos servidores, sem conexão com a internet',
                [{ text: 'OK' }],
                { cancelable: false },
            )
        }

        return Promise.reject(error)
    },
)
api.interceptors.request.use(async config => {
    const token = await getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api