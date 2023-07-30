<template>
  <Animate tag="ul" class="article">
    <li
      v-for="(article, index) in articles"
      :data-index="index"
      :key="article.id"
      @click="del(index)"
    >
      {{ article.title }}
    </li>
  </Animate>
</template>

<script setup lang="ts">
import { ArticleInfo, articleInfo } from "@/api/articleApi";
import { reactive } from "vue";

const articles: Array<ArticleInfo> = reactive([]);
articleInfo().then(({ data }) => {
  articles.push(...data);
});
const del = function (idx: number) {
  articles.splice(idx, 1);
};
</script>

<style scoped lang="scss">
.article {
  padding: 30px;
  ul {
    li {
      padding: 10px;
      margin-bottom: 20px;
      background-color: #27ae60;
      color: white;
    }
  }
}
</style>
