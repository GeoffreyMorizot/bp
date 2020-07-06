<template>
  <div class="container">
    <nav ref="navigation" class="navigation">
      <nuxt-link to="/" class="navigation__logo">logo</nuxt-link>
      <ul class="navigation__links">
        <li
          v-for="(slug, index) in slugs"
          :key="index"
          class="navigation__link"
        >
          <nuxt-link :to="slug.slug">
            {{ slug.title }}
          </nuxt-link>
        </li>
      </ul>
      <div class="navigation__mobile" @click="toggleMenu">
        <div class="navigation__mobile--line"></div>
        <div class="navigation__mobile--line"></div>
        <div class="navigation__mobile--line"></div>
      </div>
    </nav>
    <main ref="pageContainer" class="page-container">
      <div class="menu-mobile" :class="{ open: isOpen }">
        <ul class="navigation__links--mobile">
          <nuxt-link
            v-for="(slug, index) in slugs"
            :key="index"
            class="navigation__link--mobile"
            :to="slug.slug"
          >
            {{ slug.title }}
          </nuxt-link>
        </ul>
      </div>
      <nuxt />
    </main>
    <footer ref="footer" class="footer">
      <h5 class="footer__content">{{ footer.content1 }}</h5>
      <div class="footer__links">
        <a
          v-for="(social, index) in footer.Socials.socials"
          :key="index"
          class="footer__link"
          target="_blank"
          rel="noopener noreferrer"
          :href="social.link"
        >
          <img
            :src="`${social.Icon.url}`"
            :alt="social.name"
            class="footer__icon"
          />
        </a>
      </div>
    </footer>
  </div>
</template>
<script>
import slugQuery from '~/apollo/queries/slug/navSlugs'
import footerQuery from '~/apollo/queries/footer/footer'

export default {
  data() {
    return {
      slugs: [],
      footer: [],
      height: 0,
      isOpen: false,
      route: null
    }
  },
  watch: {
    $route() {
      this.isOpen = false
      this.route = this.$route.path
    }
  },
  mounted() {
    const ref1 = this.$refs.navigation.getClientRects()[0].height
    const ref2 = this.$refs.footer.getClientRects()[0].height
    this.height = ref1 + ref2
    this.setHeightOnContainer(this.$refs.pageContainer, this.height)
    this.matchBgColor()
  },
  methods: {
    setHeightOnContainer(el, height) {
      el.style.minHeight = `calc(100vh - ${height}px)`
    },
    toggleMenu() {
      this.isOpen = !this.isOpen
      console.log(this.isOpen)
    },
    matchBgColor() {
      if (this.route === '/about') {
        console.log('ok')
        this.$refs.footer.style.background = 'rgba(255, 243, 211, 1)'
      } else {
        this.$refs.footer.style.background = 'white'
      }
    }
  },
  apollo: {
    slugs: {
      query: slugQuery,
      update: (slugs) => slugs
    },
    footer: {
      query: footerQuery
    }
  }
}
</script>

<style scoped lang="scss">
/*RESET*/
h1 {
  margin: 0;
}
p {
  margin: 0;
}
.container {
  min-height: 100vh;
  overflow-x: hidden;
}
/*NAVIGATION*/
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: space(1) space(13);
  height: fit-content;
  width: 100%;
  border-bottom: 2px solid var(--primary-color);
  @include tablet {
    padding: space(1) space(10);
  }
  @include mobile {
    padding: space(3) space(4);
  }
}
.navigation__links {
  display: flex;
  flex-direction: row;
  @include mobile {
    display: none;
    display: flex;
    flex-direction: row;
  }
}
.navigation__link {
  margin-right: space(3);
  &:last-child {
    margin-right: 0px;
  }
}
/*NAVIGATION MOBILE*/
.navigation__mobile {
  display: none;
  @include mobile {
    display: flex;
    flex-direction: column;
    z-index: 2000;
  }
}
.navigation__mobile--line {
  background: black;
  height: 3px;
  width: 25px;
  margin-bottom: 4px;
}
.navigation__links--mobile {
  display: flex;
  flex-direction: column;
}
.menu-mobile {
  position: fixed;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(147, 147, 147, 1);
  background: var(--primary-color-light);
  top: 0;
  left: 0;
  height: 0;
  width: 100%;
  z-index: 1000;
  transition: 0.25s ease-in-out;
  font-size: 64px;
  &.open {
    display: flex;
    height: 100%;
    transition: all 0.3s ease-in-out;
  }
}

/*FOOTER*/
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-height: space(9);
  @include mobile {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    max-height: space(13);
  }
}
.footer__content {
  align-self: center;
  margin-left: space(13);
  @include mobile {
    margin-left: 0;
    padding: 15px;
  }
}

.footer__links {
  display: flex;
  align-items: center;
  margin-right: space(12);
  @include mobile {
    margin-right: 0;
  }
}

.footer__link {
  padding: space(2);
  @include mobile {
    padding-bottom: 0;
  }
}

.footer__icon {
  height: space(3);
}
</style>
