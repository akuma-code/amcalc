import { _log } from "../Helpers/HelpersFns"

type ResponseDataType<T> = {
    type: 'row'
    response: T
} | {
    type: 'promise'
    response: Promise<T>
}


export const sheetDataParser = <T>(responseData: ResponseDataType<T>) => {
    _log("data:", responseData)
}