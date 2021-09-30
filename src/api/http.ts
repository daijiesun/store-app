import axios, { AxiosResponse } from 'axios';
import { Notify } from 'vant';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
axios.defaults.headers['Authorization'] = "AUTH_TOKEN";
axios.defaults.headers['AUTH_TOKEN'] = "sdj";

axios.defaults.baseURL = import.meta.env.VITE_APP_API;

function FETCH<T>(url: string, method: string, data: any): Promise<T> {
    const METHOD: any = (axios as any)[method];
    return new Promise((resolve, reject) => {
        METHOD(url, data).then((res: AxiosResponse) => {
            if (res.data.status === 200 || res.data.status === 201) {
                resolve(res.data.obj as T)
            } else {
                if (res.data.errors) {
                    Notify({ type: 'danger', message: res.data.errors });
                }
                reject()
            }
        }).catch((error: any) => {
            if (error?.response?.data?.errors) {
                Notify({ type: 'danger', message: error.response.data.errors });
            } else {
                Notify({ type: 'danger', message: error.message });
            }
            reject(error)
        })
    })
}

export function GET<T>(url: string, params: any = undefined): Promise<T> {
    return FETCH(url, 'get', params);
}
export function POST<T>(url: string, params: any = undefined): Promise<T> {
    return FETCH(url, 'post', params);
}
export function DELETE<T>(url: string, params: any = undefined): Promise<T> {
    return FETCH(url, 'delete', params);
}
export function PUT<T>(url: string, params: any = undefined): Promise<T> {
    return FETCH(url, 'put', params);
}
export function PATCH<T>(url: string, params: any = undefined): Promise<T> {
    return FETCH(url, 'patch', params);
}