import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Navigation extends Vue {
  items = [
    { title: "Dashboard", icon: "mdi-view-dashboard" },
    { title: "Photos", icon: "mdi-image" },
    { title: "About", icon: "mdi-help-box" },
  ];
  right = null;

  drawer = true;
  group = null;
}
