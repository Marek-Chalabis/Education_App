<template>
  <div id="app">
    <div>
      <!-- TODO style it after adding navbar -->
      <themeSwitcher />
      <b-container fluid>
        <b-row>
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
import questionView from "./components/questionView";
import themeSwitcher from "./components/themeSwitcher";

export default {
  name: "App",
  components: {
    questionView,
    themeSwitcher,
  },
};
</script>
