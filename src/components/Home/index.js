import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080/api';

export default {
  data() {
    return {
      username: '',
      password: '',

      questionnaires: [],
      questionnaire_id: '',
      config: {},
      checkedAnswers: [],
      questions: [],
      results: {},

      formLogon: {
        title: "Авторизация",
        btnSubmit: "Авторизоваться",
      },

      formTesting: {
        title: "",
        btnSubmit: "Проверить",
      },

      formResult: {
        title: "",
      },

      confirmationSetting:{
        variant:'',
        message: '',
        dismissCountDown:0,
      },

    };
  },
  methods: {

    onLogonSubmit(event) {
      event.preventDefault();
      const requestData = {
        username: this.username,
        password: this.password,
      };
      this.setConfig();
      axios.post(`${BASE_API_URL}/token/`, requestData, this.config)
        .then((response) => {
          localStorage.setItem('jwt_token', response.data.access);
          localStorage.setItem('username', requestData.username);
          this.addConfirmation('success','Вы успешно авторизовались!');
          this.getQuestionnaires();
        })
        .catch(error => {
            this.username = '';
            this.addConfirmation('danger','Пароль или(и) логин не верные!');
            console.log(error)})
        .finally(() => {
           this.password = '';
           this.$nextTick(() => {
              this.$bvModal.hide('logon-modal')
            });
        });
    },

    onSubmitTesting(event) {
        event.preventDefault();

        this.setConfig();

        const requestData = {
            answers: JSON.stringify(this.checkedAnswers),
            questionnaireid: this.questionnaire_id,
        };

        axios.post(`${BASE_API_URL}/results/`, requestData, this.config)
            .then((response) => {
                  console.log(response);

                  this.addConfirmation('success', `Правильных ответов ${response.data.count_correct_answers} из ${response.data.count_questionnaire_true_answers}
                  неправильных ответов ${response.data.count_incorrect_answers}`, 10);
                })
            .catch(error => {
                console.log(error);
                this.addConfirmation('danger',error);
                })
            .finally(() => {
               this.$nextTick(() => {
                  this.$bvModal.hide('testing-modal')
                });
            });
    },

    getQuestionnaires() {
        this.setConfig();
        axios.get(`${BASE_API_URL}/questionnaire/`,this.config).then((response) => {
          this.questionnaires=response.data;
        });
    },

    getResults() {
        this.setConfig();
        axios.get(`${BASE_API_URL}/results/`,this.config).then((response) => {
          this.results=response.data.results;
        });
    },
    getThisQuestionnaire(event) {
        this.checkedAnswers=[]
        this.setConfig();
        this.questionnaire_id=event.currentTarget.id;
        axios.get(`${BASE_API_URL}/questionnaire/${this.questionnaire_id}`,this.config)
        .then((response) => {
          this.formTesting.title=response.data.title;
          this.questions=response.data.questions;
        })
        .catch(error => {
            console.log(error);
            this.addConfirmation('danger','Опросник загрузить не удалось!');
        })
    },

    setConfig() {
        const jwt = localStorage.getItem("jwt_token");
        this.config = {
        headers: {
          'X-CSRFToken': this.$cookies.get('csrftoken'),
           Authorization: `Bearer ${jwt}`,
        },
      };
    },

    addConfirmation(variant, message, dismissCountDown = 3) {
      this.confirmationSetting.variant=variant
      this.confirmationSetting.message = message;
      this.confirmationSetting.dismissCountDown = dismissCountDown;
    },
  },

  created() {
    this.getQuestionnaires();
  },
};