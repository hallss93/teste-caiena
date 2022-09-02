import { IStudentStore, IStudent } from "./state";

export default {
  SET_STUDENT(state: IStudentStore, payload: IStudent): void {
    state.student = payload;
  },
  SET_STUDENT_LIST(state: IStudentStore, payload: IStudent[]): void {
    state.studentList = payload;
  },
  SET_STUDENT_COUNT(state: IStudentStore, payload: number): void {
    state.count = payload;
  },
  SET_LOADING(state: IStudentStore, payload: boolean): void {
    state.loading = payload;
  },
  SET_MESSAGE(state: IStudentStore, payload: string): void {
    state.message = payload;
  },
  SET_SHOW_MESSAGE(state: IStudentStore, payload: boolean): void {
    state.showMessage = payload;
  },
};
