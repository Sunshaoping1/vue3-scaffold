<template>
  <input
    :type="type"
    :name="name"
    class="hd-input"
    :placeholder="placeholderText"
    :value="modelValue"
    @input="$emit('update:modelValue',($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholderText: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.hd-input {
  @apply border w-full rounded-sm py-1 px-2 outline-none border-gray-200 placeholder:text-xs
    focus:ring-2 ring-offset-2 ring-violet-600 duration-300 focus:border-white;
}
</style>
