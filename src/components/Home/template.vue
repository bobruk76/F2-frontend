<template>
  <div class="container">
              <div class="list-group">

                <a v-for="(questionnaire, index) in questionnaires" :key="index"
                    class="list-group-item list-group-item-action list-group-item-light"
                    v-on:click.stop="getThisQuestionnaire($event)"
                    v-bind:id="questionnaire.id">
                    {{ questionnaire.title }}
                </a>
              </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./styles.css";
</style>

<script src="./index.js"></script>
