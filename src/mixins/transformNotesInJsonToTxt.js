export default {
  methods: {
    transformNotesInJsonToTxt(fileInJson) {
      const fileAsObject = JSON.parse(fileInJson);
      const category = Object.keys(fileAsObject)[0];
      const questions = fileAsObject[category];
      let stringToTxt = "";

      stringToTxt = category + "\n\n";
      for (let i = 0; i < questions.length; i++) {
        stringToTxt += `${i + 1}. ${questions[i].question}\n\n${
          questions[i].question
        }\n\n`;
      }
      return stringToTxt;
    },
  },
};
