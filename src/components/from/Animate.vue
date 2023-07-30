<template>
  <div class="animate">
    <transition-group
      apper
      name="list"
      :tag="tag"
      @before-enter="beforeEnter"
      @enter="onEnter"
    >
      <slot />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { RendererElement } from "vue";

interface Iprops {
  tag?: string;
}

const { tag } = withDefaults(defineProps<Iprops>(), {
  tag: "",
});

const beforeEnter = (el: RendererElement) => {
  gsap.set(el, {
    opacity: 0,
  });
};
const onEnter = (el: RendererElement, done: () => void) => {
  gsap.to(el, {
    opacity: 1,
    duration: 0.6,
    delay: el.dataset.index * 0.2,
    onComplete: done,
  });
};
</script>

<style lang="scss">
.animate {
  position: relative;
  .list-leave-active {
    transition: all 2s ease;
    position: absolute;
    width: 100%;
  }
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
