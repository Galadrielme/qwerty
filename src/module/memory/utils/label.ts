import { MemoryLabelEnum } from '../model';

let MemoryLabelSet: Set<string> = new Set([MemoryLabelEnum.CACHE, MemoryLabelEnum.DB, MemoryLabelEnum.LOCAL, MemoryLabelEnum.SESSION, MemoryLabelEnum.SQL]);
export function valid(label: string): boolean {
    return MemoryLabelSet.has(label);
}

export function autoLabel(): MemoryLabelEnum {
    return MemoryLabelEnum.CACHE;
}

export function getLabel(label?: string, def?: MemoryLabelEnum): MemoryLabelEnum {
    if (label == void 0) return autoLabel();
    if (valid(label)) return <MemoryLabelEnum>label;
    return def && valid(<string>def) ? def : MemoryLabelEnum.CACHE;
}