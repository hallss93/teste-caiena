import { Func2 } from "@/interfaces/types";
import studentService from "../../service/student";
import { IStudent } from "./state";
export default {
  async GET_STUDENTS(
    { commit }: { commit: Func2<string, boolean | IStudent | number, void> },
    {
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
    }
  ): Promise<void> {
    commit("SET_LOADING", true);
    return studentService
      .getStudents({
        query,
        page,
        limit,
        sortBy,
        sortDesc,
      })
      .then((res) => {
        commit("SET_STUDENT_COUNT", res.data.data.students.count);
        commit("SET_STUDENT_LIST", res.data.data.students.rows);
        return res.data;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        commit("SET_LOADING", false);
      });
  },

  async GET_STUDENT(
    { commit }: { commit: Func2<string, boolean | IStudent, void> },
    { ra }: { ra: number }
  ): Promise<void> {
    commit("SET_LOADING", true);
    return studentService
      .getStudent({ ra })
      .then((res) => {
        commit("SET_STUDENT", res.data.data);
        return res.data;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        commit("SET_LOADING", false);
      });
  },

  async CREATE(
    { commit }: { commit: Func2<string, boolean | string, void> },
    { student }: { student: IStudent }
  ): Promise<void> {
    commit("SET_LOADING", true);
    return studentService
      .create({ student })
      .then((res) => {
        commit("SET_MESSAGE", "Estudante adicionado com sucesso!");
        commit("SET_SHOW_MESSAGE", true);
        return res.data;
      })
      .catch((err) => {
        commit("SET_MESSAGE", err);
        commit("SET_SHOW_MESSAGE", true);
        return err;
      })
      .finally(() => {
        commit("SET_LOADING", false);
      });
  },

  async UPDATE(
    { commit }: { commit: Func2<string, boolean | string, void> },
    { student, ra }: { student: IStudent; ra: number }
  ): Promise<void> {
    commit("SET_LOADING", true);
    return studentService
      .update({ student, ra })
      .then((res) => {
        commit("SET_MESSAGE", "Estudante atualizado com sucesso!");
        commit("SET_SHOW_MESSAGE", true);
        return res.data;
      })
      .catch((err) => {
        commit("SET_MESSAGE", err);
        commit("SET_SHOW_MESSAGE", true);
        return err;
      })
      .finally(() => {
        commit("SET_LOADING", false);
      });
  },

  async DELETE(
    { commit }: { commit: Func2<string, boolean | string, void> },
    { ra }: { ra: number }
  ): Promise<void> {
    commit("SET_LOADING", true);
    return studentService
      .delete({ ra })
      .then((res) => {
        commit("SET_MESSAGE", "Estudante excluido com sucesso!");
        commit("SET_SHOW_MESSAGE", true);
        return res.data;
      })
      .catch((err) => {
        commit("SET_MESSAGE", err);
        commit("SET_SHOW_MESSAGE", true);
        return err;
      })
      .finally(() => {
        commit("SET_LOADING", false);
      });
  },
};
