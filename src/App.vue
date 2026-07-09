<script setup>
import { ref } from 'vue';
import exercise_list_data from './exercise_list.json' with { type: 'json' };
import IncrementButton from './IncrementButton.vue';

const exerciseList = ref(exercise_list_data);

function updateCount(item, amount) {
  item.count += amount;
  saveExerciseList();
}

function saveExerciseList() {
  localStorage.setItem('exerciseList', JSON.stringify(exerciseList.value));
}

function loadExerciseList() {
  const savedList = localStorage.getItem('exerciseList');
  if (savedList) {
    exerciseList.value = JSON.parse(savedList);
  }
}

loadExerciseList();
</script>

<template>
  <main class="app">
    <section class="exercise-list">
      <article
        v-for="item in exerciseList"
        :key="item.exercise_name"
        class="exercise-card"
      >
        <h2>{{ item.exercise_name }}</h2>

        <div class="controls">
          <IncrementButton
            :incrementValue="-10"
            @increment="updateCount(item, $event)"
          />

          <IncrementButton
            :incrementValue="-1"
            @increment="updateCount(item, $event)"
          />

          <strong>{{ item.count }}</strong>

          <IncrementButton
            :incrementValue="1"
            @increment="updateCount(item, $event)"
          />

          <IncrementButton
            :incrementValue="10"
            @increment="updateCount(item, $event)"
          />
        </div>
      </article>
    </section>
  </main>
</template>

<style src="styles.css"></style>
