export default class Pool {
  private resources: Record<string, any> = {};

  public get<T>(key: string, factory: () => T): T {
    if (!this.resources[key]) {
      this.resources[key] = factory();
    }

    return this.resources[key] as T;
  }
}
