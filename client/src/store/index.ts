import Vue from "vue";
import Vuex from "vuex";

import students from "./students";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    students,
  },
  strict: process.env.NODE_ENV !== "production",
});
