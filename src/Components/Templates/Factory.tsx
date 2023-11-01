import { _log } from "../../Helpers/HelpersFns"

abstract class AbstractDiv {
    abstract el(desc?: string): JSX.Element
}
abstract class AbsFactory {
    abstract div(desc?: string): JSX.Element
}



class TestDiv extends AbstractDiv {
    desc = "div"
    constructor(public count: number, showLog = true) {
        super()
        showLog && _log("Created div #", this.count)
    }
    el(desc?: string): JSX.Element {

        const [w, h] = [10, 7]
        return <div className={`w-[${w}em] h-[${h}em] bg-gray-500 text-center`} key={this.count}> | {this.count ?? 'BLANK'} | {desc || this.desc} </div>
    }
}


class TestFactory extends AbsFactory {
    count = 0
    logging = true
    constructor(showLog = true) {
        super()
        this.logging = showLog
        // this.div('div')
    }
    div(desc?: string) {
        const td = new TestDiv(this.count++, this.logging)
        return td.el(desc)
    }
}

export function* counterGen(max?: number) {
    let init = 0
    while (max ? init < max : true) {
        yield init
        init++
    }
}


export const FactoryDiv = new TestFactory()
