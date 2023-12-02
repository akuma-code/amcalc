import { _log } from "../../Helpers/HelpersFns"
import { ISize, SizeFull, SizeShort } from "../../Interfaces/CommonTypes"

type ISavedData = Record<'size_full' | 'size_short', ISize[]>

class FakeServer {
    data: ISavedData
    constructor() {
        this.data = this.init()
    }

    init() {
        const size_full = [
            new SizeFull(100, 200),
            new SizeFull(400, 400),
            new SizeFull(450, 800),
        ]
        const size_short = [
            new SizeShort(10, 20),
            new SizeShort(40, 40),
            new SizeShort(45, 80),
        ]

        return { size_full, size_short }
    }

    send() {
        const send_data = () => this.data

        return setTimeout(send_data, 3000)
    }
}

export const MockServer = new FakeServer()