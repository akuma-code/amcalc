import { IActionData, IActionDataNode } from "../Interfaces/MathActionsTypes";

export class ActionDataNode implements IActionDataNode {
    vars: string[];
    actionCb: <T>(...args: T[]) => any;
    desc?: string;
    output!: <T>(...args: T[]) => string;
    constructor(actionNode: IActionDataNode) {
        this.vars = actionNode.vars
        this.actionCb = actionNode.actionCb
        this.desc = actionNode.desc

    }

    setOutput<T>(...args: T[]) {

        const varSetup = !Array.isArray(this.vars) ? [{ id: this.vars, value: args[0] }] : this.vars.map((v, idx) => ({ id: v, value: args[idx] }))
        const res = this.actionCb(...args)
        console.log('varSetup: ', varSetup)
        this.output = (result) => `Calculation result: ${result}`

        return this.output(res)
    }

}

const vars = ['width']
const cb = (n: number) => n * 5
const descr = "multi x5"







export class ActionData<T> implements IActionData<T>{
    public args: T | T[] = [];
    public callback?: ((...args: T[]) => unknown)
    public output?: (...args: any[]) => string | string
    public description?: string = ""

    constructor(args: T | T[], cb: (...args: T[]) => unknown, out: (...args: any[]) => string | string) {
        this.args = args
        this.callback = cb
        this.output = out
    }

    use(...args: T[]) {
        return
    }
}

