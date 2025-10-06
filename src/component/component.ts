export default interface Component {}

export type ComponentClass<T extends Component> = new (...args: any) => T;
