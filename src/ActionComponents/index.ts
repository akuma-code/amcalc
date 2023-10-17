import React from 'react'
import { NetFnNode } from './Nets/FnNode'
import { CalcNetSize } from './Nets/CalcNetSize'
import { _log } from '../Helpers/HelpersFns'
import { validate } from 'uuid'

const ExportNode = new NetFnNode(CalcNetSize)



export default ExportNode