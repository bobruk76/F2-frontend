import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080/api';

export default {
  name: 'Question',
  data() {
    return {
      checkedAnswers: [],
      questions: [],

      formSetting: {
        title: "Добавить задачу",
        btnSubmit: "Добавить",
      },
       addTodoForm: {
        uid: 0,
        description: '',
        is_completed: [],
      },
      countTasks:{
        completed:0,
        un_completed:0,
      },
      confirmationSetting:{
        variant:'',
        message: '',
        dismissCountDown:0,
      },
    };
  },
  methods: {
    getQuestion() {
          const jwt = localStorage.getItem("jwt_token");
          const config = {
            headers: {
              'X-CSRFToken': this.$cookies.get('csrftoken'),
               Authorization: `Bearer ${jwt}`,
            },
          };
        axios.get(`${BASE_API_URL}/question/`,config).then((response) => {
          this.questions=response.data;
          console.log(response);
        });
    },


    onSubmit(event) {
      event.preventDefault();

        const data = JSON.stringify(this.checkedAnswers);
        const jwt = localStorage.getItem("jwt_token");
        const headers = {
          'X-CSRFToken': this.$cookies.get('csrftoken'),
           Authorization: `Bearer ${jwt}`,
        };
        axios.post(`${BASE_API_URL}/results/`,
        {
         answers: data
        },
        {
            headers: headers
         })
        .then((response) => {
              console.log(response);
            })
         .catch(error => console.log(error));
    },

    addConfirmation(variant, message) {
      this.confirmationSetting.variant=variant
      this.confirmationSetting.message = message;
      this.confirmationSetting.dismissCountDown = 3;
    },

    onReset(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      this.resetForm();
    },

    setAddForm() {
      this.formSetting = {
        title: "Добавить задачу",
        btnSubmit: "Добавить",
      };
    },

    updateTodo(todo) {
      this.addTodoForm = todo;
      this.formSetting = {
        title: "Обновить задачу",
        btnSubmit: "Обновить",
      };
    },
  },
  created() {
    this.getQuestion();
  },
};