import { MemoryLabelEnum } from '../model'

export default {
    [MemoryLabelEnum.DB]: (() => {
        return false;
    })(),
    [MemoryLabelEnum.SQL]: (() => {
        return false;
    })(),
    [MemoryLabelEnum.LOCAL]: (() => {
        return typeof localStorage !== 'object'
    })(),
    [MemoryLabelEnum.SESSION]: (() => {
        return typeof sessionStorage !== 'object'
    })(),
    [MemoryLabelEnum.CACHE]: true
}