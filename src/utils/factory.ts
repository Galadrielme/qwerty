export default function* createFactory<T>(factoryFunction: () => T): Generator<T, void, unknown> {
    while (1) yield factoryFunction();
}