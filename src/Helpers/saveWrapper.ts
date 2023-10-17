import { _log } from "./HelpersFns";
import { DTO_ExportFnType } from "../Interfaces/MathActionsTypes";

type ISavedFields<F extends (args: any) => any> = {
    args: DTO_ExportFnType<F>['args'];
    output: ReturnType<F>;
};
export function saveWrapper<A>(f: (args: A) => any) {

    let calls = [] as ISavedFields<typeof f>[]

    function Fn(args: A) {
        if (!args) return;
        const res = f(args);
        const calcInstance: ISavedFields<typeof f> = {
            args, output: res
        };
        _log("instance", calcInstance)
        calls = [...calls, calcInstance]
        _log("calls", calls);
        return f(args)
    };

    return Fn
    // return exec;

}
export const save2 = <F extends (...args: any) => any>(func: F) => {
    let calls: ISavedFields<F>[] = []

    const saved = (...args: any[]) => {
        calls.push({
            args: args,
            output: func(...args)
        })
        return func.call(args)
    }
    console.log('saved: ', calls)
    return saved as (...args: Parameters<F>) => ReturnType<F>
}


