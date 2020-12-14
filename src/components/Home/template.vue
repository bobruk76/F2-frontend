<template>
  <div class="container">

    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item href="#">Home</b-nav-item>

          <b-nav-item-dropdown text="User" right>
              <b-dropdown-item
                    v-b-modal.logon-modal
              >
                LogOn
              </b-dropdown-item>

              <b-dropdown-item
                      v-b-modal.result-modal

              >
                Results
            </b-dropdown-item>
          </b-nav-item-dropdown>
           <b-nav-item href="#">{{ username }}</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>

      <b-alert
        :variant="confirmationSetting.variant"
        dismissible
        fade
        v-model="confirmationSetting.dismissCountDown"
        @dismissed="confirmationSetting.dismissCountDown=0"
      >
        {{ confirmationSetting.message }}
      </b-alert>

<!--        <p>{{ username }}</p>-->
<!--        <b-button v-b-modal.logon-modal>LogOn</b-button>-->

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
              ref="modal"
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

      <b-modal
              ref="modal"
              id="logon-modal"
              :title="formLogon.title"
              hide-footer
         >

             <b-form
                  @submit="onLogonSubmit"
                  @keydown.enter="onLogonSubmit"
                  class="w-100"
             >

                 <div class="form-group">
                  <label>
                    Логин:
                    <input class="form-control" type="text" v-model="username">
                  </label>
                  <br>
                  <label>
                    Пароль:
                    <input class="form-control" type="password" v-model="password">
                  </label>
              </div>

                 <button type="submit" class="btn btn-success">{{ formLogon.btnSubmit }}</button>
            </b-form>

         </b-modal>

        <b-modal
          ref="modal"
          id="result-modal"
          :title="formResult.title"
          hide-footer
          @show="getResults"
        >
            <table class="table table-dark table-stripped table-hover">
                <thead class="thead-light">
                  <tr>
                    <th>Опросник</th>
                    <th>Правильных ответов</th>
                    <th>Неправильных ответов</th>
                  </tr>
                </thead>

                <tbody>
                    <tr v-for="(result, index) in results" :key="index">
                        <td>{{ result.title }}</td>
                        <td>{{ result.count_correct_answers }} из {{ result.count_questionnaire_true_answers }}</td>
                        <td>{{ result.count_incorrect_answers }}</td>
                    </tr>
                </tbody>
            </table>

        </b-modal>

  </div>

</template>

<style lang="scss" scoped>
  @import "./styles.css";
</style>

<script src="./index.js"></script>
