import { _log } from "../../Helpers/HelpersFns";
import FnLinkedList, { DTO_Node, IDataTransferObject } from "../../Models/DTO_ChainStore";
import { Enum_NodesAction } from "../ActionTypes/Types";
import CalcNetSize from "../Nets/CalcNetSize";
import CalcOffsetFn_Type5 from "../Offset5/Offset5";


const dto_Store = new FnLinkedList<IDataTransferObject>()

dto_Store.add(new DTO_Node(CalcOffsetFn_Type5, Enum_NodesAction.offset5))
dto_Store.add(new DTO_Node(CalcNetSize, Enum_NodesAction.nets))

export default dto_Store