import {v4 as uuid} from "uuid";

export class Uuid extends String {

    constructor() {
        super(uuid())
    }

    static isOk(uuid: string): boolean {
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return regex.test(uuid);
    }
}
