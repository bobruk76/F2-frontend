<template>
  <div class="container">
              <div class="list-group">

                <a v-for="(questionnaire, index) in questionnaires" :key="index"
                    class="list-group-item list-group-item-action list-group-item-light"
                    v-on:click.stop="getThisQuestionnaire($event)"
                    v-bind:id="questionnaire.id"
                    v-b-modal.testing-modal
                >
                    {{ questionnaire.title }}
                </a>
              </div>

        <b-modal
                ref="getTesting"
                id="testing-modal"
                :title="formTesting.title"
                hide-footer
        >

          <b-form
                  @submit="onSubmitTesting"
                  class="w-100"
          >

              <div v-for="(question, index) in questions" :key="index">
                <h2> {{ question.title }}</h2>
                <div >
                    <h3 v-html="question.content">
                      {{ question.content }}
                    </h3>

                  <ul class="list-group">

                    <li v-for="(answer, index) in question.answers" :key="index"
                        class="list-group-item list-group-item-action list-group-item-light">
                       <div class="custom-control custom-checkbox text-left">
                              <input type="checkbox" class="custom-control-input"
                                     :id="answer.id" :value="answer.id"  v-model="checkedAnswers">

                              <label class="custom-control-label" :for="answer.id">
                                {{ answer.content }}
                              </label>
                        </div>
                    </li>
                  </ul>
                </div>
              </div>
              <button type="submit" class="btn btn-success">{{ formTesting.btnSubmit }}</button>
          </b-form>

        </b-modal>

  </div>

</template>

<style lang="scss" scoped>
  @import "./styles.css";
</style>

<script src="./index.js"></script>
