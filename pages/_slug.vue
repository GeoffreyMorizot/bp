<template>
  <article v-if="post.posts != undefined" class="post">
    <div class="post__btn-wrap">
      <nuxt-link class="btn btn--primary" to="/">Back To Films</nuxt-link>
    </div>
    <div class="post__gallery">
      <div
        v-for="(img, index) in post.posts[0].gallery.Picture"
        :key="index"
        class="image__wrapper"
      >
        <img :data-id="img.id" :src="`${img.url}`" alt="" srcset="" />
      </div>
    </div>
    <div class="post__description">
      <h3>
        {{ post.posts[0].title }} - <span>{{ post.posts[0].type }}</span>
      </h3>
      <ul>
        <li>
          <pre> {{ post.posts[0].description }}</pre>
        </li>
        <li>
          Production:
          <p v-for="prod in post.posts[0].productions" :key="prod.id">
            {{ prod.name }}
          </p>
        </li>
        <li>
          Directors:
          <span
            v-for="(director, index) in post.posts[0].directors"
            :key="index"
          >
            {{ director.Name }}
          </span>
        </li>
        <li>Cinematographer: {{ post.posts[0].cinematographer }}</li>
      </ul>
    </div>
    <div class="embed-container">
      <iframe
        :src="post.posts[0].url"
        frameborder="0"
        allow="autoplay; fullscreen"
        allowfullscreen
      ></iframe>
    </div>
    <div class="post__btn-wrap">
      <nuxt-link class="btn btn--primary" to="/">Back To Films</nuxt-link>
    </div>
    <agile :dots="false">
      <div
        v-for="(img, index) in post.posts[0].gallery.Picture"
        :key="index"
        class="slide"
      >
        <img :data-id="index" :src="`${img.url}`" alt="" srcset="" />
      </div>
    </agile>
  </article>
</template>

<script>
import { VueAgile } from 'vue-agile'
import posts from '~/apollo/queries/post/posts.gql'

export default {
  components: {
    agile: VueAgile
  },
  data() {
    return {
      post: [],
      api_url: process.env.strapiBaseUri
    }
  },
  apollo: {
    post: {
      prefetch: true,
      query: posts,
      update: (post) => post,
      variables() {
        return {
          slug: this.$route.params.slug
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  margin: var(--body-margin);
  @include mobile {
    margin: var(--body-margin-mobile);
  }
}
.post__btn-wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  margin: space(5) 0;
}
.post__gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  grid-gap: space(4);
  @include mobile {
    grid-template-columns: 1fr;
  }
  .image__wrapper {
    overflow: hidden;
    img {
      width: 100%;
      cursor: pointer;
      transition: transform 0.25s;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

.post__description {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: space(5) 0;
  text-align: center;
  line-height: 24px;
  p {
    display: inline-block;
  }
}

.embed-container {
  --video--width: 640;
  --video--height: 360;

  position: relative;
  padding-bottom: calc(
    var(--video--height) / var(--video--width) * 100%
  ); /* 41.66666667% */
  overflow: hidden;
  max-width: 100%;
  background: black;
}

.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slide img {
  width: 100%;
}

/*------ FOR SLIDER SSR RENDER -------*/
.agile--ssr .agile__slides > * {
  overflow: hidden;
  width: 0;
}

.agile--ssr .agile__slides > *:first-child {
  width: 100%;
}

.agile {
  &__actions {
    margin-top: 20px;
  }
}
</style>
