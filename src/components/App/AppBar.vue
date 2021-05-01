<template>
  <v-app-bar
    v-if="showNavbar"
    app
    flat
    short
    elevate-on-scroll
    :color="appBarColor"
  >
    <AppBarTitle />

    <v-row justify="end">
      <v-col
        cols="12"
        sm="3"
      >
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
          @keyup.enter.native="search"
          @focusin="isAppBarSearchFocused = true"
          @focusout="isAppBarSearchFocused = false"
        />
      </v-col>
    </v-row>

    <router-link to="/search">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="deep-orange"
            class="hidden-md-and-up"
            aria-label="Search"
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar class="ml-1">
              <v-icon
                color="deep-orange"
                size="32"
              >
                mdi-magnify
              </v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <span>{{ $t('nav.bar.search') }}</span>
      </v-tooltip>
    </router-link>

    <router-link to="/notifications">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="deep-orange"
            aria-label="Notifications"
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar
              class="ml-1"
              size="40"
            >
              <v-icon
                color="deep-orange"
                size="32"
              >
                mdi-bell-outline
              </v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <span>{{ $t('nav.bar.notifications') }}</span>
      </v-tooltip>
    </router-link>

    <router-link to="/messages">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="deep-orange"
            aria-label="Messages"
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar
              class="ml-1"
              size="40"
            >
              <v-icon
                color="deep-orange"
                size="32"
              >
                mdi-email-outline
              </v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <span>{{ $t('nav.bar.messages') }}</span>
      </v-tooltip>
    </router-link>

    <AppBarMenu />
  </v-app-bar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {router} from '@/router';
import {publicPages} from '@/data/ApplicationConstants';
import AppBarTitle from '@/components/App/AppBarTitle.vue';
import AppBarMenu from '@/components/App/AppBarMenu.vue';

@Component({
  components: {AppBarMenu, AppBarTitle},
})
export default class AppBar extends Vue {
  isAppBarSearchFocused = false
  searchTerm = ''

  get textFieldBackground(): string {
    return this.$vuetify.theme.dark ? '#1e1e1e' : '#f0f2f5';
  }

  get showNavbar(): boolean {
    return publicPages.every(page => this.$route.path !== page);
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
