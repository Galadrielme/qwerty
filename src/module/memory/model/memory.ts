/**
 * @version 1.0.0
 * @author galadrielme
 * @since 2020/7/2
 * @description 参考Map API 但并不完全等同
 */

import { defines, DEFINE_CONFIG } from '../../../utils/define';
import { MemoryConfig } from '../config';
import { MemoryLabelEnum } from './index'

export type PairObject = { [key: string]: any };

/**
 * @version 1.0.0
 * @author galadrielme
 * @since 2020/7/2
 * @description 存储label值的unique symbol
 */
export const labelSymbel: unique symbol = Symbol();

/**
 * @version 1.0.0
 * @author galadrielme
 * @since 2020/7/2
 * @description 存储scope值的unique symbol
 */
export const scopeSymbel: unique symbol = Symbol();

/**
 * @version 1.0.0
 * @author galadrielme
 * @since 2020/7/2
 * @abstract
 * @description 存储工具抽象类,需要被继承实现
 */
export default abstract class Memory<K, V = any>{

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @readonly
     * @description 存放存储工具的label
     */
    [labelSymbel]!: MemoryLabelEnum;

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @readonly
     * @description 初始化时定义
     */
    [scopeSymbel]!: string;

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param param MemoryConfig
     * @description 构造函数用于定义label和scope
     */
    constructor({ label, scope }: MemoryConfig) {
        defines(this, {
            [labelSymbel]: label,
            [scopeSymbel]: scope
        }, DEFINE_CONFIG.UNENUMERABLE | DEFINE_CONFIG.UNCONFIGURABLE | DEFINE_CONFIG.SETTER)
    }

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @abstract
     * @param key
     * @description 取值
     */
    abstract get(key: K): V;

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @abstract
     * @param key 键
     * @param value 值
     * @description 设置值
     */
    abstract set(key: K, value: V): V;

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @abstract
     * @param pairs 键值对对象
     * @description 设置键值对
     */
    abstract set(pairs: PairObject): void;

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @abstract
     * @param key 键
     * @description 判断是否包含键
     */
    abstract has(key: K): boolean;

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @abstract
     * @param key 键
     * @description 删除键对应数据
     */
    abstract delete(key: K): boolean;

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @abstract
     * @description 删除所有数据
     */
    abstract clear(): void;

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @abstract
     * @description 获取键数组
     */
    abstract keys(): K[];

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @abstract
     * @description 获取值数组
     */
    abstract values(): V[];

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @abstract
     * @description 获取键值对数组
     */
    abstract entries(): [K, V][];

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @param callbackfn 回调函数
     * @param thisArg 回调函数的this对象
     * @description 获取键值对数组
     */
    abstract forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @abstract
     * @description 将数据生成对象,对于存在 string | number 之外的键,会存在问题,不同类型的键之间也会存在覆盖的风险,慎用!!!
     */
    toObject(): object {
        return Object.fromEntries(this.entries());
    }
    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @abstract
     * @description 将数据生成Map对象,相对于toObject，toMap是安全的
     */
    toMap(): Map<K, V> {
        return new Map(this.entries());
    }

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @description 获取size
     */
    get size(): number {
        return this.keys().length;
    }

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @description 判断该存储工具是否可用
     */
    abstract get able(): boolean;

    /**
     * @version 1.0.0
     * @author galadrielme
     * @since 2020/7/2
     * @description 判断该存储工具是否可用
     */
    static get able() { return false }
};