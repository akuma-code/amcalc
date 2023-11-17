import { ArgsTypes, ArgsTypesEn, ArgsTypesList } from "../../Models/ArgsTypeModel"

interface IFormState<AT extends keyof ArgsTypesList> {
    inp_type: AT | 'none'
    fields: readonly (keyof ArgsTypesList[AT])[] | [],
    init: ArgsTypesList[AT] | {}
}


export const useFormStateSelector = <AT extends keyof ArgsTypesList>(at: AT): IFormState<AT> => {

    return { fields: [], init: {}, inp_type: 'none' } as const
}