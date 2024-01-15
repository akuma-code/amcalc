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

export const URL_script = `https://thingproxy.freeboard.io/fetch/https://script.google.com/macros/s/AKfycbwXPBV66vrnLuHyBo-dtO46jPJvMHAuPMvhMCahub_8EBidiupF1sZ7lvsoJI0oi7_T/exec`
export const _headers = {

    'Content-Type': 'application/json' as const,
    'Access-Control-Allow-Origin': 'http://localhost:3000' as const,
    'Access-Control-Allow-Headers': "*" as const,
}
export const $host = axios.create({
    baseURL: 'http://localhost:3000',


})


export const getGoogleSS = async (sheetId?: string) => {
    const url = sheetId ? URL_script + `?sheetid=${sheetId}` : URL_script

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
    const ver3 = 'https://thingproxy.freeboard.io/fetch/https://script.google.com/macros/s/AKfycby0HM7hFZTuiQ3-W0oNXpNVhkPwN1cde3BpGYsNy8l49R-m5WwAMD_AKO52EsJyYVg/exec'

    try {
        const response = await $host.post(ver3, {
            sheetid: sheetId
        })
        return response
    } catch (error) {
        _log("AXIOS ERROR: ", error)
    }
    return null
}