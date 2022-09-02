import { Nullable } from "@/interfaces/types"

export interface IStudentStore {
    studentList: Nullable<IStudent[]>;
    student: Nullable<IStudent>;
    count: number;
    loading: boolean;
    message: string;
    showMessage: boolean;
}

export interface IStudent {
    name: string;
    email: string;
    ra: string;
    cpf: string;
}

const state: IStudentStore = {
    studentList: [],
    student: null,
    count: 0,
    loading: false,
    message: '',
    showMessage: false,
}

export interface IStateStudent {
    students: IStudentStore;
}

export default state
