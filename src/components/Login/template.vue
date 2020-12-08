<template>
    <div class="container">
  <div class="login">
    <h2>Введите логин и пароль и нажмите [Enter]</h2>
    <form @keydown.enter="onSubmit" @submit="onSubmit">
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
      <button type="submit" class="btn btn-success">Авторизоваться</button>
    </form>
  </div>
    </div>
</template>

<style lang="scss" scoped>
  @import "./styles.css";
</style>

<script src="./index.js"></script>