import { action, makeAutoObservable, observable } from "mobx";
import { ViewNetsState } from "../Components/FlexForm/Output/NetsCard";
import { ANYobj } from "../Interfaces/MathActionsTypes";
import { InputsTypeEnum } from "../Hooks/useFormStateSelector";
import { observer } from "mobx-react-lite";
import { StringsIterator } from "../ActionComponents/ActionModels/FnGenerator";

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

export class OutputViewConfig {
    selected_store: InputsTypeEnum = InputsTypeEnum.size_full
    visible: Record<string, boolean> = {}
    constructor() {
        makeAutoObservable(this, {
            selected_store: observable,
            visible: observable,
            toggle: action
        })
        this.visible = { showSkf: false, showSimple: true }
    }
    toggle(mode: 'skf' | 'simple' | 'both') {

        switch (mode) {
            case "skf": { this.visible = { ...this.visible, showSkf: true, showSimple: false }; break }
            case "simple": { this.visible = { ...this.visible, showSkf: false, showSimple: true }; break }
            case "both": { this.visible = { ...this.visible, showSkf: true, showSimple: false }; break }
        }
    }
}