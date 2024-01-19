import axios from 'axios';
import Cookies from 'js-cookie';
const $api = axios.create({
    baseURL: 'http://localhost:3000',
    proxy: {
        protocol: 'https',
        host: '192.168.0.250',
        port: 3128,
    },
    // withCredentials: true
})

export const api = {
    get: async <T>(url: string, params?: object) =>
        await $api.get<T>(url, {
            headers: {
                token: Cookies.get('token'),
            },
            ...params,
        }),
    post: async <T>(url: string, data: any) => {
        return await $api.post<T>(url, data, {
            headers: {
                token: Cookies.get('token'),
            },
        });
    },
    patch: async<T>(url: string, data: any) =>
        await $api.patch<T>(url, data, {
            headers: {
                token: Cookies.get('token'),
            },
        }),
    delete: async <T>(url: string) =>
        await $api.delete<T>(url, {
            headers: {
                token: Cookies.get('token'),
            },
        }),
    head: async <T>(url: string) => {
        await $api.head<T>(url, {

        })
    }
};