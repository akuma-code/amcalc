import { action, makeObservable, observable, toJS } from "mobx";
import { _log } from "../Helpers/HelpersFns";
import { InputsTypeEnum } from "../Hooks/useFormStateSelector";
import { ArgsTypes } from "../Models/ArgsTypeModel";
import { ZGroupName } from "./SpreadSheetStore";


export type ILayoutTypes = { path: 'bento' } | { path: 'sill' } | { path: 'home' }
export interface IVisibileItems {
    showSkf: boolean,
    showSimple: boolean,
    showOtkosi: boolean,
    showOffset5: boolean,

    devtools: boolean,
    showPossibleMerge: boolean
}
export interface IOutputView {
    active: { store: ArgsTypes, output: ArgsTypes, zgroup: ZGroupName }
    visible: IVisibileItems,
    layout: ILayoutTypes
}

export class OutputViewConfig implements IOutputView {
    selected_store: ArgsTypes = InputsTypeEnum.size_full
    selected_output: ArgsTypes = InputsTypeEnum.size_full
    visible: IVisibileItems
    active: { store: ArgsTypes; output: ArgsTypes, zgroup: ZGroupName }
    layout: ILayoutTypes = { path: 'bento' }
    globalFetching: boolean
    constructor() {
        makeObservable(this, {
            selected_store: observable,
            selected_output: observable,
            visible: observable,
            active: observable,
            layout: observable,
            globalFetching: observable,
            statusFetching: action,
            setLayout: action,
            toggleSizeView: action,
            selectOut: action,
            selectForm: action,
            toggleVisible: action,
            setActive: action,
        }, { name: 'ViewConfig' })
        this.visible = {
            showSkf: true,
            showSimple: true,
            showOtkosi: true,
            showOffset5: true,
            devtools: false,
            showPossibleMerge: true,

        }
        this.active = {
            store: 'size_full',
            output: 'size_full',
            zgroup: ''
        }
        this.globalFetching = false

    }
    toggleSizeView(mode: 'skf' | 'simple' | 'both') {

        switch (mode) {
            case "skf": { this.visible = { ...this.visible, showSkf: true, showSimple: false }; break }
            case "simple": { this.visible = { ...this.visible, showSkf: false, showSimple: true }; break }
            case "both": { this.visible = { ...this.visible, showSkf: true, showSimple: false }; break }
        }
    }

    selectForm(store_id: InputsTypeEnum) {
        this.selected_store = store_id
        this.active.store = store_id
    }
    selectOut(store_id: InputsTypeEnum) {
        this.selected_output = store_id
        this.active.output = store_id
    }

    toggleVisible(view_item: keyof IVisibileItems) {

        const value = this.visible[view_item]

        this.visible = { ...this.visible, [view_item]: !value }

    }
    statusFetching(status: "error" | "idle" | "loading" | "success") {
        switch (status) {
            case "error": this.globalFetching = false; break
            case "idle": this.globalFetching = false; break
            case "loading": this.globalFetching = true; break
            case "success": this.globalFetching = false; break
        }
    }
    toggleIsFetching(state?: boolean) {
        if (state) {
            this.globalFetching = state
            return
        }
        this.globalFetching = !this.globalFetching

    }
    setLayout(p: ILayoutTypes['path']) {
        _log(toJS(this.layout.path))
        this.layout = { ...this.layout, path: p }
    }
    setActive(item: keyof typeof this.active, value: string) {
        this.active = { ...this.active, [item]: value }
    }
}



// class ThemeView implements IThemeView {
//     Options_Nets_out: OutputNetsOptions
//     constructor() {
//         makeAutoObservable(this)
//         this.Options_Nets_out = this.init.netOutput
//     }

//     private set NetsOut(options: OutputNetsOptions) {
//         this.Options_Nets_out = { ...this.Options_Nets_out, ...options }
//     }

//     get init() {
//         const netOutput: OutputNetsOptions = {
//             mode: "simple",
//             show: { simple: true, skf: false }
//         }
//         return { netOutput }
//     }

//     options<T extends Partial<IThemeView[keyof IThemeView]>>(option_id: keyof IThemeView, new_values: T) {
//         const { mode, show } = new_values
//         const current = this[option_id]
//         const [cm, cs] = [current.mode, current.show]
//         const [new_mode, new_show] = [
//             !!mode ? mode : cm,
//             !!show ? show : cs
//         ]
//         const updated: OutputNetsOptions = { ...current, mode: new_mode, show: new_show }
//         this.NetsOut = updated

//     }
// }
