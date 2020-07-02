/**
 * @version 1.0.0
 * @author galadrielme
 * @since 2020/7/2
 * @description
 */

import Memory, { PairObject, scopeSymbel } from '../memory';
import MemoryCacheCtrl, { Key, Value } from '../../ctrl/cache';
import Able from '../../utils/able';
import { MemoryLabelEnum } from '../index'

type K = Key;
type V = Value;

/**
 * @version 1.0.0
 * @author galadrielme
 * @since 2020/7/2
 * @description 缓存存储,使用Map实现
 */
export class MemoryCache extends Memory<K, V>{
    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param key 
     */
    get(key: K): V {
        return MemoryCacheCtrl.get(this[scopeSymbel], key);
    }

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param key 
     * @param value 
     * @description
     */
    set(key: K, value: V): V;
    set(pairs: PairObject): void;
    set(key: K | PairObject, value?: V): void {
        switch (arguments.length) {
            case 1: return MemoryCacheCtrl.setPairObject(this[scopeSymbel], key);
            case 2: return MemoryCacheCtrl.set(this[scopeSymbel], key, value);
        }
    }

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param key 
     */
    has(key: K): boolean {
        return MemoryCacheCtrl.has(this[scopeSymbel], key);
    }

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param key 
     */
    delete(key: K): boolean {
        return MemoryCacheCtrl.delete(this[scopeSymbel], key);
    }

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     */
    clear(): void {
        MemoryCacheCtrl.clear(this[scopeSymbel]);
    }

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     */
    keys(): K[] {
        return MemoryCacheCtrl.keys(this[scopeSymbel]);
    }

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     */
    values(): V[] {
        return MemoryCacheCtrl.values(this[scopeSymbel]);
    }

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     */
    entries(): [K, V][] {
        return MemoryCacheCtrl.entries(this[scopeSymbel]);
    }

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param callbackfn 回调函数
     * @param thisArg 回调函数的this对象
     * @description 获取键值对数组
     */
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        MemoryCacheCtrl.forEach(this[scopeSymbel], callbackfn, thisArg);
    }


    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @description 都是true,不存在兼容问题
     */
    get able() { return Able[MemoryLabelEnum.CACHE] }

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @description 都是true,不存在兼容问题
     */
    static get able() { return Able[MemoryLabelEnum.CACHE] }
}