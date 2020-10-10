<template>
  <v-app>
    <Navbar />
    <v-container>
      <v-btn block outlined color="#dd2c00" @click="update"> Update </v-btn>

      <v-row>
        <v-col>
          <v-text-field
            v-model="user.username"
            outlined
            disabled
            color="#dd2c00"
            label="Username"
            type="text"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="user.name"
            outlined
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
            color="#dd2c00"
            label="Twitter Username"
            type="text"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="user.gender"
            outlined
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
            color="#dd2c00"
            label="City"
            type="text"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="user.location.country"
            outlined
            color="#dd2c00"
            label="Country"
            type="text"
          />
        </v-col>
      </v-row>

      <v-text-field
        v-model="user.image"
        outlined
        color="#dd2c00"
        label="Profile Image Link"
        type="text"
      />

      <v-text-field
        v-model="user.website"
        outlined
        color="#dd2c00"
        label="Website"
        type="text"
      />

      <v-row>
        <v-col>
          <v-text-field
            v-model="user.job"
            outlined
            color="#dd2c00"
            label="Job"
            type="text"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="user.school"
            outlined
            color="#dd2c00"
            label="School"
            type="text"
          />
        </v-col>
      </v-row>

      <v-textarea
        v-model="user.bio"
        outlined
        color="#dd2c00"
        label="Bio"
        type="text"
      />

      <v-row>
        <v-col>
          <v-select
            v-model="user.wish_to_speak"
            :items="availableLanguages"
            chips
            label="Wish to speak"
            multiple
            outlined
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
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

      <v-row>
        <v-col>
          <v-select
            v-model="newLanguage"
            :items="availableLanguages"
            chips
            label="Languages"
            outlined
          />
        </v-col>
        <v-col>
          <v-select
            v-model="newProficiency"
            :items="availableProficiencies"
            chips
            label="Proficiency"
            outlined
          />
        </v-col>
      </v-row>

      <v-btn block outlined color="#dd2c00" @click="addLanguage">
        Add
        <v-icon right>mdi-plus</v-icon>
      </v-btn>

      <v-container>
        <v-row v-for="(l, idx) in user.languages" :key="idx">
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

      <v-row class="text-center">
        <v-col>
          <v-date-picker v-model="picker"></v-date-picker>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "SettingsPage",
  components: { Navbar },
  data: () => ({
    user: { location: {} },
    loadingCompleted: false,
    picker: "",
    newHobby: "",
    newFeature: "",
    newLanguage: "",
    newProficiency: "",
    availableLanguages: [
      "English",
      "Spanish",
      "Japanese",
      "German",
      "Russian",
      "French",
      "Italian",
    ],
    availableProficiencies: [
      "Elementery",
      "Intermediate",
      "Professional",
      "Native",
    ],
  }),
  methods: {
    async fetchUser() {
      const username = this.$store.state.user.username;
      const CORS = "https://cors-anywhere.herokuapp.com";
      const BASE = "https://user-info-service.herokuapp.com";
      const URL = `${CORS}/${BASE}/user/username/${username}`;

      const response = await fetch(URL);
      const data = await response.json();
      this.user = data.user[0];
      this.user.location = this.user.location
        ? this.user.location
        : { city: "", country: "" };
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
      const CORS = "https://cors-anywhere.herokuapp.com";
      const BASE = "https://user-info-service.herokuapp.com/user";
      const URL = `${CORS}/${BASE}/${this.user._id}`;

      this.user.bdate = this.picker;

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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