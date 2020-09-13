<template>
  <div>
    <b-jumbotron
      bg-variant="rgb(80, 69, 65)"
      text-variant="white"
      border-variant="dark"
    >
      <div>
        <b-container class="bv-example-row">
          <b-row class="text-center">
            <b-col>
              <div>
                <b-jumbotron>
                  <template v-slot:header>
                    <div v-if="currentQuestion.question === ''">
                      Upload your txt files and click 'Start'
                    </div>
                    <div v-else>{{ currentQuestion.question }}</div>
                  </template>

                  <template v-slot:lead>
                    <!-- TODO dodać wybór użytkownika czy ma być ukazana kategoria -->
                    <div v-if="currentQuestion.question !== ''">
                      Category: {{ currentQuestion.category }}
                    </div>
                  </template>

                  <hr class="my-4" />

                  <div v-if="displayAnswer === true" id="answer">
                    <p style="padding: 5px;">{{ currentQuestion.answer }}</p>
                  </div>

                  <div v-if="!errorNoFileUpload">
                    {{ errorNoFileUpload }}
                  </div>
                  <b-button
                    variant="primary"
                    size="lg"
                    :disabled="
                      currentQuestion.question === '' || displayAnswer === true
                    "
                    @click="showAnswer"
                    >Answer</b-button
                  >

                  <b-button
                    variant="success"
                    size="lg"
                    @click="showNextQuestion"
                  >
                    <div v-if="currentQuestion.question === ''">
                      Start
                    </div>
                    <div v-else>Next</div>
                  </b-button>
                </b-jumbotron>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
import store from "@/store";
export default {
  //TODO dodać vuex i polączyć  ze sobą
  data() {
    return {
      currentQuestion: {
        category: "",
        question: "",
        answer: "",
      },
      displayAnswer: false,
      errorNoFileUpload: "",
    };
  },
  methods: {
    showNextQuestion() {
      this.displayAnswer = false;
      const questions = store.state.questionsFromTxtFile;
      const randomCategory = Object.keys(questions)[
        Math.floor(Math.random() * Object.keys(questions).length)
      ];

      const randomQuestion =
        questions[randomCategory][
          Math.floor(Math.random() * questions[randomCategory].length)
        ];

      this.currentQuestion = {
        category: randomCategory,
        question: randomQuestion.question,
        answer: randomQuestion.answer,
      };
    },
    showAnswer() {
      this.displayAnswer = true;
    },
  },
  // this.answer = 'Waiting for you to stop typing...'
  // this.debouncedGetAnswer()
  // TODO tutaj dać questions aby po każdym wczyatniu nowej listy plikow odswierzyć questions JESLI będzie zmiana zalezy od rozwou 1:25, można to przerobić na obiekt co pozwala pododawć różne defultowe metody jak np uruchemenie tego podcas wczytania strony

  // TODO mounted pozwala na uruchamianie funkcjii podczas załadujnku strony
};
</script>

<style>
#answer {
  border: 1px solid;
  text-align: left;
}
</style>
