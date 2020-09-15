<template>
  <div>
    <b-form-file
      v-model="files"
      multiple
      accept=".txt, .json"
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
    async readFiles(file) {
      const fullFileResult = await new Promise((resolve) => {
        const fileReader = new FileReader();

        fileReader.onload = (fileOpen) => {
          if (file.name.endsWith(".txt")) {
            let returnObject = {};
            const questionsInJSON = this.convertTxtFileToJsonObject(
              fileOpen.target.result
            );
            const category = file.name.replace(".txt", "");
            returnObject[category] = questionsInJSON;
            resolve(returnObject);
          } else if (file.name.endsWith(".json"))
            resolve(JSON.parse(fileOpen.target.result));
        };
        fileReader.readAsText(file);
      });
      return fullFileResult;
    },
    async loadTextFromFile() {
      let promiseArray = [];

      for (let file of this.files) {
        promiseArray.push(this.readFiles(file));
      }
      let stop = Promise.all(promiseArray).then((values) => {
        let allQuestions = {};

        for (let result of values)
          allQuestions = { ...result, ...allQuestions };
        this.changeQuestionsFromTxtToJson(allQuestions);
      });
      await stop;
    },
    convertTxtFileToJsonObject(data) {
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
