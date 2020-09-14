<template>
  <div id="app">
    <div>
      <b-container fluid class="bv-example-row">
        <b-row class="text-center">
          <b-col></b-col>
          <b-col cols="8">
            <questionView />
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import questionView from "./components/questionView.vue";

export default {
  name: "App",
  components: {
    questionView,
  },
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
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
