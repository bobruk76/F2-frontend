import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080/api';

export default {
  data() {
    return {
      username: '',
      password: '',

      questionnaires: [],
      config : {},
      checkedAnswers: [],
      questions: [],

      formLogon: {
        title: "Авторизация",
        btnSubmit: "Авторизоваться",
      },

      formTesting: {
        title: "",
        btnSubmit: "Проверить",
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
            this.addConfirmation('danger','Пароль или логин не верные!');
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
        const data = JSON.stringify(this.checkedAnswers);
        this.config.answers = data;
        console.log(this.config);

        axios.post(`${BASE_API_URL}/results/`,this.config).then((response) => {
              console.log(response);
            })
        .catch(error => console.log(error))
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
          console.log(response);
        });
    },

    getThisQuestionnaire(event) {
        this.setConfig();
        const id = event.currentTarget.id;

        axios.get(`${BASE_API_URL}/questionnaire/${id}`,this.config).then((response) => {
          this.formTesting.title=response.data.title;
          this.questions=response.data.questions;
        });
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

    addConfirmation(variant, message) {
      this.confirmationSetting.variant=variant
      this.confirmationSetting.message = message;
      this.confirmationSetting.dismissCountDown = 3;
    },
  },

  created() {
    this.getQuestionnaires();
  },
};