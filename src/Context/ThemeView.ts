import { makeAutoObservable } from "mobx";
import { ViewNetsState } from "../Components/FlexForm/Output/NetsCard";
import { ANYobj } from "../Interfaces/MathActionsTypes";

interface OutputNetsOptions {
    mode: 'skf' | 'simple' | 'both'
    show: ViewNetsState
}
interface IThemeView {
    Options_Nets_out: OutputNetsOptions
}


export class ThemeView implements IThemeView {
    Options_Nets_out: OutputNetsOptions
    constructor() {
        makeAutoObservable(this)
        this.Options_Nets_out = this.init.netOutput
    }

    set NetsOut(options: OutputNetsOptions) {
        this.Options_Nets_out = { ...this.Options_Nets_out, ...options }
    }

    get init() {
        const netOutput: OutputNetsOptions = {
            mode: "simple",
            show: { simple: true, skf: false }
        }
        return { netOutput }
    }

    options<T extends Partial<IThemeView[keyof IThemeView]>>(option_id: keyof IThemeView, new_values: T) {

        const current = this[option_id]
        const updated = { ...current, ...new_values }
        this[option_id] = updated

    }
}