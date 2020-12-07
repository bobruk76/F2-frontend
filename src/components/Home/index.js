import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080/api';

export default {
  data() {
    return {
      questionnaires: [],
    };
  },
  methods: {
    getQuestionnaires() {
      const jwt = localStorage.getItem("jwt_token");
      const config = {
        headers: {
          'X-CSRFToken': this.$cookies.get('csrftoken'),
           Authorization: `Bearer ${jwt}`,
        },
      };
    axios.get(`${BASE_API_URL}/questionnaire/`,config).then((response) => {
      this.questionnaires=response.data;
      console.log(response);
    });
    },
  },
  created() {
    this.getQuestionnaires();
  },
};