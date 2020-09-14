import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questionsFromTxtFileInJsonFormat: {},
  },
  actions: {
    changeQuestionsFromTxtToJson: ({
      commit
    }, newQuestions) => {
      commit("ReplaceJsonQuestion", newQuestions);
    },
  },
  mutations: {
    ReplaceJsonQuestion: (state, newQuestions) => {
      state.questionsFromTxtFileInJsonFormat = newQuestions;
    },
  },
});