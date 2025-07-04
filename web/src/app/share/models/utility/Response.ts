// import {StockPaginator} from "./filter/StockPaginator";
import {Stringable} from "@app/share/models/utility/Stringable";

export class Response<Any = any> implements Stringable {
    result: Any
    responseCode: ResponseCode = ResponseCode.SUCCESS
    messages: StockMessage[] = []
    language: string
    // paginator: StockPaginator = new StockPaginator()


    // Verifies if the request was successful. In case of 'waitResult' is true, it checks if 'result' is null.
    // If 'result' is an array, it also checks if its length is greater than 0.
    isOk(waitResult: boolean = false): boolean {
        if (this.responseCode == ResponseCode.ERROR) {
            return false
        }
        if (!waitResult) {
            return true
        }
        if (!this.result) {
            return false
        }
        return !Array.isArray(this.result) || this.result.length > 0
    }

    asString(): string {
        return (this.messages.length > 0 ? this.messages[0].message : "Empty response")
    }

    public static adapt<T>(object: Response<T>): Response<T> {
        let ret: Response<T> = Object.assign(new Response<T>(), object)
        if (object.messages && object.messages.length > 0) {
            ret.messages = object.messages.map((o) => StockMessage.adapt(o))
        }
        // if (object.paginator) {
        //     ret.paginator = StockPaginator.adapt(object.paginator)
        // }
        return ret;
    }
}

export class StockMessage {
    severity: string = ""
    msgType: string = ""
    message: string = ""
    args: string[] = []

    public static adapt(object: StockMessage): StockMessage {
        return  Object.assign(new StockMessage(), object)
    }
}

enum ResponseCode {
    SUCCESS,
    ERROR,
    WARN,
    INFO
}
