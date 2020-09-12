<template>
  <div>
    <b-jumbotron bg-variant="rgb(80, 69, 65)" text-variant="white" border-variant="dark">
      <div>
        <b-container class="bv-example-row">
          <b-row class="text-center">
            <b-col>
              <div>
                <b-jumbotron>
                  <template v-slot:header>{{currentQuestion}}</template>

                  <template v-slot:lead>
                    <!-- TODO Here add user choose for showing category -->
                    <div v-if="currentQuestion !== '' ">Category:{{currentAnswer}}</div>
                  </template>

                  <hr class="my-4" />

                  <p style="border: 1px solid; height:250px;">{{currentAnswer}}</p>

                  <b-container fluid class="bv-example-row">
                    <b-row class="text-center">
                      <b-col>
                        <b-button
                          variant="primary"
                          href="#"
                          size="lg"
                          :disabled="currentQuestion === '' || currentAnswer !== ''"
                        >Answer</b-button>
                      </b-col>
                      <b-col>
                        <b-button variant="success" href="#" size="lg">
                          <div v-if="currentQuestion === ''">Start</div>
                          <div v-else>Next</div>
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-container>
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
export default {
  //TODO dodać vuex i polączyć  ze sobą
  data() {
    return {
      questions: [
        { question: "A1-Qestion", answer: "A1-ODP" },
        { question: "A2-Qestion", answer: "A2-ODP" },
        { question: "A2-Qestion", answer: "A2-ODP" },
      ],
      currentQuestion: "",
      currentAnswer: "",
      currentKategory: "",
    };
  },
};
</script>
