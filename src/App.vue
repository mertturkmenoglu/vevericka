<template>
  <v-app>
    <v-app-bar
      v-if="showNavbar"
      app
      flat
      short
      elevate-on-scroll
      :color="appBarColor"
    >
      <router-link
        to="/"
        class="text-decoration-none"
        aria-label="App Icon"
      >
        <v-img
          class="mx-4"
          src="./assets/icon_primary.svg"
          max-height="32"
          max-width="32"
          contain
        />
      </router-link>

      <router-link
        to="/"
        class="text-decoration-none deep-orange--text"
      >
        <v-toolbar-title class="font-weight-light hidden-xs-only text-h5">
          Vevericka
        </v-toolbar-title>
      </router-link>

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
          <span>Search</span>
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

      <v-menu
        left
        bottom
        nudge-left="24"
        nudge-bottom="48"
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on, attrs, value }">
          <v-btn
            icon
            v-bind="attrs"
            color="deep-orange"
            aria-label="Menu"
            v-on="on"
          >
            <v-avatar size="40">
              <v-icon
                color="deep-orange"
                size="32"
              >
                {{ value ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
              </v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list
          flat
          class="text-decoration-none font-weight-light"
          dense
        >
          <router-link :to="{ name: 'UserPage', params: { username: this.$store.state.user.username } }">
            <v-list-item>
              <v-list-item-avatar tile>
                <v-badge
                  bordered
                  overlap
                  bottom
                  dot
                  color="green"
                  offset-x="10"
                  offset-y="10"
                >
                  <v-avatar size="40">
                    <v-img
                      class="rounded-circle mx-auto"
                      :src="imgURL"
                      contain
                      width="12"
                      aspect-ratio="1"
                      alt="Profile"
                    />
                  </v-avatar>
                </v-badge>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="deep-orange--text">@{{ this.$store.state.user.username.substr(0, 20) }}</span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <span class="text-caption font-weight-light">{{ $t('nav.menu.view_your_profile') }}</span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <v-divider />

          <router-link to="/explore">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">
                  mdi-pound
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.explore') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>


          <router-link to="/bookmarks">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">
                  mdi-bookmark-outline
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.bookmarks') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/settings">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">
                  mdi-cog-outline
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.settings') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <v-list-item @click="toggleDarkMode">
            <v-list-item-icon>
              <v-icon color="deep-orange">
                mdi-brightness-6
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ $t('nav.menu.dark_theme') }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-switch
                inset
                dense
                color="deep-orange"
                :input-value="isDarkModeEnabled"
              />
            </v-list-item-action>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon color="deep-orange">
                mdi-logout
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('nav.menu.logout') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-dialog
            v-model="displayLanguageDialog"
            width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-list-item
                v-bind="attrs"
                @click="displayLanguageDialog = true"
                v-on="on"
              >
                <v-list-item-icon>
                  <v-icon color="deep-orange">
                    mdi-translate
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ $t('nav.menu.display_language') }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-card>
              <v-card-title class="deep-orange white--text">
                {{ $t('nav.menu.display_language_dialog.title') }}
              </v-card-title>

              <v-card-text>
                <v-radio-group
                  v-model="selectedDisplayLanguage"
                  dense
                  mandatory
                >
                  <v-radio
                    v-for="l in Object.keys(displayLanguages)"
                    :key="l"
                    color="deep-orange"
                    :label="displayLanguages[l]"
                    :value="l"
                  />
                </v-radio-group>
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="error"
                  text
                  @click="closeDisplayLanguageDialog"
                >
                  {{ $t('nav.menu.display_language_dialog.cancel') }}
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="changeDisplayLanguage"
                >
                  {{ $t('nav.menu.display_language_dialog.change') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-divider />

          <router-link to="/help">
            <v-list-item disabled>
              <v-list-item-icon>
                <v-icon
                  disabled
                  color="deep-orange"
                >
                  mdi-help-circle-outline
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.help') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/contact">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">
                  mdi-at
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.contact') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/report">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">
                  mdi-flag-outline
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.report') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/terms">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">
                  mdi-book-open-blank-variant
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.terms') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/privacy">
            <v-list-item disabled>
              <v-list-item-icon>
                <v-icon
                  disabled
                  color="deep-orange"
                >
                  mdi-lock
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.privacy') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <v-divider />

          <a :href="statusServiceUrl">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">mdi-thermostat</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.status.status') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('nav.menu.status.info') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </a>

          <v-divider />

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle class="em-08">
                Vevericka &copy; 2021
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {router} from '@/router';
import {Component, Vue} from 'vue-property-decorator';
import {displayLanguages} from '@/data/displayLanguages';
import {publicPages} from '@/data/ApplicationConstants';
import UserService from '@/api/user';

@Component({
  name: 'App',

})
export default class App extends Vue {
  searchTerm = ''
  imgURL = ''
  isAppBarSearchFocused = false
  readonly statusServiceUrl: string = 'https://veverickastatus.surge.sh/'
  displayLanguages = displayLanguages.data
  selectedDisplayLanguage = ''
  displayLanguageDialog = false

  mounted(): void {
    this.setTheme();
    this.setDisplayLanguage();
    this.selectedDisplayLanguage = this.$i18n.locale;
  }

  updated(): void {
    if (this.imgURL === '') {
      this.getImageURL();
    }

    if (!this.showNavbar) {
      this.imgURL = '';
    }
  }

  closeDisplayLanguageDialog(): void {
    this.selectedDisplayLanguage = '';
    this.displayLanguageDialog = false;
  }

  changeDisplayLanguage(): void {
    this.$i18n.locale = this.selectedDisplayLanguage;
    localStorage.setItem('veverickaDisplayLanguage', this.selectedDisplayLanguage);
    this.displayLanguageDialog = false;
  }

  setTheme(): void {
    const theme = localStorage.getItem('veverickaTheme');
    this.$vuetify.theme.dark = theme === '"dark"';
  }

  setDisplayLanguage(): void {
    const lang = localStorage.getItem('veverickaDisplayLanguage');
    if (typeof lang !== 'string' || lang.length !== 2) {
      this.$root.$i18n.locale = 'en';
    } else {
      this.$root.$i18n.locale = lang;
    }
  }

  toggleDarkMode(): void {
    const isDark = this.$vuetify.theme.dark;

    if (isDark) {
      this.$vuetify.theme.dark = false;
      localStorage.setItem('veverickaTheme', JSON.stringify('light'));
    } else {
      this.$vuetify.theme.dark = true;
      localStorage.setItem('veverickaTheme', JSON.stringify('dark'));
    }
  }

  logout(): void {
    localStorage.setItem('veverickaTheme', 'light');
    this.$vuetify.theme.dark = false;
    this.$store.dispatch('logout');
  }

  async search(): Promise<void> {
    if (this.searchTerm.length > 0) {
      this.$store.state.gSearchTerm = this.searchTerm;
      await router.push('/search');
    }
  }

  async getImageURL(): Promise<void> {
    const username = this.$store.state.user.username;

    if (username === '') {
      return;
    }

    try {
      const user = await UserService.getUserByUsername(username);
      if (user.image === 'profile.png') {
        this.imgURL = '/profile.png';
      } else {
        this.imgURL = user.image;
      }
    } catch (e) {
      console.error(e);
    }
  }

  get isDarkModeEnabled(): boolean {
    return this.$vuetify.theme.dark;
  }

  get showNavbar(): boolean {
    return publicPages.every(page => this.$route.path !== page);
  }

  get appBarColor(): string {
    return this.$vuetify.theme.dark ? '#272727' : '#FFF';
  }

  get textFieldBackground(): string {
    return this.$vuetify.theme.dark ? '#1e1e1e' : '#f0f2f5';
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.em-08 {
  font-size: 0.7em !important;
}
</style>
