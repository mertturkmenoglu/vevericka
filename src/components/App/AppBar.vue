<template>
  <v-app-bar v-if="showNavbar" app flat short elevate-on-scroll :color="appBarColor">
    <AppBarTitle />

    <v-row justify="end">
      <v-col cols="12" sm="3">
        <v-text-field
          v-model="searchTerm"
          :background-color="textFieldBackground"
          append-icon="mdi-magnify"
          color="deep-orange"
          class="mt-6 hidden-sm-and-down"
          flat
          rounded
          dense
          clearable
          :prefix="isAppBarSearchFocused ? '@' : ''"
          single-line
          solo
          :label="$t('nav.bar.search')"
          type="text"
          @click:append="search"
          @keyup.enter="search"
          @focusin="isAppBarSearchFocused = true"
          @focusout="isAppBarSearchFocused = false"
        />
      </v-col>
    </v-row>

    <AppBarIcon
      class="hidden-md-and-up"
      to="/search"
      label="Search"
      icon-name="mdi-magnify"
      :tooltip="$t('nav.bar.search')"
    />

    <AppBarIcon
      to="/notifications"
      label="Notifications"
      icon-name="mdi-bell-outline"
      :tooltip="$t('nav.bar.notifications')"
    />

    <AppBarIcon
      to="/messages"
      label="Messages"
      icon-name="mdi-email-outline"
      :tooltip="$t('nav.bar.messages')"
    />

    <AppBarMenu />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { router } from '@/router';
import { publicPages } from '@/data/ApplicationConstants';
import AppBarTitle from '@/components/App/AppBarTitle.vue';
import AppBarMenu from '@/components/App/AppBarMenu.vue';
import AppBarIcon from '@/components/App/AppBarIcon.vue';

@Component({
  components: { AppBarIcon, AppBarMenu, AppBarTitle },
})
export default class AppBar extends Vue {
  isAppBarSearchFocused = false;

  searchTerm = '';

  get textFieldBackground(): string {
    return this.$vuetify.theme.dark ? '#1e1e1e' : '#f0f2f5';
  }

  get showNavbar(): boolean {
    return publicPages.every((page) => this.$route.path !== page);
  }

  get appBarColor(): string {
    return this.$vuetify.theme.dark ? '#272727' : '#FFF';
  }

  mounted(): void {
    this.setTheme();
  }

  async search(): Promise<void> {
    if (this.searchTerm.length > 0) {
      this.$store.state.gSearchTerm = this.searchTerm;
      await router.push('/search');
    }
  }

  setTheme(): void {
    const theme = localStorage.getItem('veverickaTheme');
    this.$vuetify.theme.dark = theme === '"dark"';
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
