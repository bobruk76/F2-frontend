import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080/api';

export default {
  name: 'Question',
  data() {
    return {
      username: '',
      checkedAnsers: [],
      questions: [],
      addTodoForm: {
        uid: 0,
        description: '',
        is_completed: [],
      },
      formSetting: {
        title: "Добавить задачу",
        btnSubmit: "Добавить",
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
      this.username = localStorage.getItem("username");
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


    resetForm() {
      this.addTodoForm.description = '';
      this.addTodoForm.is_completed = [];
    },

    onSubmit(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();

      if (this.formSetting.title == "Добавить задачу") {

        let max_uid = Math.max.apply(Math,this.todos.map(function(o) { return o.uid; }));
        if(!isFinite(max_uid)) {
          max_uid = 0;
        }
        let desc = this.addTodoForm.description

        this.todos.push({
          description: desc,
          is_completed: this.addTodoForm.is_completed[0] || false,
          uid: max_uid+1,
        });

        localStorage.setItem("tasks", JSON.stringify(this.todos));
        this.addConfirmation('info',`Задача "${desc}" добавлена`);
        this.calcCounts();
      } else {
        this.todos.forEach(item => {
          if(item.is_completed.length == 0) {
           item.is_completed = false;
          }
        });
        localStorage.setItem("tasks", JSON.stringify(this.todos));
        this.addConfirmation('success','Задача обновлена');
        this.getTodos();
      }

      this.resetForm();
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

    deleteTodo(todo) {

      this.todos.uid
      if(this.todos.filter((item) => {return item.uid == todo.uid}).length>0){

        this.todos = this.todos.filter((item) =>{
          return item!==todo;
        });
        localStorage.setItem("tasks", JSON.stringify(this.todos));
        this.addConfirmation('danger','Задача удалена из списка');
        this.calcCounts();
      } else {
        this.addConfirmation('danger','Данные некорректны! Повторите Попытку позже!');
      }
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