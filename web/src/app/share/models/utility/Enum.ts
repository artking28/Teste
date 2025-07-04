
export interface EnumClass<T, K> {
    role: T

    getAllValues(): T[]
    getId(): K
    asString(): string
}
