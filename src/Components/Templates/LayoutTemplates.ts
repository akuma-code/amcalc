import { TypeSelector } from "../../ActionComponents/ActionTypes/Types"
import { _log } from "../../Helpers/HelpersFns"
import { createOutputTableData } from "../FlexForm/OutputTable"

type tmpl_form = Pick<TypeSelector<'nets'>, 'fields' | 'initstate'>

export function tmpl_layout() {
    const buttons = [
        'nets', 'offset5'
    ]

    const form: tmpl_form = {
        fields: ['width', 'height'],
        initstate: { width: 500, height: 800 }
    }

    const out = createOutputTableData<'nets'>(
        { width: 500, height: 800 },
        { skf: { h: 100, w: 100 }, simple: { h: 50, w: 50 } })

    return { buttons, form, out }
}
