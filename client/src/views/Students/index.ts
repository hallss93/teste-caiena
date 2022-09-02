import moment from "moment";
import ResponseAPI from "@/interfaces/Response";
import { IPaginationStudents } from "@/interfaces/Response";
import { Nullable } from "@/interfaces/types";
import { IStateStudent, IStudent } from "@/store/students/state";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, State } from "vuex-class";
@Component({
  filters: {
    formatDate(value: string): string {
      return value ? moment(String(value)).format("MM/DD/YYYY hh:mm") : value;
    },
  },
})
export default class Students extends Vue {
  @Action("students/GET_STUDENTS")
  getStudents!: ({
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
  }) => ResponseAPI<IPaginationStudents<IStudent[]>>;

  @State((state: IStateStudent) => state.students.studentList)
  studentList!: IStudent[];

  @State((state: IStateStudent) => state.students.count)
  count!: number;

  @Action("students/DELETE")
  deleteOne!: ({ ra }: { ra: number }) => ResponseAPI<IStudent>;

  @Watch("studentList")
  watchstudentList(): void {
    this.requering = false;
    this.list = this.studentList;
  }

  @Watch("search")
  watchSearch(): void {
    this.getList();
  }

  @Watch("sortBy")
  watchSortBy(): void {
    this.getList();
  }

  @Watch("sortDesc")
  watchSortDesc(): void {
    this.getList();
  }

  @Watch("count")
  watchCount(value: number): void {
    this.pagination.itemsLength = value;
  }

  list: IStudent[] = [];
  sortBy = "ra";
  sortDesc = true;
  dialogDeleteShow = false;
  student: Nullable<IStudent> = null;
  search = "";
  size = 5;
  page = 1;
  pagination = {
    itemsLength: this.count,
    page: this.page,
    itemsPerPage: this.size,
  };
  headers = [
    {
      text: "Registro Acadêmico",
      align: "center",
      sortable: true,
      value: "ra",
    },

    {
      text: "Nome",
      align: "center",
      sortable: true,
      value: "name",
    },

    {
      text: "CPF",
      align: "center",
      sortable: true,
      value: "cpf",
    },

    {
      text: "Ações",
      align: "center",
      sortable: false,
      value: "actions",
    },
  ];
  requering = false;
  dialog = false;
  itemEdit: Nullable<IStudent> = null;

  getList(): void {
    this.getStudents({
      page: this.pagination.page,
      limit: this.pagination.itemsPerPage,
      query: this.search.trim(),
      sortBy: this.sortBy,
      sortDesc: this.sortDesc,
    });
    if (
      this.$route.query &&
      this.$route.query.page &&
      Number(this.$route.query.page) != this.page
    ) {
      this.$router.push({ path: "/", query: { page: String(this.page) } });
    }
  }

  openEditMode(item: IStudent): void {
    this.$router.push(`student/${item.ra}`);
  }

  openDeleteMode(item: IStudent): void {
    this.student = item;
    this.dialogDeleteShow = true;
  }

  async deleteStudent(): Promise<void> {
    try {
      const { success } = await this.deleteOne({
        ra: Number(this.student?.ra),
      });
      if (success) {
        this.dialogDeleteShow = false;
        this.getList();
      }
    } catch (e) {
      this.dialogDeleteShow = false;
    }
  }

  updateSortBy(value: string): void {
    this.sortBy = value;
  }

  updateSortDesc(value: boolean): void {
    this.sortDesc = value;
  }

  watchPagination(value: {
    itemsLength: number;
    itemsPerPage: number;
    page: number;
    pageCount: number;
    pageStart: number;
    pageStop: number;
  }): void {
    console.log(value);
    this.page = value.page;
    this.size = value.itemsPerPage;
    this.getList();
  }

  created(): void {
    const query = this.$route.query;
    if (query && query.page) {
      this.page = Number(query.page);
      this.pagination = {
        itemsLength: this.count,
        page: this.page,
        itemsPerPage: this.size * this.page,
      };
    } else {
      this.getList();
    }
  }
}
