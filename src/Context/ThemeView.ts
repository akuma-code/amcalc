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

    private set NetsOut(options: OutputNetsOptions) {
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
        const { mode, show } = new_values
        const current = this[option_id]
        const [cm, cs] = [current.mode, current.show]
        const [new_mode, new_show] = [
            !!mode ? mode : cm,
            !!show ? show : cs
        ]
        const updated: OutputNetsOptions = { ...current, mode: new_mode, show: new_show }
        this.NetsOut = updated

    }
}