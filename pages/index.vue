<template>
  <div class="container">
    <div class="article__wrapper">
      <Article
        v-for="post in posts"
        :key="post.id"
        class="article-root"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import postsHome from '~/apollo/queries/post/postsHome.gql'
import Article from '~/components/Article.vue'

export default {
  components: {
    Article
  },
  data() {
    return {
      posts: []
    }
  },
  apollo: {
    posts: {
      prefetch: true,
      query: postsHome
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: var(--body-margin);
  @include mobile {
    margin: var(--body-margin-mobile);
  }
}

.article__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48%, 1fr));
  grid-gap: space(3);
  width: 100%;
  opacity: 0;
  animation-duration: 0.7s;
  animation-delay: 0.3s;
  animation-name: fade-in;
  animation-fill-mode: both;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
