<template>
  <input
    :type="type || 'text'"
    :placeholder="placeholderText"
    v-model="value"
    class="hd-input"
    v-bind="$attrs"
  />
  <p>{{ errorMessage }}</p>
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

<style scoped>
.hd-input {
  @apply border w-full rounded-sm py-1 px-2 outline-none border-gray-200 placeholder:text-xs my-4
    focus:ring-2 ring-offset-2 ring-violet-600 duration-300 focus:border-white;
}
</style>
