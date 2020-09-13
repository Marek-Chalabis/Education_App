<template>
  <label class="text-reader">
    <input type="file" multiple="multiple" @change="loadTextFromFile" />
  </label>
</template>

<script>
import store from "@/store";
export default {
  methods: {
    loadTextFromFile(ev) {
      const complete_file = {};
      const files = ev.target.files;

      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e) => this.$emit("load", e.target.result);
        reader.readAsText(file);

        reader.onload = (fileObject) => {
          let questionsInJSON = this.convertJSONtoTXT(fileObject.target.result);
          complete_file[file.name.replace(".txt", "")] = questionsInJSON;
        };
      }
      store.commit("changeQuestions", complete_file);
      console.log("PO zmienia", store.state.questionsFromTxtFile);
    },
    convertJSONtoTXT(data) {
      const listQuestions = [];
      const regEx = /[0-9]{1,3}. /;
      const array = data.split(regEx);

      for (const topic of array) {
        const [question, ...answer_to_format] = topic.split("\n");
        const answer = answer_to_format
          .filter((chunk) => chunk != "")
          .join("\n");
        if (question !== "" && answer !== "")
          listQuestions.push({
            question: question,
            answer: answer,
          });
      }
      return listQuestions;
    },
  },
};
</script>
