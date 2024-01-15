import axios, { AxiosPromise, HeadersDefaults } from "axios";
import { _log } from "../Helpers/HelpersFns";

type ResponseDataStr = {
    type: 'string'
    result: string[][]
    version: string
}
type ResponseDataNum = {
    type: 'number'
    result: number[][]
}
export type SheetResponse = ResponseDataStr

export const URL_script = `https://thingproxy.freeboard.io/fetch/https://script.google.com/macros/s/AKfycbwXPBV66vrnLuHyBo-dtO46jPJvMHAuPMvhMCahub_8EBidiupF1sZ7lvsoJI0oi7_T/exec`
const ver3 = `https://thingproxy.freeboard.io/fetch/https://script.google.com/macros/s/AKfycbyQiyGC1p6cEtrPrnr2evh67c7k2xfQMrJ3crpuQkz2r3nv6Nn0J7wqzJFvMnjRkGhw/exec`
export const _headers = {

    'Content-Type': 'application/json' as const,
    'Access-Control-Allow-Origin': 'http://localhost:3000' as const,
    'Access-Control-Allow-Headers': "*" as const,
}
export const $host = axios.create({
    baseURL: 'http://localhost:3000',


})


export const getGoogleSS = async (sheetId?: string) => {
    const url = sheetId ? ver3 : URL_script

    try {
        const response = await $host.get(url, {
            headers: _headers,
            // responseType: 'json',

        })
        return response
    } catch (error) {
        _log("AXIOS ERROR: ", error)
    }
    return null
}
export const postGoogleSS = async (sheetId?: string) => {

    try {
        const params = `?sheetName=${sheetId}`
        const response = await $host.get(ver3, {
            headers: _headers,
            responseType: 'json',

        })
        return response.data
    } catch (error) {
        _log("AXIOS ERROR: ", error)
    }
    return null
}