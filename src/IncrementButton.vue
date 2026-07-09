<script setup>
const props = defineProps({
  incrementValue: {
    type: Number,
    required: true
  },
  valueToIncrement: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['increment']);

function handleClick() {
  emit('increment', props.incrementValue);
}
</script>


<template>
  <button @click="handleClick">
    {{ incrementValue > 0 ? '+' : '' }}{{ incrementValue }}
  </button>
</template>