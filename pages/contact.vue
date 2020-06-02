<template>
  <section v-if="contact !== undefined" class="contact">
    <h1 class="contact__title">{{ contact.title }}</h1>
    <div class="contact__form">
      <form class="form" name="contact" action method="post">
        <div class="form__group">
          <label class="form__label" for="name">Name:</label>
          <input id="name" placeholder="Name" class="form__field" name="name" />
        </div>
        <div class="form__group">
          <label class="form__label" for="email">Email:</label>
          <input
            id="email"
            placeholder="Email"
            class="form__field"
            name="email"
          />
        </div>
        <div class="form__group--textarea">
          <label class="form__label" for="message">Message</label>
          <textarea
            id="message"
            placeholder="Message"
            class="form__field"
            name="message"
          ></textarea>
        </div>
        <input class="form__button btn" type="submit" value="SEND MESSAGE" />
      </form>
    </div>
    <div class="contact__body">
      <div class="contact__info">
        <h4>Contact Informations</h4>
        <h5>{{ contact.email }}</h5>
        <h5>{{ contact.location }}</h5>
      </div>
      <div class="contact__socials">
        <h4>Socials media</h4>
        <a
          v-for="social in socials"
          :key="social.id"
          class="contact__social"
          :href="social.link"
          rel="noopener noreferrer"
          target="_blank"
        >
          {{ social.name }}
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import contactQuery from '~/apollo/queries/contact/contact.gql'
import socialQuery from '~/apollo/queries/contact/socials.gql'
export default {
  data() {
    return {
      contact: [],
      socials: [],
      api_url: process.env.strapiBaseUri
    }
  },
  apollo: {
    contact: {
      query: contactQuery
    },
    socials: {
      query: socialQuery
    }
  }
}
</script>

<style lang="scss" scoped>
.contact {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: space(4);
  margin: var(--body-margin);
}

.contact__title {
  grid-column: 1 / span 8;
  font-size: 120px;
}

.contact__body {
  grid-column: 10 / span 3;
  grid-row: 1 / span 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: space(8) space(4);
  max-height: 367px;
  overflow: hidden;
  background-color: var(--primary-color);
  color: var(--primary-color-light);

  .contact__info {
    width: 100%;
    h4,
    h5 {
      color: var(--primary-color-light);
    }
  }
  .contact__socials {
    h4,
    h5,
    a {
      color: var(--primary-color-light);
      display: block;
    }
  }
}
.contact__form {
  grid-column: 1 / span 8;
}

.contact__social--icon {
  max-height: space(4);
}
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: space(4);
  row-gap: space(3);
  margin-top: space(4);
}
.form__group--textarea {
  grid-column: 1 / span 2;
}
.form__label {
  display: none;
}
.form__field {
  width: 100%;
  border: none;
  border-radius: none;
  border-bottom: 2px solid var(--primary-color-light);
  margin-top: space(0.5);
  margin-bottom: space(2);
  font-size: 14px;
  transition: border 0.1s ease-in;
  padding: 0 0 space(1) 0;
  height: space(3);

  &:focus {
    outline: none;
    border-bottom: 2px solid var(--secondary-color);
    &::placeholder {
      color: var(--secondary-color);
    }
  }
}

.form__button {
  width: fit-content;
  align-self: flex-end;
}
</style>
