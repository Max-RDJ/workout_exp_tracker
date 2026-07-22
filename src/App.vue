<script setup>
import { ref } from 'vue';

import skill_list_data from './skill_list.json' with { type: 'json' };
import { SKILL_LEVELS } from './javascript/skill_levels.js';
import skill_groups from './skill_groups.json' with { type: 'json' };

import IncrementButton from './IncrementButton.vue';
import LevelUpPanel from './LevelUpPanel.vue';

import { playLevelUp, toggleMute, isMuted } from './javascript/audio.js';

const skillList = ref(skill_list_data);
const levelUpSkill = ref(null);
const showLevelUpPanel = ref(false);
const showAddSkill = ref(false);
const newSkillName = ref('');

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
    playLevelUp();
  }
  else if (
    skill.level > 1 &&
    skill.count < SKILL_LEVELS[skill.level]
  ) {
    skill.level--;
  }
}

function addSkill() {
  if (newSkillName.value.trim() !== '') {
    skillList.value.push({
      skill_name: newSkillName.value.trim(),
      level: 1,
      count: 0
    });
    newSkillName.value = '';
    showAddSkill.value = false;
    saveSkillList();
    refreshSkillList();
  }
}

function addSkillSection(sectionName) {
  if (sectionName.trim() !== '') {
    skillList.value.push({
      section_name: sectionName.trim(),
      skills: []
    });
    saveSkillList();
    refreshSkillList();
  }
}

function assignToSection(skill, sectionName) {
  const section = skillList.value.find(
    (s) => s.section_name === sectionName
  );
  if (section) {
    section.skills.push(skill);
    skillList.value = skillList.value.filter(
      (s) => s.skill_name !== skill.skill_name
    );
    saveSkillList();
    refreshSkillList();
  }
}

function refreshSkillList() {
  skillList.value = [...skillList.value];
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

      <div class="add-skill-button" v-if="!showAddSkill">
        <button @click="showAddSkill = true">+</button>
      </div>

      <div class="add-skill" v-if="showAddSkill">
        <input
          v-model="newSkillName"
          type="text"
          placeholder="New skill name"
          class="add-skill-input"
        />
        <div class="add-skill-buttons">
          <button @click="showAddSkill = false" class="button-cancel">X</button>
          <button @click="addSkill" class="button-confirm">✓</button>
        </div>
      </div>
    </section>

    <LevelUpPanel
      v-if="showLevelUpPanel"
      :skill="levelUpSkill"
      @close="showLevelUpPanel = false"
    />
    
  </main>
</template>

<style src="styles.css"></style>
