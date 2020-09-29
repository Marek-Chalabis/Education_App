<template>
  <div>
    <b-button variant="primary" v-b-modal.notesPopup>Create notes</b-button>

    <b-modal
      scrollable
      id="notesPopup"
      title="Create notes"
      size="lg"
      button-size="lg"
      :no-close-on-esc="true"
      :no-close-on-backdrop="true"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Category">
          <b-form-input
            v-model="category"
            :state="categoryState"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="categoryState">
            {{ this.cateogryValidationInfo }}
          </b-form-invalid-feedback>

          <br />

          <div
            class="singleQuestion"
            v-for="(question, counter) in allQuestions"
            v-bind:key="counter"
          >
            <div class="questionNumber">
              <b>{{ counter + 1 }}</b> QUESTION
              <span @click="deleteQuestion(counter)">x</span>
            </div>

            <b-form-group label="Question" label-for="question">
              <b-form-input
                v-model.lazy="allQuestions[counter].question"
                :state="allQuestions[counter].questionState"
                required
              ></b-form-input>
              <b-form-invalid-feedback
                :state="allQuestions[counter].questionState"
              >
                Question cannot be empty
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Answer" label-for="answer">
              <b-form-textarea
                v-model.lazy="allQuestions[counter].answer"
                :state="allQuestions[counter].answerState"
                required
              ></b-form-textarea>
              <b-form-invalid-feedback
                :state="allQuestions[counter].answerState"
              >
                Answer cannot be empty
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
        </b-form-group>

        <b-button block variant="primary" @click="addQuestion"
          >Add another Qeuesttion</b-button
        >
      </form>
      <b-form-invalid-feedback :state="formState"
        ><div style="white-space: pre-wrap">
          {{ this.formsValidationInfo }}
        </div>
      </b-form-invalid-feedback>
    </b-modal>
  </div>
</template>

<script>
import downloadNotes from "@/mixins/downloadNotes.js";
import transformNotesInJsonToTxt from "@/mixins/transformNotesInJsonToTxt.js";

export default {
  data() {
    return {
      formState: null,

      categoryState: null,
      category: "",
      cateogryValidationInfo: "",
      formsValidationInfo: "",

      allQuestions: [
        {
          question: "",
          questionState: null,
          answer: "",
          answerState: null,
        },
      ],

      questionsFromFormInJson: {},
    };
  },
  mixins: [downloadNotes, transformNotesInJsonToTxt],
  methods: {
    checkFormValidity() {
      this.formsValidationInfo = "";
      this.categoryState = this.validateCategory();
      const allQuestionState = this.validateQuestions();

      if (!this.categoryState)
        this.formsValidationInfo += "Category is missing";
      if (!allQuestionState)
        this.formsValidationInfo += this.formsValidationInfo
          ? "\n Something is missing in questions"
          : "Something is missing in questions";

      this.formState = this.categoryState && allQuestionState;
      return this.formState;
    },
    resetModal() {
      this.formState = null;
      this.categoryState = null;
      this.category = "";
      this.allQuestions = [
        {
          question: "",
          questionState: null,
          answer: "",
          answerState: null,
        },
      ];
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$nextTick(() => {
        this.$bvModal.hide("notesPopup");
      });
      // TODO change it/implement for users profile after implementing back end
      const objQuestions = {};
      objQuestions[this.category] = this.allQuestions;
      this.questionsFromFormInJson = JSON.stringify(objQuestions);
      this.downloadNotes(this.questionsFromFormInJson, "json");
      this.downloadNotes(
        this.transformNotesInJsonToTxt(this.questionsFromFormInJson),
        "txt"
      );
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    validateCategory() {
      // TODO add validation for cateogry if this already exists in user notes AFTER implementing back end
      this.cateogryValidationInfo = "";
      if (this.category.length === 0)
        this.cateogryValidationInfo = "Category cannot be empty";
      return !this.cateogryValidationInfo ? true : false;
    },
    validateQuestions() {
      let check_for_missing_text = false;
      for (let index = 0; index < this.allQuestions.length; index++) {
        this.allQuestions[index].questionState =
          this.allQuestions[index].question.length !== 0 ? true : false;
        this.allQuestions[index].answerState =
          this.allQuestions[index].answer.length !== 0 ? true : false;

        check_for_missing_text =
          this.allQuestions[index].questionState &&
          this.allQuestions[index].answerState
            ? true
            : false;
      }
      return check_for_missing_text;
    },
    addQuestion() {
      this.allQuestions.push({
        question: "",
        questionState: null,
        answer: "",
        answerState: null,
      });
    },
    deleteQuestion(counter) {
      this.allQuestions.splice(counter, 1);
    },
  },
};
</script>
