export type MathActionNames = 'plus' | 'minus' | 'multi' | 'devide' | 'sum'
export type ISimpleMathFunc = (a: number, b: number) => number

interface IMathFunc {
    plus(a: number, b: number): number
    sum(...args: number[]): number
    minus(a: number, b: number): number
    devide(a: number, b: number): number
    multi(a: number, b: number): number
}
export class MathFunc implements IMathFunc {
    public plus(a: number, b: number): number {

        return a + b
    }

    public minus(a: number, b: number): number {
        return a - b
    }

    public devide(a: number, b: number): number {
        if (b === 0) throw new Error("Делить на ноль низзя!")
        return a / b
    }

    public multi(a: number, b: number): number {
        return a * b
    }

    public sum(...args: number[]): number {
        return args.reduce((s, c) => s += c, 0)
    }
}
type ISavedSimpleAction = {
    action: (...args: number[]) => any
    initValue: number
}

interface Iv1_Calc {
    save(actionId: string, action: (...args: number[]) => any, initValue?: number): void
    use(savedAction: string, varX: number): number
    actions: Record<string, ISavedSimpleAction>
}




class v1_Calc<K extends keyof MathFunc> implements Iv1_Calc {
    actions: Record<string, ISavedSimpleAction> = {}

    save(actionId: string, action: IMathFunc[K], initValue: number): void {
        const actId = actionId + ` ${initValue || 'noValue'}`;

        this.actions = { ...this.actions, [actId]: { initValue, action: action } }

        console.log("saved action: ", this.actions[actId])

    }
    use(savedAction: string, varX: number | string): number {
        let X: number;
        if (typeof varX === 'string') X = +varX
        else X = varX
        const act = this.actions[savedAction] || undefined
        if (!act) return 0
        else return act.action(act.initValue, X)

    }
    info() {
        console.log("saved actions: ", ...Object.entries(this))
    }
}

export const cc = new v1_Calc()


