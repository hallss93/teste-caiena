export interface Constructor<T = Object> extends Function {
  readonly prototype: T;
  new (...args: Array<any>): T;
}

export type Func1<T1, TResult> = (arg: T1) => TResult;
export type Func2<T1, T2, TResult> = (arg1: T1, arg2: T2) => TResult;
export type Func3<T1, T2, T3, TResult> = (
  arg1: T1,
  arg2: T2,
  arg3: T3
) => TResult;
export type Func<TResult> = () => TResult;
export type Nullable<T = Object> = T | null | undefined;
