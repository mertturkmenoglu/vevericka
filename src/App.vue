<template>
  <v-app>
    <v-app-bar app v-if="showNavbar" flat short elevate-on-scroll :color="appBarColor">
      <router-link to="/" class="text-decoration-none">
        <v-img
            class="mx-4"
            src="./assets/icon_primary.svg"
            max-height="32"
            max-width="32"
            contain
        />
      </router-link>

      <router-link to="/" class="text-decoration-none deep-orange--text">
        <v-toolbar-title class="font-weight-light hidden-xs-only text-h5">Vevericka</v-toolbar-title>
      </router-link>

      <v-row justify="end">
        <v-col cols="12" sm="3">
          <v-text-field
              v-model="searchTerm"
              :background-color="textFieldBackground"
              append-icon="mdi-magnify"
              color="deep-orange"
              @click:append="search"
              @keyup.enter.native="search"
              class="mt-6 hidden-sm-and-down"
              flat
              rounded
              dense
              clearable
              :prefix="isAppBarSearchFocused ? '@' : ''"
              @focusin="isAppBarSearchFocused = true"
              @focusout="isAppBarSearchFocused = false"
              single-line
              solo
              :label="$t('nav.bar.search')"
              type="text"
          />
        </v-col>
      </v-row>

      <router-link to="/search">
        <v-btn icon color="deep-orange" class="hidden-md-and-up">
          <v-avatar class="ml-1">
            <v-icon color="deep-orange" size="32">mdi-magnify</v-icon>
          </v-avatar>
        </v-btn>
      </router-link>

      <router-link to="/notifications">
        <v-btn icon color="deep-orange">
          <v-avatar class="ml-1" size="40">
            <v-icon color="deep-orange" size="32">mdi-bell-outline</v-icon>
          </v-avatar>
        </v-btn>
      </router-link>

      <router-link to="/messages">
        <v-btn icon color="deep-orange">
          <v-avatar class="ml-1" size="40">
            <v-icon color="deep-orange" size="32">mdi-email-outline</v-icon>
          </v-avatar>
        </v-btn>
      </router-link>

      <v-menu left bottom nudge-left="24" nudge-bottom="48">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" color="deep-orange">
            <v-avatar size="40">
              <v-icon color="deep-orange" size="32">mdi-chevron-down</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list flat class="text-decoration-none font-weight-light" dense>
          <router-link :to="{ name: 'UserPage', params: { username: this.$store.state.user.username } }">
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar size="40">
                  <v-img
                      class="rounded-circle mx-auto"
                      :src="imgURL"
                      contain
                      width="12"
                      aspect-ratio="1"
                      alt="Profile"/>
                </v-avatar>
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

          <v-divider></v-divider>

          <router-link to="/explore">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">mdi-pound</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.explore') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>


          <router-link to="/bookmarks">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">mdi-bookmark-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.bookmarks') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/settings">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">mdi-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.settings') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <v-list-item @click="toggleDarkMode">
            <v-list-item-icon>
              <v-icon color="deep-orange">mdi-brightness-6</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ $t('nav.menu.dark_theme') }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-checkbox color="deep-orange" :input-value="isDarkModeEnabled"/>
            </v-list-item-action>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon color="deep-orange">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('nav.menu.logout') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-dialog v-model="displayLanguageDialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item @click="displayLanguageDialog = true" v-bind="attrs" v-on="on">
                <v-list-item-icon>
                  <v-icon color="deep-orange">mdi-translate</v-icon>
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
                <v-radio-group v-model="selectedDisplayLanguage" dense mandatory>
                  <v-radio
                      v-for="l in Object.keys(displayLanguages)"
                      color="deep-orange"
                      :key="l"
                      :label="displayLanguages[l]"
                      :value="l"
                  ></v-radio>
                </v-radio-group>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="closeDisplayLanguageDialog">
                  {{ $t('nav.menu.display_language_dialog.cancel') }}
                </v-btn>
                <v-btn color="primary" text @click="changeDisplayLanguage">
                  {{ $t('nav.menu.display_language_dialog.change') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-divider></v-divider>

          <router-link to="/help">
            <v-list-item disabled>
              <v-list-item-icon>
                <v-icon disabled color="deep-orange">mdi-help-circle-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.help') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/contact">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">mdi-at</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.contact') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/report">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">mdi-flag-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.report') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/terms">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">mdi-book-open-blank-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.terms') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/privacy">
            <v-list-item disabled>
              <v-list-item-icon>
                <v-icon disabled color="deep-orange">mdi-lock</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.menu.privacy') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <v-divider></v-divider>

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

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle class="em-08">Vevericka &copy; 2021</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {router} from "@/router";
import {Component, Vue} from "vue-property-decorator";
import {displayLanguages} from "@/data/displayLanguages";
import UserInfoService from "@/api/UserInfoService";
import {publicPages} from "@/data/ApplicationConstants";

@Component({
  name: "App",

})
export default class App extends Vue {
  searchTerm: string = ""
  imgURL: string = ""
  isAppBarSearchFocused: boolean = false
  readonly statusServiceUrl: string = "https://veverickastatus.surge.sh/"
  displayLanguages = displayLanguages.data
  selectedDisplayLanguage: string = ""
  displayLanguageDialog: boolean = false

  mounted() {
    this.setTheme();
    this.setDisplayLanguage();
    this.getImageURL();
    this.selectedDisplayLanguage = this.$i18n.locale;
  }

  updated() {
    if (this.imgURL === '') {
      this.getImageURL();
    }

    if (!this.showNavbar) {
      this.imgURL = '';
    }
  }

  closeDisplayLanguageDialog() {
    this.selectedDisplayLanguage = '';
    this.displayLanguageDialog = false;
  }

  changeDisplayLanguage() {
    this.$i18n.locale = this.selectedDisplayLanguage;
    localStorage.setItem("veverickaDisplayLanguage", this.selectedDisplayLanguage);
    this.displayLanguageDialog = false;
  }

  setTheme() {
    const theme = localStorage.getItem('veverickaTheme');
    this.$vuetify.theme.dark = theme === '"dark"';
  }

  setDisplayLanguage() {
    const lang = localStorage.getItem('veverickaDisplayLanguage');
    if (typeof lang !== 'string' || lang.length !== 2) {
      this.$root.$i18n.locale = 'en';
    } else {
      this.$root.$i18n.locale = lang;
    }
  }

  toggleDarkMode() {
    const isDark = this.$vuetify.theme.dark;

    if (isDark) {
      this.$vuetify.theme.dark = false;
      localStorage.setItem('veverickaTheme', JSON.stringify('light'));
    } else {
      this.$vuetify.theme.dark = true;
      localStorage.setItem('veverickaTheme', JSON.stringify('dark'));
    }
  }

  logout() {
    localStorage.setItem('veverickaTheme', 'light');
    this.$vuetify.theme.dark = false;
    this.$store.dispatch("logout");
  }

  async search() {
    if (this.searchTerm.length > 0) {
      this.$store.state.gSearchTerm = this.searchTerm;
      await router.push('/search');
    }
  }

  async getImageURL() {
    const username = this.$store.state.user.username;

    if (username === undefined) {
      return;
    }

    const [user, err] = await UserInfoService.getUserByUsername(username);

    if (err === null && user !== null) {
      this.imgURL = user.image;
    }
  }

  get isDarkModeEnabled(): boolean {
    return this.$vuetify.theme.dark;
  }

  get showNavbar(): boolean {
    return publicPages.every(page => this.$route.path !== page);
  }

  get appBarColor(): string {
    return this.$vuetify.theme.dark ? "#272727" : "#FFF";
  }

  get textFieldBackground(): string {
    return this.$vuetify.theme.dark ? "#1e1e1e" : "#f0f2f5";
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
