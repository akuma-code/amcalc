import { $api } from "../HTTP/axios";
import { _log, _trim } from "../Helpers/HelpersFns"

type ISpreadSheetData = number[][]
export type ZGroupName = "" | 'viteo_E' | 'viteo_1' | 'viteo_2' | 'viteo_3' | 'viteo_4' | 'viteo_5' | 'viteo_6'
export type IGroupName = "" | 'isolite_A' | 'isolite_B' | 'isolite_C' | 'isolite_D' | 'isolite_E' | 'isolite_F' | 'isolite_G' | 'isolite_H' | 'isolite_I' | 'isolite_J' | 'isolite_K' | 'isolite_L'
type ISheetGroupData = {
    data: string[][];
    groupId: ZGroupName & string;
}
export class ViteoStore {
    store: Record<string, ISpreadSheetData> = {}
    lsid: string = "_viteo_data"
    constructor() {

        this.init()
    }

    async init() {

        const saved = localStorage.getItem(this.lsid)
        if (!saved) {
            _log("You have to load data from google")
            try {
                const data = await $api.viteo()
                if (data) this.parseData(data)

            } catch (error) {
                console.warn("___initstore error: ", error)
            }
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