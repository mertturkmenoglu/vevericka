<template>
  <v-card flat>
    <v-card-title class="text-body-1">
      {{ $t('settings.languages.title') }}
    </v-card-title>
    <v-card-subtitle class="font-weight-light">
      {{ $t('settings.languages.subtitle') }}
    </v-card-subtitle>

    <v-divider class="ml-4 mr-4" />

    <v-card-text>
      <v-card flat>
        <v-card-title>
          <span class="text-body-1">{{ $t('settings.languages.speaking.title') }}</span>
          <v-dialog
            v-model="languageDialog"
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                color="deep-orange"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                +
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ $t('settings.languages.speaking.dialog.title') }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-select
                    v-model="newLanguage"
                    :items="availableLanguages"
                    :label="$t('settings.languages.speaking.dialog.language')"
                    required
                  />
                  <v-select
                    v-model="newProficiency"
                    :items="availableProficiencies"
                    :label="$t('settings.languages.speaking.dialog.proficiency')"
                    required
                  />
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="languageDialog = false"
                >
                  {{ $t('settings.languages.speaking.dialog.close') }}
                </v-btn>
                <v-btn
                  color="deep-orange"
                  text
                  @click="addLanguage"
                >
                  {{ $t('settings.languages.speaking.dialog.add') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-card-subtitle>{{ $t('settings.languages.speaking.subtitle') }}</v-card-subtitle>
        <v-card-text>
          <v-list-item
            v-for="(lang,idx) in user.languages"
            :key="idx"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="deep-orange">
                  mdi-chevron-right
                </v-icon>
                {{ lang.language }} - {{ lang.proficiency }}
                <v-icon
                  color="deep-orange"
                  right
                  small
                  @click="deleteLanguage(idx)"
                >
                  mdi-close
                </v-icon>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
      </v-card>

      <v-divider class="ml-4 mr-4" />

      <v-card flat>
        <v-card-title>
          <span class="text-body-1">{{ $t('settings.languages.wish_to_speak.title') }}</span>
          <v-dialog
            v-model="wishToSpeakDialog"
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                color="deep-orange"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                +
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ $t('settings.languages.wish_to_speak.dialog.title') }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-select
                    v-model="newWishToSpeak"
                    :items="availableLanguages"
                    :label="$t('settings.languages.wish_to_speak.dialog.language')"
                    required
                  />
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="wishToSpeakDialog = false"
                >
                  {{ $t('settings.languages.wish_to_speak.dialog.close') }}
                </v-btn>
                <v-btn
                  color="deep-orange"
                  text
                  @click="addWishToSpeak"
                >
                  {{ $t('settings.languages.wish_to_speak.dialog.add') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-card-subtitle>{{ $t('settings.languages.wish_to_speak.subtitle') }}</v-card-subtitle>
        <v-card-text>
          <v-list-item
            v-for="(l,idx) in user.wishToSpeak"
            :key="idx"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="deep-orange">
                  mdi-chevron-right
                </v-icon>
                {{ l }}
                <v-icon
                  color="deep-orange"
                  right
                  @click="deleteWishToSpeak(idx)"
                >
                  mdi-close
                </v-icon>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        outlined
        small
        color="deep-orange"
        class="mr-2"
        @click="update"
      >
        {{ $t('settings.update') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Emit, Prop} from 'vue-property-decorator';
import IUser from '@/api/responses/IUser';

@Component({})
export default class SettingsLanguages extends Vue {
  @Prop({ required: true }) user!: IUser

  languageDialog = false;
  wishToSpeakDialog = false
  newLanguage = ''
  newProficiency = ''
  newWishToSpeak = ''
  readonly availableLanguages: [
    'Chinese',
    'Spanish',
    'English',
    'Portuguese',
    'Russian',
    'Japanese',
    'Turkish',
    'Korean',
    'French',
    'German',
    'Italian',
    'Arabic',
    'Indonesian',
    'Polish',
    'Romanian',
    'Dutch',
    'Kurdish',
    'Greek',
    'Hungarian',
    'Czech',
  ]

  readonly availableProficiencies: [
    'Elementary',
    'Intermediate',
    'Professional',
    'Native',
  ]

  addWishToSpeak(): void {
    if (this.newWishToSpeak === '') {
      return;
    }

    for (const l of this.user.wishToSpeak) {
      if (l === this.newWishToSpeak) {
        return;
      }
    }

    this.user.wishToSpeak.push(this.newWishToSpeak);
    this.newWishToSpeak = '';
    this.wishToSpeakDialog = false;
  }

  deleteWishToSpeak(idx): void {
    this.user.wishToSpeak.splice(idx, 1);
  }

  addLanguage(): void {
    if (this.newLanguage === '' || this.newProficiency === '') {
      return;
    }

    for (const l of this.user.languages) {
      if (l.language === this.newLanguage) {
        return;
      }
    }

    this.user.languages.push({language: this.newLanguage, proficiency: this.newProficiency});
    this.newLanguage = '';
    this.newProficiency = '';
    this.languageDialog = false;
  }

  deleteLanguage(idx): void {
    this.user.languages.splice(idx, 1);
  }

  @Emit('update')
  update(): void {
    this.$emit('update', this.user);
  }
}
</script>

<style scoped>

</style>
