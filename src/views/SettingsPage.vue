<template>
  <v-container>

  <v-card>
    <v-toolbar flat color="#dd2c00" dark>
      <v-toolbar-title>Settings</v-toolbar-title>
    </v-toolbar>
    <v-tabs
        color="#dd2c00"
        next-icon="mdi-chevron-right"
        prev-icon="mdi-chevron-left"
        show-arrows>
      <v-tab>
        <v-icon left>
          mdi-account
        </v-icon>
        User
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-account-edit-outline
        </v-icon>
        Other
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-account-voice
        </v-icon>
        Languages
      </v-tab>

      <v-tab-item>
        <v-card class="mt-5" flat>
          <v-row>
            <v-col>
              <v-text-field
                  v-model="user.username"
                  outlined
                  disabled
                  class="mx-5 mt-5"
                  color="#dd2c00"
                  label="Username"
                  type="text"
              />
            </v-col>
            <v-col>
              <v-text-field
                  v-model="user.name"
                  outlined
                  class="mx-5 mt-5"
                  color="#dd2c00"
                  label="Name"
                  type="text"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                  v-model="user.twitter"
                  outlined
                  class="mx-5"
                  color="#dd2c00"
                  label="Twitter Username"
                  type="text"
              />
            </v-col>
            <v-col>
              <v-text-field
                  v-model="user.gender"
                  outlined
                  class="mx-5"
                  color="#dd2c00"
                  label="Gender"
                  type="text"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                  v-model="user.location.city"
                  outlined
                  class="mx-5"
                  color="#dd2c00"
                  label="City"
                  type="text"
              />
            </v-col>
            <v-col>
              <v-text-field
                  v-model="user.location.country"
                  outlined
                  class="mx-5"
                  color="#dd2c00"
                  label="Country"
                  type="text"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                  v-model="user.job"
                  outlined
                  class="mx-5"
                  color="#dd2c00"
                  label="Job"
                  type="text"
              />
            </v-col>
            <v-col>
              <v-text-field
                  v-model="user.school"
                  outlined
                  class="mx-5"
                  color="#dd2c00"
                  label="School"
                  type="text"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="mt-5" flat>
          <v-text-field
              v-model="user.image"
              outlined
              class="pt-5 mx-5"
              color="#dd2c00"
              label="Profile Image Link"
              type="text"
          />

          <v-text-field
              v-model="user.website"
              outlined
              class="pt-5 mx-5"
              color="#dd2c00"
              label="Website"
              type="text"
          />
        </v-card>

        <v-card class="mt-5" flat>
          <v-row>
            <v-col>
              <v-container fill-height>
                <v-textarea
                    v-model="user.bio"
                    outlined
                    class="pt-5 mx-5"
                    color="#dd2c00"
                    label="Bio"
                    type="text"
                />
              </v-container>
            </v-col>
            <v-col class="text-center">
              <v-col>
                <v-date-picker v-model="picker"></v-date-picker>
              </v-col>
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="mt-5" flat>
          <v-row class="px-5">
            <v-col>
              <v-text-field
                  v-model="newHobby"
                  append-outer-icon="mdi-plus"
                  @click:append-outer="addHobby"
                  outlined
                  color="#dd2c00"
                  label="New Hobby"
                  type="text"
              />
              <div v-for="(h, idx) in user.hobbies" :key="idx">
                <v-text-field
                    :value="h"
                    prepend-inner-icon="mdi-close"
                    @click="() => filterHobbies(h)"
                    label="Hobby"
                    solo
                    readonly
                />
              </div>
            </v-col>

            <v-col>
              <v-text-field
                  v-model="newFeature"
                  append-outer-icon="mdi-plus"
                  @click:append-outer="addFeature"
                  outlined
                  color="#dd2c00"
                  label="Add Feature"
                  type="text"
                  class="disabled"
              />
              <div v-for="(f, idx) in user.features" :key="idx">
                <v-text-field
                    :value="f"
                    prepend-inner-icon="mdi-close"
                    @click="() => filterFeatures(f)"
                    label="Feature"
                    solo
                    readonly
                />
              </div>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="mt-5">
          <v-row>
            <v-col>
              <v-container fill-height>
                <v-select
                    v-model="user.wish_to_speak"
                    :items="availableLanguages"
                    chips
                    class="mx-3"
                    label="Wish to speak"
                    multiple
                    outlined
                ></v-select>
              </v-container>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                  v-model="newLanguage"
                  :items="availableLanguages"
                  chips
                  class="mx-5"
                  label="Languages"
                  outlined
              />
            </v-col>
            <v-col>
              <v-select
                  v-model="newProficiency"
                  :items="availableProficiencies"
                  chips
                  class="mx-5"
                  label="Proficiency"
                  outlined
              />
            </v-col>
          </v-row>

          <v-container class="mx-2">
            <v-btn outlined color="#dd2c00" @click="addLanguage">
              Add
              <v-icon right>mdi-plus</v-icon>
            </v-btn>
          </v-container>

          <v-container>
            <v-row v-for="(l, idx) in user.languages" :key="idx" class="mx-3">
              <v-text-field
                  :value="`${l.language}-${l.proficiency}`"
                  prepend-inner-icon="mdi-close"
                  @click="() => filterLanguages(l)"
                  label="Feature"
                  solo
                  readonly
              />
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
    <v-btn block outlined color="#dd2c00" @click="update" class="my-5"> Update</v-btn>
  </v-container>
</template>

<script>
  export default {
    name: "SettingsPage",
    data: () => ({
      user: {location: {}},
      loadingCompleted: false,
      picker: "",
      newHobby: "",
      newFeature: "",
      newLanguage: "",
      newProficiency: "",
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
      async fetchUser() {
        const username = this.$store.state.user.username;
        const BASE = "https://user-info-service.herokuapp.com";
        const URL = `${BASE}/user/username/${username}`;

        const response = await fetch(URL);
        const data = await response.json();
        this.user = data.user[0];
        this.user.location = this.user.location
            ? this.user.location
            : {city: "", country: ""};
        this.loadingCompleted = true;
      },
      filterHobbies(h) {
        this.user.hobbies = this.user.hobbies.filter((e) => e != h);
      },
      filterFeatures(f) {
        this.user.features = this.user.features.filter((e) => e != f);
      },
      filterLanguages(l) {
        this.user.languages = this.user.languages.filter(
            (e) => e.language != l.language
        );
      },
      addHobby() {
        this.user.hobbies.push(this.newHobby);
        this.newHobby = "";
      },
      addFeature() {
        if (this.user.features.length >= 5) {
          return;
        }

        this.user.features.push(this.newFeature);
        this.newFeature = "";
      },
      addLanguage() {
        const langs = this.user.languages;
        const cond = langs.indexOf((e) => e.language == this.newLanguage) != -1;

        if (cond || this.newLanguage == "" || this.newProficiency == "") {
          return;
        }

        this.user.languages.push({
          language: this.newLanguage,
          proficiency: this.newProficiency,
        });
        this.newLanguage = "";
        this.newProficiency = "";
      },
      async update() {
        const BASE = "https://user-info-service.herokuapp.com/user";
        const URL = `${BASE}/${this.user._id}`;

        this.user.bdate = this.picker;

        const requestOptions = {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(this.user),
        };

        const response = await fetch(URL, requestOptions);
        const data = await response.json();

        if (data.status_code) {
          return;
        }

        window.location.reload();
      },
    },
    mounted() {
      this.fetchUser();
    },
    watch: {
      loadingCompleted() {
        this.picker = this.user.bdate.substr(0, 10);
      },
    },
  };
</script>

<style>
</style>
