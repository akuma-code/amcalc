import axios, { HeadersDefaults } from "axios";
import { _log } from "../Helpers/HelpersFns";



export const URL_dev = `https://script.google.com/macros/s/AKfycbzDwO9fxSndxIjRChCOlclJ5Le0J_mJ2HK8r0Lbg1c/dev`
export const URL_script = `https://thingproxy.freeboard.io/fetch/https://script.google.com/macros/s/AKfycbwXPBV66vrnLuHyBo-dtO46jPJvMHAuPMvhMCahub_8EBidiupF1sZ7lvsoJI0oi7_T/exec`
const dev1 = `https://thingproxy.freeboard.io/fetch/https://script.google.com/macros/s/AKfycbzDwO9fxSndxIjRChCOlclJ5Le0J_mJ2HK8r0Lbg1c/dev`
export const _headers = {

    'Content-Type': 'application/json' as const,
    'Access-Control-Allow-Origin': 'http://localhost:3000' as const,
    'Access-Control-Allow-Headers': "*" as const,
}
export const $host = axios.create({
    baseURL: 'http://localhost:3000',

    // transformRequest: [(data, headers) => {

    //     return data
    // }],
    // // Преобразование ответа
    // transformResponse: [(data) => {
    //     return data
    // }],
    // maxContentLength: 2048,
    // Максимальный размер запроса в байтах
    // maxBodyLength: 2048,
    // proxy: {
    //     protocol: 'http',
    //     host: '192.168.0.250',
    //     port: 3128,
    // },
    // headers: {
    //     'Content-Type': 'application/json,text/plain'
    // },
    // responseType: 'json',

})


export const getGoogleSS = async () => {
    try {
        const response = await $host.get(URL_script, {
            headers: _headers,
            responseType: 'json',

        })
        return response
    } catch (error) {
        _log("AXIOS ERROR: ", error)
    }
    return null
}