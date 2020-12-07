import axios from 'axios';

const AUTH_URL = 'http://localhost:8080/api/token/';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const requestData = {
        username: this.username,
        password: this.password,
      };
      const config = {
        headers: {
          'X-CSRFToken': localStorage.getItem("csrftoken"),
        },
      };
      axios.post(AUTH_URL, requestData, config)
        .then((response) => {
          localStorage.setItem('jwt_token', response.data.access);
          localStorage.setItem('username', requestData.username);
          console.log('Token set');
        })
        .catch(error => console.log(error));;
      this.username = '';
      this.password = '';
    },
  },
};