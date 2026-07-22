<script setup>
import { ref } from 'vue';
import skill_list_data from './skill_list.json' with { type: 'json' };
import { SKILL_LEVELS } from './skill_levels.js';
import IncrementButton from './IncrementButton.vue';
import LevelUpPanel from './LevelUpPanel.vue';

const skillList = ref(skill_list_data);
const levelUpSkill = ref(null);
const showLevelUpPanel = ref(false);

function updateCount(skill, amount) {
  skill.count += amount;
  updateLevel(skill);
  saveSkillList();
}

function updateLevel(skill) {
  if (
    skill.level < 99 &&
    skill.count >= SKILL_LEVELS[skill.level + 1]
  ) {
    skill.level++;
    levelUpSkill.value = skill;
    showLevelUpPanel.value = true;
  }
  else if (
    skill.level > 1 &&
    skill.count < SKILL_LEVELS[skill.level]
  ) {
    skill.level--;
  }
}

function saveSkillList() {
  localStorage.setItem('skillList', JSON.stringify(skillList.value));
}

function loadSkillList() {
  const savedList = localStorage.getItem('skillList');
  if (savedList) {
    skillList.value = JSON.parse(savedList);
  }
}

loadSkillList();
</script>

<template>
  <main class="app">
    <section class="skill-list">
      <article
        v-for="skill in skillList"
        :key="skill.skill_name"
        class="skill-card"
      >
        <div class="skill-header">
          <h2>{{ skill.skill_name }}</h2>
          <h2>{{ skill.level }}</h2>
        </div>

        <div class="controls">
          <IncrementButton
            :incrementValue="-10"
            @increment="updateCount(skill, $event)"
          />

          <IncrementButton
            :incrementValue="-1"
            @increment="updateCount(skill, $event)"
          />

          <strong>{{ Intl.NumberFormat().format(skill.count) }}</strong>

          <IncrementButton
            :incrementValue="1"
            @increment="updateCount(skill, $event)"
          />

          <IncrementButton
            :incrementValue="10"
            @increment="updateCount(skill, $event)"
          />
        </div>
      </article>
    </section>

    <LevelUpPanel
      v-if="showLevelUpPanel"
      :skill="levelUpSkill"
      @close="showLevelUpPanel = false"
    />
    
  </main>
</template>

<style src="styles.css"></style>
