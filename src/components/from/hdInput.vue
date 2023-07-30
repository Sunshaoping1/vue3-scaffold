<template>
  <input
    :type="type || 'text'"
    :placeholder="placeholderText"
    v-model="value"
    class="hd-input"
    v-bind="$attrs"
  />
  <p v-if="errorMessage" class="hd-error">{{ errorMessage }}</p>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  type: String,
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    required: true,
  },
  placeholderText: {
    type: String,
    default: "",
  },
});

const { value, errorMessage } = useField(() => props.name, props.rules);
</script>

<style scoped></style>
