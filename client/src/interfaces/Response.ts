export interface IPaginationStudents<U> {
  students: {
    rows: U;
    count: number;
  };
}

export default interface ResponseAPI<T> {
  code: number;
  data: T;
  success: boolean;
}
