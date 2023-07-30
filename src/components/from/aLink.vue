<template>
  <div class="alink">
    <a href="#">
      <slot />
    </a>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.alink {
  a {
    @apply text-xs text-gray-700 hover:text-red-400;
  }
}
</style>
