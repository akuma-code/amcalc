// // import { FnDtoActions, FnDtoNames } from "..";
import { _log } from "../../Helpers/HelpersFns";



// class v2DTO_ActionStore {
//     public store: Record<FnDtoNames, FnDtoActions> | {}
//     constructor() {
//         this.store = {}
//     }

//     register(fn_type: FnDtoNames, func: FnDtoActions['fn']): void {
//         const action_node = {
//             type: fn_type,
//             fn: func,

//         }
//         this.store = { ...this.store, [fn_type]: action_node }
//         _log("registered: ", action_node)
//     }

//     get size() {
//         const size = Object.entries(this.store).length;
//         _log("size: ", size)
//         return size
//     }
//     run(action: FnDtoActions) {

//     }

// }

// const dto_astore = new v2DTO_ActionStore()

// dto_astore.register('nets', CalcNetSize)
// dto_astore.register('offset5', CalcOffsetFn_Type5)


// export default dto_astore