import { _log } from "../Helpers/HelpersFns"

type ResponseDataType<T> = {
    type: 'row'
    response: T
} | {
    type: 'promise'
    response: Promise<T>
}
type SSResponse = {

}

export const sheetDataParser = <T>() => {

}