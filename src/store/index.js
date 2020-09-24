import { auth } from "../firebase";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    register({ commit }, user) {
      auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((resp) => {
          const user = {
            email: resp.user.email,
            id: resp.user.uid,
          };
          commit("setUser", user);
        })
        .catch((err) => {
          commit("setError", err);
        });
    },
  },
  modules: {},
});
