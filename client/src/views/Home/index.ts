import { Component, Vue } from "vue-property-decorator";
import Navigation from "../../components/Navigation/index.vue";
import { State } from "vuex-class";
import { IStateStudent } from "@/store/students/state";

@Component({
  components: {
    Navigation,
  },
})
export default class Home extends Vue {
  @State((state: IStateStudent) => state.students.loading) loading!: boolean;
}
