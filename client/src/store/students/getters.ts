import { Nullable } from "@/interfaces/types"
import { IStudentStore, IStudent } from "./state";

export default {
    STUDENT_LIST: (state: IStudentStore): Nullable<IStudent[]> => {
        return state.studentList
    },
    LOADING: (state: IStudentStore): boolean => {
        return state.loading
    }
}