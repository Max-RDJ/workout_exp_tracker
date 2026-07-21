<script setup>
defineProps({
  skill: Object
});
</script>

<template>
    <div class="level-up-panel">
        <h2>Congratulations, you just advanced a <span class="skill-highlight">{{ skill.skill_name }}</span> level.</h2>
        <p><span class="skill-highlight">{{ skill.skill_name }}</span> is now level <span class="skill-highlight">{{ skill.level }}</span>.</p>
        <button @click="$emit('close')">Close</button>
    </div>
</template>