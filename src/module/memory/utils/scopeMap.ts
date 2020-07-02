/**
 * 根据作用域管理存储工具缓存
 */
import createFactory from '../../../utils/factory';
export default class ScopeMap<M> {
    private cache: Map<string, M> = new Map();
    private factory !: Generator<M, void, unknown>;
    constructor(factoryFunction: () => M) {
        this.factory = createFactory(factoryFunction);
    }
    /**
     * 根据作用域获取存储工具
     * @param scope 作用域
     */
    get(scope: string): M {
        let { cache } = this;
        // 如果缓存中存在该scope,则从缓存中返回该scope对应之Map
        if (cache.has(scope)) return <M>cache.get(scope);

        // 如果缓存中不存在该scope,则创建一个Map,并加入缓存,并返回之
        let map: M = <M>this.factory.next().value;
        cache.set(scope, map);
        return map;
    }
    /**
     * 判断改作用域是否参在缓存实例
     * @param scope 作用域
     */
    has(scope: string): boolean {
        return this.cache.has(scope);
    }
    /**
     * 废弃该scope对应之存储工具
     * @param scope 作用域
     */
    delete(scope: string): void {
        this.cache.delete(scope);
    }
    /**
     * 获取存在的scope迭代器
     */
    keys(): IterableIterator<string> {
        return this.cache.keys();
    }
}