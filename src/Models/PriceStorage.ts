import { _trim } from "../Helpers/HelpersFns"
import { IsoPriceTemplate } from "./IsoPriceTemplate"
import { VPriceTemplate } from "./ViteoPriceTemplate"
import { EnZhGroupKeys, ZhTYPE } from "./ZnGroupEnums"





export interface IZPriceData<T> {
    data: T[][]
    groupId: EnZhGroupKeys

}


export type IZColorsGroups = Record<string, object>
export type IZPriceGroups = Record<ZhTYPE, EnZhGroupKeys[]>
type IPriceStorageStatus = 'init' | 'ready' | 'not_ready' | 'empty'

//   *хранилище должно уметь: хранить прайслист в виде {zprice_group:Array<number[]>}
//   *save/load to localstorage
//   *fetch from googlesheets
//   *return pricelist


const _vprice = Object.entries(VPriceTemplate).map(([k, d]) => ({ groupId: k as EnZhGroupKeys, data: d }))
const _iprice = Object.entries(IsoPriceTemplate).map(([k, d]) => ({ groupId: k as EnZhGroupKeys, data: d }))
export class PriceStorage {
    public config: { version: number, status: IPriceStorageStatus }
    public store: Partial<Record<string & EnZhGroupKeys, number[][]>> = {}
    constructor(
        options: { preload?: boolean } = { preload: false }
    ) {
        this.config = { version: 1.0, status: 'empty' }
        if (options.preload) {
            this.setPriceDataArray(_vprice)
            this.setPriceDataArray(_iprice)
            this.setStatus('ready')
        }
    }
    private _trimdata(data_to_trim: (string | number)[][]) {
        return data_to_trim.map(row => row.map(i => typeof i === 'number' ? i : +_trim(i)))
    }
    setPriceData(price_group: IZPriceData<number | string>) {
        const { data } = price_group
        const trimmed = this._trimdata(data)
        this.store[price_group.groupId] = trimmed
    }
    setPriceDataArray(price_groups: IZPriceData<string | number>[]) {
        for (let group of price_groups) {
            this.setPriceData(group)
        }
    }
    setStatus(s: IPriceStorageStatus) {

        this.config = { ...this.config, status: s }
    }
}

export const PS = new PriceStorage()


