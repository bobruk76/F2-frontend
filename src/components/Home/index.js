import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080/api';

export default {
  data() {
    return {
      questionnaires: [],
      config : {},
    };
  },
  methods: {

    getQuestionnaires() {
        this.setConfig();
        axios.get(`${BASE_API_URL}/questionnaire/`,this.config ).then((response) => {
          this.questionnaires=response.data;
          console.log(response);
        });
    },

    getThisQuestionnaire(event) {
        this.setConfig();
        const id = event.currentTarget.id;

        axios.get(`${BASE_API_URL}/questionnaire/${id}`,this.config ).then((response) => {
          this.questionnaires=response.data;
          console.log(response);
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
  },

  created() {
    this.getQuestionnaires();
  },
};