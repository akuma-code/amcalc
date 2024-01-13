import axios, { HeadersDefaults } from "axios";
import { _log } from "../Helpers/HelpersFns";



const URL_dev = `https://script.google.com/macros/s/AKfycbzDwO9fxSndxIjRChCOlclJ5Le0J_mJ2HK8r0Lbg1c/dev`
const URL_script = `https://script.google.com/macros/s/AKfycbwbz2dzJ2yL6L-9RkCbKeC8zfxg0xg8UmG8fOik-MUiLtrsQ6mpRY_5f1bGC0kw5XOR/exec`
const dev1 = `https://script.googleusercontent.com/macros/echo?user_content_key=eleB7j-YyBg76PpivvGp2CkUFPIuSd0HIMGVVvpzR80CrGy6Lgdb2hoefSp2CQTgYQo_L1onswS_j5BgIm0nGiDOUOyMFE7Um5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDlLMQz84xePb_tIuqqNKtnVjf5p85YP-yCDKdsoZ9V2GG-66mdM_MKM7QXb_K3E0A&lib=MShuNsqchtlcgi9scdT3LeHvq73vH79U2`
const _headers = {

    'Content-Type': 'text/html; charset=utf-8' as const,
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
    maxContentLength: 2048,
    // Максимальный размер запроса в байтах
    maxBodyLength: 2048,
    proxy: {
        protocol: 'http',
        host: '192.168.0.250',
        port: 3128,
    },
    // headers: {
    //     'Content-Type': 'application/json,text/plain'
    // },
    // responseType: 'json',

})


export const getGoogleSS = async () => {
    try {
        const response = await $host.get(URL_script, {
            // headers: _headers,
            // responseType: 'json',

        })
        return response
    } catch (error) {
        _log("AXIOS ERROR: ", error)
    }
    return null
}