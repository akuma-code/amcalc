import { _log } from "./HelpersFns";
import { DTO_FnArgs, DTO_ExportFnType } from "../Interfaces/MathActionsTypes";

type ISavedFields<F extends (args: any) => any> = {
    args: DTO_FnArgs<F>;
    output: ReturnType<F>;
};
// export function saveWrapper<F extends (args: any) => any>(f: F) {

//     let calls = [] as ISavedFields<typeof f>[]

//     function Fn(args: DTO_ExportFnType<F>['args']) {
//         if (!args) return;
//         const output = f(args);
//         const calcInstance: ISavedFields<typeof f> = { args, output };
//         _log("instance", calcInstance)
//         calls = [...calls, calcInstance]
//         _log("calls", calls);
//         return f(args)
//     };

//     return Fn

// }
// export const save2 = <F extends (...args: any) => any>(func: F) => {
//     let calls: ISavedFields<F>[] = []

//     const saved = (...args: any[]) => {
//         calls.push({
//             args: args,
//             output: func(...args)
//         })
//         return func.call(args)
//     }
//     console.log('saved: ', calls)
//     return saved as (...args: Parameters<F>) => ReturnType<F>
// }


