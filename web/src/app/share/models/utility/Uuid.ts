import {v4 as uuid} from "uuid";

export class Uuid extends String {

    constructor() {
        super(uuid())
    }
}
