
export class DataUtil<T> {
    start?: T
    adds: Map<string, any>
    returns: Map<string, any> = new Map()

    constructor(start: T | null, adds: Map<string, any> = new Map()) {
        if (start) {
            this.start = start;
        }
        this.adds = adds
    }
}

export class SelectorDataUtil<T> {

    allowSelections: boolean

    isSelected?: ((arg0: T) => boolean)

    isHidden?: ((arg0: T) => boolean)


    constructor(allowSelections: boolean, isSelected?: (arg0: T) => boolean, isHidden?: (arg0: T) => boolean) {
        this.allowSelections = allowSelections;
        if (isSelected) {
            this.isSelected = isSelected;
        }
        if (isHidden) {
            this.isHidden = isHidden;
        }
    }
}
