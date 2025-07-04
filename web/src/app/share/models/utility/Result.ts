
export interface Result {
}

export class Some<T> implements Result {
    value: T
    msg: string
    adds: Map<any, any>

    constructor(value: T, msg: string = "", adds: Map<any, any> = new Map()) {
        this.value = value;
        this.msg = msg;
        this.adds = adds;
    }
}

export class None implements Result {
    msg: string

    constructor(msg: string = "") {
        this.msg = msg;
    }
}

export class Err implements Result {
    value: any
    msg: string

    constructor(msg: string, value?: any) {
        this.msg = msg;
        this.value = value
    }
}
