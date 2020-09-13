<template>
  <div id="app">
    <div>
      <b-container fluid class="bv-example-row">
        <b-row class="text-center">
          <b-col></b-col>
          <b-col cols="8">
            <questionView />
          </b-col>
          <b-col>
            <FileReader />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-button block variant="primary">Setingi</b-button>
  </div>
</template>

<script>
import questionView from "./components/questionView.vue";
// import getAllQuestions from "./assets/convertTxt.js";
import FileReader from "./components/fileReader";
export default {
  name: "App",
  //TODO dodać vuex i polączyć to ze sobą
  data() {
    return {
      text: "", // wywalic
    };
  },
  components: {
    FileReader,
    questionView,
  },
};
// mounted: function () {
//   let questions = getAllQuestions(
//     "/home/zulaber/Desktop/Education_App/education_app/src/assets"
//   );
//   console.log(questions);
// },
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background-color: coral;
}
</style>
