import { _log, _trim } from "../Helpers/HelpersFns"

type ISpreadSheetData = number[][]
export type ZGroupName = "" | 'viteo_E' | 'viteo_1' | 'viteo_2' | 'viteo_3' | 'viteo_4' | 'viteo_5' | 'viteo_6'
type ISheetGroupData = {
    data: string[][];
    groupId: ZGroupName;
}
export class SpreadSheetStore {
    store: Record<string, ISpreadSheetData> = {}
    lsid = "_sheet_data"
    constructor() {

        this.init()
    }

    init() {

        const saved = localStorage.getItem(this.lsid)
        if (!saved) {
            _log("You have to load data from google")

        }
        else {
            this.setStore(JSON.parse(saved))
        }
    }
    setStore(new_store: typeof this.store) {
        this.store = new_store
        this.saveStore()
    }
    saveStore() {
        localStorage.setItem(this.lsid, JSON.stringify(this.store))
    }

    parseData(sheet_data: ISheetGroupData[]) {
        const trimmed = sheet_data.map(sd => sd.data.map(resultParser))
        sheet_data.forEach((sd, idx) => this.store![sd.groupId] = trimmed[idx])
        this.saveStore()
    }
    clear() {
        return this.store = {}
    }

}

const resultParser = (row: string[]) => Array.isArray(row) ? row.map(i => +_trim(i)) : row