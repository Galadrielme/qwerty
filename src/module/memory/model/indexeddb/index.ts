import Memory, { PairObject } from '@galadrielme/qwerty-ui/src/module/memory/model/memory';
import Able from '../../utils/able';

type K = string | number;
type V = any;

export class MemoryIndexedDB extends Memory<K, V>{
    get(key: K): V {
        return '';
    }
    set(key: K, value: V): V;
    set(pairs: PairObject): void;
    set(key: K | PairObject, value?: V): void {
        switch (arguments.length) {
            case 1: return;
            case 2: return;
        }
    }
    has(key: K): boolean {
        return false
    }
    delete(key: K): boolean {
        return false;
    }
    clear(): void {
    }
    keys(): K[] {
        return [];
    }
    values(): V[] {
        return []
    }
    entries(): [K, V][] {
        return [];
    }
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {

    }
    get able(): boolean {
        return Able.indexedDB;
    }
    static get able(): boolean {
        return Able.indexedDB;
    }
}