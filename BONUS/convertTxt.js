"use strict";
const fs = require("fs");
const path = require('path');
/**
 *
 *
 * @param {string} folderWithFiles
 * @return {JSON}: JSON with questions
 */
const getAllQuestions = async (folderWithFiles) => {
  let arrayWithPromises = [];
  let complete_file = {};

  let txtFiles = fs.readdirSync(folderWithFiles).filter((file) => {
    return file.endsWith(".txt");
  });

  for (let filename of txtFiles) {
    let questionsAndAnswers = [];

    let promise = new Promise((resolve, reject) => {
      fs.readFile(path.join(folderWithFiles, filename), "utf8", (err, data) => {
        let regEx = /[0-9]{1,3}. /;
        let array = data.split(regEx);

        for (let topic of array) {
          let [question, ...answer_to_format] = topic.split("\n");
          let answer = answer_to_format
            .filter((chunk) => chunk != "")
            .join("\n");
          if (question !== '' && answer !== '')
            questionsAndAnswers.push({
              question: question,
              answer: answer
            });
        }
        complete_file[filename.replace('.txt', '')] = questionsAndAnswers;
        resolve(complete_file);
      });
    });
    arrayWithPromises.push(promise);
  }
  let allQuestions = '';
  let allPromises = Promise.all(arrayWithPromises).then((values) => {
    allQuestions = values[0];
  });

  await allPromises;

  return allQuestions;
}

module.exports = getAllQuestions;