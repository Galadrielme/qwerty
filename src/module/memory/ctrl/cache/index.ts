/**
 * @version 1.0.0
 * @author galadrielme
 * @since 2020/7/2
 * @description MemoryCache控制逻辑
 * ┌────────────┬────────────┐
 * │            │            │
 * ├────────────┼────────────┤
 * │            │            │
 * └────────────┴────────────┘
 */
import ScopeMap from '../../utils/scopeMap';
import { PairObject } from '../../model/memory';

export type Key = any;
export type Value = any;

type MemoryInstance = Map<Key, Value>;
/**
 * @version 1.0.0
 * @author galadrielme
 * @since 2020/7/2
 * @description 存放作用域Map,只有在set和setPairObject时必然获取或创建一个新的Map对象,否则不创建不必要的Map对象;
 */
const SCOPE_MAP: ScopeMap<MemoryInstance> = new ScopeMap(() => new Map());
export default class MemoryCacheCtrl {
    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param scope 作用域 
     * @param key 键 
     */
    static get(scope: string, key: Key): Value {
        return SCOPE_MAP.has(scope) ? SCOPE_MAP.get(scope).get(key) : void 0;
    }
    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param scope 作用域 
     * @param key 键 
     * @param value 值 
     * @param instance Map实例 
     */
    static set(scope: string, key: Key, value: Value, instance: MemoryInstance = SCOPE_MAP.get(scope)) {
        instance.set(key, value);
    }
    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param scope 作用域 
     * @param pairs 
     * @param instance Map实例 
     */
    static setPairObject(scope: string, pairs: PairObject, instance: MemoryInstance = SCOPE_MAP.get(scope)): void {
        Object.entries(pairs).forEach(([key, value]) => this.set(scope, key, value, instance));
    }
    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param scope 作用域 
     * @param key 键 
     */
    static has(scope: string, key: Key): boolean {
        return SCOPE_MAP.has(scope) && SCOPE_MAP.get(scope).has(key);
    }
    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param scope 作用域 
     * @param key 键 
     */
    static delete(scope: string, key: Key): boolean {
        return SCOPE_MAP.has(scope) && SCOPE_MAP.get(scope).delete(key);
    }
    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param scope 作用域 
     * @description 清空作用域,此种情况下会之间删除作用域对应Map释放内存;建议在使用时根据存储所需情况进行清理
     */
    static clear(scope: string): void {
        SCOPE_MAP.delete(scope);
    }
    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param scope 作用域 
     * @description 获取键数组,此处不同于Map API,会将迭代器转化为数组,请谨慎使用
     */
    static keys(scope: string): Key[] {
        return SCOPE_MAP.has(scope) ? [...SCOPE_MAP.get(scope).keys()] : [];
    }
    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param scope 作用域 
     * @description 获取值数组,此处不同于Map API,会将迭代器转化为数组,请谨慎使用
     */
    static values(scope: string): Value[] {
        return SCOPE_MAP.has(scope) ? [...SCOPE_MAP.get(scope).values()] : [];
    }
    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param scope 作用域 
     * @description 获取键值对数组,此处不同于Map API,会将迭代器转化为数组,请谨慎使用
     */
    static entries(scope: string): [Key, Value][] {
        return SCOPE_MAP.has(scope) ? [...SCOPE_MAP.get(scope).entries()] : [];
    }
    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param scope 作用域 
     * @param callbackfn 回调函数
     * @param thisArg 回调函数的this对象
     */
    static forEach(scope: string, callbackfn: (value: Value, key: Key, map: Map<Key, Value>) => void, thisArg?: any): void {
        SCOPE_MAP.has(scope) && SCOPE_MAP.get(scope).forEach(callbackfn, thisArg);
    }
}