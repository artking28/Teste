
export class GenericResponse<Any = any> {
    result: Any
    responseCode: ResponseCode = ResponseCode.SUCCESS
    messages: JsonMessage[] = []
    language: string


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

    toString(): string {
        return (this.messages.length > 0 ? this.messages[0].message : "Empty response")
    }

    public static adapt<T>(object: GenericResponse<T>): GenericResponse<T> {
        let ret: GenericResponse<T> = Object.assign(new GenericResponse<T>(), object)
        if (object.messages && object.messages.length > 0) {
            ret.messages = object.messages.map((o) => JsonMessage.adapt(o))
        }
        return ret;
    }
}

export class JsonMessage {
    severity: string = ""
    msgType: string = ""
    message: string = ""
    args: string[] = []

    public static adapt(object: JsonMessage): JsonMessage {
        return  Object.assign(new JsonMessage(), object)
    }
}

enum ResponseCode {
    SUCCESS,
    ERROR,
    WARN,
    INFO
}
