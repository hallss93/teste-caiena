<template>
  <v-app>
    <v-app-bar app color="deep-purple lighten-5" dark> </v-app-bar>
    <v-main>
      <v-snackbar v-model="show" :timeout="3000">
        {{ message }}
      </v-snackbar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { IStateStudent } from "@/store/students/state";

@Component({})
export default class App extends Vue {
  @State((state: IStateStudent) => state.students.showMessage)
  showMessage!: boolean;

  @State((state: IStateStudent) => state.students.message)
  message!: boolean;

  get show(): boolean {
    return this.showMessage;
  }
  set show(val) {
    console.log(val);
  }
}
</script>

<style lang="scss">
.body-light {
  margin-left: 260px;
  background-color: #f7f9fa !important;

  @media only screen and (max-width: 1264px) {
    margin-left: 0px;
  }
}
</style>
