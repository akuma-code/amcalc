import { IActionData, IActionDataNode } from "../Interfaces/MathActionsTypes";




export class ActionData<T> implements IActionData<T>{
    public args: T | T[] = [];
    public callback?: ((...args: T[]) => {})
    public output?: (...args: any[]) => string | string
    public description?: string = ""

    constructor(args: T | T[], cb: (...args: T[]) => {}, out: (...args: any[]) => string | string) {
        this.args = args
        this.callback = cb
        this.output = out
    }

    use(...args: T[]) {
        return this.callback!(...args) || ""
    }
}

