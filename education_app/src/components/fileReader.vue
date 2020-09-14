<template>
  <div>
    <b-form-file
      v-model="files"
      multiple
      accept=".txt"
      size="lg"
      :state="Boolean(files)"
      placeholder="Choose a files or drop it here..."
      drop-placeholder="Drop files here..."
    ></b-form-file>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      files: null,
    };
  },
  methods: {
    ...mapActions(["changeQuestionsFromTxtToJson"]),
    loadTextFromFile() {
      const complete_file = {};

      for (let file of this.files) {
        const reader = new FileReader();
        reader.onload = (e) => this.$emit("load", e.target.result);
        reader.readAsText(file);

        reader.onload = (fileObject) => {
          let questionsInJSON = this.convertJSONtoTXT(fileObject.target.result);
          complete_file[file.name.replace(".txt", "")] = questionsInJSON;
        };
      }
      this.changeQuestionsFromTxtToJson(complete_file);
    },
    convertJSONtoTXT(data) {
      const listQuestions = [];
      const regEx = /0*[1-9][0-9]*. /;
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
  watch: {
    files: function () {
      this.loadTextFromFile();
    },
  },
};
</script>
