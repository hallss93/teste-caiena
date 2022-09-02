import moment from "moment";
import ResponseAPI from "@/interfaces/Response";
import { Nullable } from "@/interfaces/types";
import { IStudent, IStateStudent } from "@/store/students/state";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, State } from "vuex-class";

import IValidationRules from "@/interfaces/IValidation";
import IValidable from "@/interfaces/IValidable";
import { isValidCPF } from "../../utils/isValidCPF";

@Component({
  filters: {
    formatDate(value: string): string {
      return value ? moment(String(value)).format("MM/DD/YYYY hh:mm") : value;
    },
    formatName(value: string): string {
      return value;
    },
  },
})
export default class Students extends Vue {
  id = 0;
  name = "";
  email = "";
  ra: Nullable<string> = "";
  cpf = "";
  rules: IValidationRules<string> = {
    name: [
      (v: Nullable<string>): boolean | string => {
        return !!v || `Name is required.`;
      },
    ],
    email: [
      (v: Nullable<string>): boolean | string => {
        return !!v || `E-mail is required.`;
      },

      (v: Nullable<string>): boolean | string => {
        return /.+@.+/.test(v || "") || `E-mail is invalid.`;
      },
    ],
    ra: [
      (v: Nullable<string>): boolean | string => {
        return !!v || `RA is required.`;
      },
    ],
    cpf: [
      (v: Nullable<string>): boolean | string => {
        return !!v || `CPF is required.`;
      },
      (v: Nullable<string>): boolean | string => {
        return isValidCPF(v || "") || `CPF is invalid.`;
      },
    ],
  };

  @Action("students/CREATE")
  create!: ({ student }: { student: IStudent }) => ResponseAPI<IStudent>;

  @Action("students/UPDATE")
  update!: ({
    student,
    ra,
  }: {
    student: IStudent;
    ra: Nullable<number>;
  }) => ResponseAPI<IStudent>;

  @Action("students/GET_STUDENT")
  getStudent!: ({ ra }: { ra: number }) => ResponseAPI<IStudent>;

  @State((state: IStateStudent) => state.students.student)
  student!: IStudent;

  @Watch("student")
  watchStudent(student: IStudent): void {
    this.name = student.name;
    this.email = student.email;
    this.ra = String(student.ra || "");
    this.cpf = student.cpf;
  }

  async save(): Promise<void> {
    const valid = await (this.$refs.form as IValidable).validate();
    if (valid) {
      if (this.id && this.id !== 0) {
        const { success } = await this.update({
          ra: Number(this.ra),
          student: {
            name: this.name,
            email: this.email,
            ra: String(this.ra),
            cpf: this.cpf,
          },
        });
        if (success) {
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        }
      } else {
        const { success } = await this.create({
          student: {
            name: this.name,
            email: this.email,
            ra: String(this.ra),
            cpf: this.cpf,
          },
        });
        if (success) {
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        }
      }
    }
  }

  created(): void {
    if (this.$route.params.ra) {
      this.id = Number(this.$route.params.ra);
      const ra = this.id;
      this.getStudent({ ra });
    }
  }
}
