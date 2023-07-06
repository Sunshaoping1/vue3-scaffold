<template>
  <input
    @change="handleChange"
    :value="value"
    :type="'text' || type"
    class="border border-violet-600"
  />
  <p>{{ errorMessage }}</p>
  {{ value }}
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  name: {
    type: String,
    default: "username",
  },
  type: String,
});
const { value, errorMessage, handleChange } = useField(
  () => props.name,
  "required|min:8",
  {
    label: "密码",
  }
);
</script>

<style scoped></style>
