<template>
    <div class="container">
  <div class="login">
    <h2>Введите логин и пароль и нажмите [Enter]</h2>
    <form @keydown.enter="onSubmit">
      <label>
        Логин:
        <input type="text" v-model="username">
      </label>
      <br>
      <label>
        Пароль:
        <input type="password" v-model="password">
      </label>
    </form>
  </div>
    </div>
</template>

<style lang="scss" scoped>
  @import "./styles.css";
</style>

<script src="./index.js"></script>