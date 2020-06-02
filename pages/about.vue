<template>
  <div class="container">
    <section class="about">
      <h1 class="about__title">{{ about.title }}</h1>
      <div v-if="$apollo.loading == 0" class="about__picture">
        <img :src="`${api_url}${about.picture.url}`" alt="" />
      </div>
      <div class="about__description">
        <p>{{ about.description }}</p>
      </div>
      <nuxt-link class="about__btn btn btn--inline" to="/">
        Go to films
        <svg
          width="41"
          height="13"
          viewBox="0 0 41 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="39"
            height="3"
            transform="matrix(1 0 0 -1 0 8)"
            fill="#E9C404"
          />
          <path
            d="M33.5701 1.57205L38.5691 6.57106L33.5701 11.5701"
            stroke="#E9C404"
            stroke-width="3"
          />
        </svg>
      </nuxt-link>
      <div class="about__vision">
        <img src="../static/about-circle.svg" alt="" srcset="" />
        <p class="quote">
          <q>{{ about.vision }}</q>
        </p>
      </div>
    </section>
    <section class="awards">
      <div class="about__awards">
        <h2>AWARDS</h2>
        <img :src="`${api_url}${about.awards.url}`" alt="" />
        <div class="bg"></div>
      </div>
    </section>
  </div>
</template>

<script>
import aboutQuery from '~/apollo/queries/about/about'
export default {
  data() {
    return {
      about: [],
      api_url: process.env.strapiBaseUri
    }
  },
  apollo: {
    about: {
      prefetch: true,
      query: aboutQuery
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  display: grid;
  position: relative;
  grid-template-columns: repeat(12, 1fr);
  column-gap: space(4);
  padding: var(--body-margin);
  padding-top: 64px;
  padding-bottom: 0;
  @include mobile {
    display: block;
    padding: var(--body-margin-mobile);
  }
}
.about__title {
  grid-column: 1 / span 8;
}
.about__description {
  grid-column: 1 / span 5;
  margin-top: space(1);
  margin-bottom: space(4);
}
.about__btn {
  grid-column: 1 / span 3;
  max-height: fit-content;
  display: flex;
  align-items: center;
  &:hover svg {
    animation: left-move 0.9s;
    animation-iteration-count: infinite;
  }
  svg {
    margin-left: 18px;
  }
}
@keyframes left-move {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(15px);
  }
  100% {
    transform: translateX(0px);
  }
}
.about__picture {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 488px;
  overflow: hidden;
  z-index: -1;
  height: 100%;
  @include mobile {
    position: relative;
    width: 100%;
  }
  img {
    width: 100%;
    height: AUTO;
  }
}
.about__vision {
  grid-column: 2 / span 8;
  position: relative;
  margin-top: space(6);
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 32px;
  @include mobile {
    display: flex;
    justify-content: center;
  }
  img {
    width: 100%;
    grid-column: 1 / span 8;
    @include mobile {
      min-width: 213%;
      transform: rotate(-4deg);
    }
  }
  p {
    position: absolute;
    top: 50%;
    left: 0;
    grid-column: 2 / span 6;
    font-size: 1.15vw;
    line-height: 150%;
    transform: translateY(-50%);
    color: var(--primary-color-light);
    background: white;
    @include mobile {
      font-size: 3.6vw;
      background: transparent;
    }
  }
}
/* ----- AWARDS -----*/
.awards {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: space(4);
  padding: 0 var(--body-margin);
  margin-top: -72px;
  margin-top: space(-9);
  background: var(--secondary-color-light);
  @include mobile {
    display: block;
    padding: 0 var(--body-margin-mobile);
    margin-top: -96px;
  }
}
.about__awards {
  position: relative;
  grid-column: 1 / span 12;
  padding: space(23) 0;
  h2 {
    margin-bottom: space(2);
  }
  img {
    box-sizing: border-box;
    width: 100%;
    height: auto;
  }
}
</style>
