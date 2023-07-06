<template>
    <button class="hd-button mt-5">
      <slot></slot>
    </button>
</template>

<script setup lang="ts">

</script>

<style scoped>
  .hd-button{
    @apply bg-violet-700 text-white w-full py-2 rounded-md  hover:bg-violet-300 duration-300;
  }
</style>