import axios from 'axios'
import qs from 'qs'
const instance = axios.create({
    timeout: 3000,
    timeoutErrorMessage: "Request Timeout！"
});

instance.interceptors.request.use((config => {
    return config
}), (error) => {
    console.log("AXIOS REQUEST ERROR: ", error)
    return Promise.reject(error)
})
instance.interceptors.response.use((response => {
    return response
}), (error) => {
    console.log("AXIOS RESPONSE ERROR: ", error)
    return Promise.reject(error)
})

axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN";
axios.defaults.headers.post['Content-Type'] = 'application/json';

const GET = (url: string, params: any = "") => {
    return instance.get(url, {
        data: qs.stringify(params)
    })
}

const POST = (url: string, params: any = {}) => {
    return instance.post(url, params)
}


export default {
    $get: GET,
    $post: POST
}