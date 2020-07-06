<template>
  <article v-if="post.thumbnail !== null" ref="article" class="article">
    <div class="article__img--blur">
      <img
        class="article__picture"
        :src="`${post.thumbnail.url}`"
        :alt="post.thumbnail.alternativeText"
        srcset=""
      />
    </div>
    <nuxt-link class="article__link" :to="post.slug" :meta="post.id">
      <div class="article__over">
        <img
          v-if="post.logo !== null"
          class="article__logo"
          :src="`${post.logo.url}`"
          :alt="post.logo.alternativeText"
        />
        <h4 v-if="post.type !== null" class="article__type">{{ post.type }}</h4>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    post: Object
  },
  data() {
    return {
      api_url: process.env.strapiBaseUri
    }
  },
  methods: {
    overArticle() {}
  }
}
</script>

<style lang="scss" scoped>
.article {
  overflow: hidden;
  position: relative;
}

.article__link {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
}
.article__picture {
  width: 100%;
  vertical-align: top;
  transition: transform 0.1s;
}
.article__img--blur {
  transition: filter 0.3s;
  img {
    transform: scale(1.02);
    margin: -6% 0px;
  }
}

.article__over {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%) translateX(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 40%;
  }
  h4 {
    margin-top: 7%;
    text-transform: uppercase;
  }
}
.article__logo {
  height: 35%;
  width: auto;
}
.article__type {
  margin-top: 16px;
  color: white;
}

/* ---------  HOVER  ------------- */
.article:hover .article__img--blur {
  filter: blur(3px);
}

.article:hover .article__img--blur img {
  transform: scale(1.07);
}

.article:hover .article__link .article__over {
  animation: 0.5s both;
  animation-name: slide-in;
}

@keyframes slide-in {
  from {
    transform: translateX(100%) translateY(-50%) skewY(10deg);
  }
  to {
    transform: translateX(0px) translateY(-50%) skewY(0deg);
  }
}
</style>
