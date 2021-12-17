<template>
  <v-container>
    <h1 class="font-weight-light">
      {{ $t('contact_page.title') }}
    </h1>
    <v-divider />
    <h2 class="font-weight-light">
      {{ $t('contact_page.contact_admin') }}
      <router-link
        :to="`/user/${administratorUsername}`"
        class="deep-orange--text"
      >
        @{{ administratorUsername }}
      </router-link>
    </h2>
    <h2 class="font-weight-light">
      {{ $t('contact_page.contact_mail') }}
      <span class="deep-orange--text">
        {{ contactMail }}
      </span>
    </h2>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({})
export default class ContactPage extends Vue {
  readonly administratorUsername: string = 'adminmert'

  readonly contactMail: string = 'contactvevericka@gmail.com'
}
</script>

<style scoped>

</style>
