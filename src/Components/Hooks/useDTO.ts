import { ArgsList, Enum_NodesAction, FnKeys, IFuncArgs, IFuncsList } from "../../ActionComponents/ActionTypes/Types"
type Output_v1<T extends FnKeys> = {
    args: ArgsList[T]
    output: ReturnType<IFuncsList>
}
export const useDTO = <FType extends FnKeys>(fn_type: Enum_NodesAction & string) => {
    const createOutput = (fn: IFuncsList, ...saved_args: ArgsList[FType][]): Output_v1<FType> | void => {
        const out: Output_v1<FType> = {
            args: {} as ArgsList[FType],
            output: {} as ReturnType<IFuncsList>
        }
        if (!saved_args) return out


    }

    return { createOutput }
}