export enum DEFINE_CONFIG {
    UNCONFIGURABLE = 2 ** 0,
    UNENUMERABLE = 2 ** 1,
    UNWRITABLE = 2 ** 2,
    SETTER = 2 ** 4,
}

export function define<T = any>(target: any, key: PropertyKey, value: { get?: () => T, set?: (value: T) => T }, flag: DEFINE_CONFIG | number): void;
export function define<T = any>(target: any, key: PropertyKey, value: T, flag: DEFINE_CONFIG | number = 0): void {
    let options: PropertyDescriptor = {
        configurable: !(flag | DEFINE_CONFIG.UNCONFIGURABLE),
        enumerable: !(flag | DEFINE_CONFIG.UNENUMERABLE),
    }
    if (flag | DEFINE_CONFIG.SETTER) {
        let { get, set } = <any>value
        options.get = get;
        options.set = set;
    } else {
        options.writable = !(flag | DEFINE_CONFIG.UNWRITABLE);
        options.value = value;
    }
    Object.defineProperty(target, key, options);
}

export function defines(target: any, entry: { [key: string]: any } | { [key: number]: any }, flag: DEFINE_CONFIG | number = 0) {
    Object.entries(entry).forEach(([key, value]) => {
        define(target, key, value, flag);
    })
}