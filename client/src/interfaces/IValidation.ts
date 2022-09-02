import { Func1, Nullable } from "./types";

// tslint:disable-next-line:max-line-length
export default interface IValidationRules<T extends number | string = string>
  extends Record<string, Array<Func1<Nullable<T>, boolean | string>>> {}
