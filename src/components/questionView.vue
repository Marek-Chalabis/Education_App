<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col>
          <div>
            <b-jumbotron class="jumbotronForQuestions">
              <template v-slot:header>
                <div class="jumbotronForQuestionsHeader">
                  <div v-if="currentQuestion.question === ''">
                    Upload your txt files and click 'Start'
                  </div>
                  <div v-else>{{ currentQuestion.question }}</div>
                </div>
              </template>

              <div v-if="currentQuestion.question === ''">
                <br />
                <FileReader />
              </div>

              <template v-slot:lead>
                <div v-if="currentQuestion.question !== ''">
                  Category: {{ currentQuestion.category }}
                </div>
              </template>

              <hr class="my-4" />

              <div v-if="displayAnswer === true" id="answer">
                {{ currentQuestion.answer }}
              </div>

              <b-button
                variant="btnColorForAnswer"
                size="lg"
                class="mr-5"
                :disabled="
                  currentQuestion.question === '' || displayAnswer === true
                "
                @click="showAnswer"
                >Answer</b-button
              >

              <b-button
                variant="btnColorForStartAndNext"
                size="lg"
                @click="showNextQuestion"
              >
                <div v-if="currentQuestion.question === ''">Start</div>
                <div v-else>Next</div>
              </b-button>
            </b-jumbotron>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FileReader from "./fileReader";

export default {
  data() {
    return {
      currentQuestion: {
        category: "",
        question: "",
        answer: "",
      },
      displayAnswer: false,
    };
  },
  components: {
    FileReader,
  },
  computed: {
    ...mapState(["questionsFromTxtFileInJsonFormat"]),
  },
  methods: {
    showNextQuestion() {
      // TODO add check for empty currentQuestion and show error
      this.displayAnswer = false;
      const questions = this.questionsFromTxtFileInJsonFormat;

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
};
</script>
