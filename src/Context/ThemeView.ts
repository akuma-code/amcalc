import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { ViewNetsState } from "../Components/FlexForm/Output/NetsCard";
import { ANYobj } from "../Interfaces/MathActionsTypes";
import { InputsTypeEnum } from "../Hooks/useFormStateSelector";
import { observer } from "mobx-react-lite";
import { StringsIterator } from "../ActionComponents/ActionModels/FnGenerator";
import { _log } from "../Helpers/HelpersFns";

interface OutputNetsOptions {
    mode: 'skf' | 'simple' | 'both'
    show: ViewNetsState

}
interface IThemeView {
    Options_Nets_out: OutputNetsOptions
}


class ThemeView implements IThemeView {
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
    selected_output: InputsTypeEnum = InputsTypeEnum.size_full
    visible: Record<string, boolean> = {}
    constructor() {
        makeObservable(this, {
            selected_store: observable,
            selected_output: observable,
            visible: observable,
            toggleSizeView: action,
            selectOut: action,
            selectStore: action,
            toggleVisible: action,
        }, { name: 'ViewConfig' })
        this.visible = {
            showSkf: false,
            showSimple: true,
            showOtkosi: true,
            showOffset5: true,
            devtools: false

        }
    }
    toggleSizeView(mode: 'skf' | 'simple' | 'both') {

        switch (mode) {
            case "skf": { this.visible = { ...this.visible, showSkf: true, showSimple: false }; break }
            case "simple": { this.visible = { ...this.visible, showSkf: false, showSimple: true }; break }
            case "both": { this.visible = { ...this.visible, showSkf: true, showSimple: false }; break }
        }
    }

    selectStore(store_id: InputsTypeEnum) {
        this.selected_store = store_id
    }
    selectOut(store_id: InputsTypeEnum) {
        this.selected_output = store_id
    }

    toggleVisible(view_item: string) {
        const item = this.visible[view_item]
        if (!item) { _log("No such params: ", view_item) }
        this.visible[view_item] = !item

    }
}