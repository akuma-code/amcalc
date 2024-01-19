import axios, { AxiosPromise, AxiosResponse } from "axios";
import { ZGroupName } from "../Context/SpreadSheetStore";
import { _log } from "../Helpers/HelpersFns";


export type GoogleResponse = Promise<
    {
        data: string[][];
        groupId: ZGroupName;
    }[] | null
>
export interface ViteoResponse {
    data: string[][];
    groupId: ZGroupName;
}

export interface IsoResponse {
    data: string[][]
    groupId: string,
    groupName: string
}
export const _proxy = `https://thingproxy.freeboard.io/fetch/`
export const URL_script = _proxy + `https://script.google.com/macros/s/AKfycbwXPBV66vrnLuHyBo-dtO46jPJvMHAuPMvhMCahub_8EBidiupF1sZ7lvsoJI0oi7_T/exec`

export const url_viteo = `https://script.google.com/macros/s/AKfycbyQiyGC1p6cEtrPrnr2evh67c7k2xfQMrJ3crpuQkz2r3nv6Nn0J7wqzJFvMnjRkGhw/exec?ztype=viteo`
export const url_isolite = `https://script.google.com/macros/s/AKfycbwj4pgCVpKbPRdnOuLalAlpzBfRuK-Gi4EUgyjcD7Yo2lt95CkPDrxYF197M3E1n86k/exec`
export const _headers = {

    'Content-Type': 'application/json' as const,
    'Access-Control-Allow-Origin': 'http://localhost:3000' as const,
    'Access-Control-Allow-Headers': "*" as const,
}
export const $host = axios.create({
    baseURL: 'http://localhost:3000',
})


export const getGoogleSS = async (sheetId?: string) => {
    const url = sheetId ? _proxy + url_viteo : URL_script

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

export async function postGoogleSS(): GoogleResponse {
    const url = _proxy + url_viteo;
    try {

        const response = await $host.get(url, {
            headers: _headers,
            responseType: 'json',

        });
        return response.data;
    } catch (error) {
        _log("AXIOS ERROR: ", error);
    }
    return null;
}

export async function fetchViteoData() {
    const url = _proxy + url_viteo;
    try {

        const response = await $host.get<ViteoResponse>(url, {
            headers: _headers,
            responseType: 'json',

        });
        return response;
    } catch (error) {
        _log("___Fetch ERROR: ", error);
    }
    return null;
}
export async function fetchIsoliteData() {
    const url = _proxy + url_isolite;
    try {

        const response = await $host.get<IsoResponse>(url, {
            headers: _headers,
            responseType: 'json',

        });
        return response;
    } catch (error) {
        _log("___Fetch ERROR: ", error);
    }

}

export const $api = {
    iso: async (url = _proxy + url_isolite, params?: object) => {

        try {

            const response = await $host.get<IsoResponse[]>(url, {
                headers: _headers,
                responseType: 'json',
                ...params
            });
            return response;
        } catch (error) {
            _log("___Fetch ERROR: ", error);
        }
        return null;
    },
    viteo: async (url: string = _proxy + url_viteo) => {
        const _url = _proxy + url_viteo;
        try {

            const response = await $host.get<GoogleResponse>(url, {
                headers: _headers,
                responseType: 'json',

            });
            return response.data;
        } catch (error) {
            _log("___Fetch ERROR: ", error);
        }
        return null;
    }

}