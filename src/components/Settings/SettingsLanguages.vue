<template>
  <v-card flat>
    <v-card-title class="text-body-1">Languages</v-card-title>
    <v-card-subtitle class="font-weight-light">Tune your language settings</v-card-subtitle>

    <v-divider class="ml-4 mr-4"></v-divider>

    <v-card-text>
      <v-card flat>
        <v-card-title>
          <span class="text-body-1">I am speaking:</span>
          <v-dialog v-model="languageDialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="deep-orange" class="ml-2" v-bind="attrs" v-on="on">
                +
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Language</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-select
                      v-model="newLanguage"
                      :items="availableLanguages"
                      label="Language"
                      required
                  />
                  <v-select
                      v-model="newProficiency"
                    :items="availableProficiencies"
                    label="Proficiency"
                    required
                  />
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="languageDialog = false">
                  Close
                </v-btn>
                <v-btn color="deep-orange" text @click="addLanguage">
                  Add
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-card-subtitle>Languages you can speak</v-card-subtitle>
        <v-card-text>
          <v-list-item v-for="(lang,idx) in user.languages" :key="idx">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="deep-orange">mdi-chevron-right</v-icon>
                {{ lang.language }} - {{ lang.proficiency }}
                <v-icon color="deep-orange" right small @click="deleteLanguage(idx)">mdi-close</v-icon>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
      </v-card>

      <v-divider class="ml-4 mr-4"></v-divider>

      <v-card flat>
        <v-card-title>
          <span class="text-body-1">I want to speak: </span>
          <v-dialog v-model="wishToSpeakDialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="deep-orange" class="ml-2" v-bind="attrs" v-on="on">
                +
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Language</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-select
                      v-model="newWishToSpeak"
                      :items="availableLanguages"
                      label="Language"
                      required
                  ></v-select>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="wishToSpeakDialog = false">
                  Close
                </v-btn>
                <v-btn color="deep-orange" text @click="addWishToSpeak">
                  Add
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-card-subtitle>What languages do you want to speak?</v-card-subtitle>
        <v-card-text>
          <v-list-item v-for="(l,idx) in user.wish_to_speak" :key="idx">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="deep-orange">mdi-chevron-right</v-icon>
                {{ l }}
                <v-icon color="deep-orange" right @click="deleteWishToSpeak(idx)">mdi-close</v-icon>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined small color="deep-orange" class="mr-2" @click="update">Update</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SettingsLanguages",
  props: ["user"],
  data: () => ({
    languageDialog: false,
    wishToSpeakDialog: false,
    newLanguage: '',
    newProficiency: '',
    newWishToSpeak: '',
    availableLanguages: [
      "Chinese",
      "Spanish",
      "English",
      "Portuguese",
      "Russian",
      "Japanese",
      "Turkish",
      "Korean",
      "French",
      "German",
      "Italian",
      "Arabic",
      "Indonesian",
      "Polish",
      "Romanian",
      "Dutch",
      "Kurdish",
      "Greek",
      "Hungarian",
      "Czech",
    ],
    availableProficiencies: [
      "Elementary",
      "Intermediate",
      "Professional",
      "Native",
    ],
  }),
  methods: {
    addWishToSpeak() {
      if (this.newWishToSpeak === '') {
        return;
      }

      for (const l of this.user.wish_to_speak) {
        if (l === this.newWishToSpeak) {
          return;
        }
      }

      this.user.wish_to_speak.push(this.newWishToSpeak);
      this.newWishToSpeak = '';
      this.wishToSpeakDialog = false;
    },
    deleteWishToSpeak(idx) {
      this.user.wish_to_speak.splice(idx, 1);
    },
    addLanguage() {
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
    },
    deleteLanguage(idx) {
      this.user.languages.splice(idx, 1);
    },
    update() {
      this.$emit("update", this.user);
    }
  }
}
</script>

<style scoped>

</style>