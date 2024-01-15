import axios, { AxiosPromise, HeadersDefaults } from "axios";
import { _log } from "../Helpers/HelpersFns";

type ResponseDataStr = {
    type: 'string'
    result: string[][]
}
type ResponseDataNum = {
    type: 'number'
    result: number[][]
}
export type SheetResponse = ResponseDataStr['result']

export const URL_dev = `https://script.google.com/macros/s/AKfycbzDwO9fxSndxIjRChCOlclJ5Le0J_mJ2HK8r0Lbg1c/dev`
const dev1 = `https://thingproxy.freeboard.io/fetch/https://script.google.com/macros/s/AKfycbzDwO9fxSndxIjRChCOlclJ5Le0J_mJ2HK8r0Lbg1c/dev`
export const URL_script = `https://thingproxy.freeboard.io/fetch/https://script.google.com/macros/s/AKfycbwXPBV66vrnLuHyBo-dtO46jPJvMHAuPMvhMCahub_8EBidiupF1sZ7lvsoJI0oi7_T/exec`
export const _headers = {

    'Content-Type': 'application/json' as const,
    'Access-Control-Allow-Origin': 'http://localhost:3000' as const,
    'Access-Control-Allow-Headers': "*" as const,
}
export const $host = axios.create({
    baseURL: 'http://localhost:3000',


})


export const getGoogleSS = async () => {
    try {
        const response = await $host.get(URL_script, {
            headers: _headers,
            // responseType: 'json',

        })
        return response
    } catch (error) {
        _log("AXIOS ERROR: ", error)
    }
    return null
}