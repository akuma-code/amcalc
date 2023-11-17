import { ArgsTypes, ArgsTypesEn, ArgsTypesList } from "../../Models/ArgsTypeModel"
import React, { useState, useReducer } from 'react'
import { dto_forms } from "../../mobXStore/InputsStore"
import { DTO_FormStatesList, dto_formStates, dto_formdata } from "../FlexForm/DTO_Forms"
import { ANYfn, ANYobj } from "../../Interfaces/MathActionsTypes"
import { FormSelectorState, IFormInstances, ISaveFullSize, ISaveOffset5, ISaveSize, SAVE_ARG } from "../../ActionComponents/ActionTypes/ReducerTypes"
import { ISize, ISizeFull } from "../../Interfaces/CommonTypes"
import { Fn_Args_offset5, IC_ArgsList } from "../../ActionComponents/ActionTypes/Types"

export enum InputsTypeEnum {
    size_full = 'size_full',
    offset5 = 'offset5',
    size = 'size'
}
export type FormAction<T extends InputsTypeEnum> = {
    type: T
    payload: DTO_FormStatesList[T]['payload']
}

// export interface ISaveFullSize extends FormAction<InputsTypeEnum.size_full> { }
// export interface ISaveOffset5 extends FormAction<InputsTypeEnum.offset5> { }
// export interface ISaveSize extends FormAction<InputsTypeEnum.size> { }
export type DTO_ARGS =
    | ISizeFull
    | ISize
    | Fn_Args_offset5


type DTO_FormActions =
    | ISaveFullSize
    | ISaveSize
    | ISaveOffset5

type BasicFormState = {
    fields: readonly any[]
    saved: any[]
    init: ANYobj
}
type InitFormState<Arg> = Arg extends DTO_ARGS ? {
    init: Arg
    fields: ReadonlyArray<keyof Arg>
    saved: Arg[]
} : never







export const useFormStateSelector = (): IFormInstances[InputsTypeEnum] => {


    return { fields: [], init: { w: 0, h: 0 }, saved: [] }
}

function reducer(state: IFormInstances, action: DTO_FormActions) {
    switch (action.type) {
        case SAVE_ARG.save_size_full: {
            const { payload, type } = action
            return {
                ...state
            }
        }
        case SAVE_ARG.save_size: {
            const { payload } = action
            return {
                ...state,
            }
        }
        case SAVE_ARG.save_offset5: {
            const { payload } = action
            return {
                ...state,
            }
        }
        default: return state
    }
}


