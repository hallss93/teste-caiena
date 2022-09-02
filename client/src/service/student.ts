/* eslint-disable @typescript-eslint/no-explicit-any*/
import { IStudent } from "@/store/students/state";
import api from "./index";
import params from "./params";
import URL from "./URLs";
export default {
  getStudents: async ({
    query,
    page,
    limit,
    sortBy,
    sortDesc,
  }: {
    query: string;
    page: number;
    limit: number;
    sortBy: string;
    sortDesc: boolean;
  }): Promise<any> => {
    return await api.get(
      `${URL.STUDENT}/${params.toParamns([
        { query, page, limit, sortBy, sortDesc },
      ])}`
    );
  },

  getStudent: async ({ ra }: { ra: number }): Promise<any> => {
    return await api.get(`${URL.STUDENT}/${ra}`);
  },

  create: async ({ student }: { student: IStudent }): Promise<any> => {
    return await api.post(`${URL.STUDENT}`, student);
  },

  update: async ({
    student,
    ra,
  }: {
    student: IStudent;
    ra: number;
  }): Promise<any> => {
    return await api.put(`${URL.STUDENT}/${ra}`, student);
  },

  delete: async ({ ra }: { ra: number }): Promise<any> => {
    return await api.delete(`${URL.STUDENT}/${ra}`);
  },
};
