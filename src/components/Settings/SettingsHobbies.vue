<template>
  <v-card flat>
    <v-card-title class="text-body-1">Hobbies & Features</v-card-title>
    <v-card-subtitle class="font-weight-light">Edit your hobbies and features</v-card-subtitle>

    <v-divider class="ml-4 mr-4"></v-divider>

    <v-card-text>
      <v-card flat>
        <v-card-title>
          <span class="text-body-1">Hobbies</span>
          <v-dialog v-model="hobbyDialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="deep-orange" class="ml-2" v-bind="attrs" v-on="on">
                +
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Hobby</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-text-field
                      v-model="newHobby"
                      label="What do you like?"
                      outlined
                      solo
                      flat
                      prepend-inner-icon="mdi-star-shooting-outline"
                      color="deep-orange"
                      type="text"
                      required
                  />
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="hobbyDialog = false">
                  Close
                </v-btn>
                <v-btn color="deep-orange" text @click="addHobby">
                  Add
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-card-subtitle>What are your interests?</v-card-subtitle>
        <v-card-text>
          <v-list-item v-for="(h,idx) in user.hobbies" :key="idx">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="deep-orange">mdi-star-shooting-outline</v-icon>
                {{ h }}
                <v-icon color="deep-orange" right @click="deleteHobby(idx)">mdi-close</v-icon>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
      </v-card>

      <v-divider class="ml-4 mr-4"></v-divider>

      <v-card flat>
        <v-card-title>
          <span class="text-body-1">Features</span>
          <v-dialog v-model="featureDialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="deep-orange" class="ml-2" v-bind="attrs" v-on="on">
                +
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Feature</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-text-field
                      v-model="newFeature"
                      label="What do you like?"
                      outlined
                      solo
                      flat
                      prepend-inner-icon="mdi-star-shooting-outline"
                      color="deep-orange"
                      type="text"
                      required
                  />
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="featureDialog = false">
                  Close
                </v-btn>
                <v-btn color="deep-orange" text @click="addFeature">
                  Add
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-card-subtitle>What are your passions? Add up to 5 features</v-card-subtitle>
        <v-card-text>
          <v-list-item v-for="(f,idx) in user.features" :key="idx">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="deep-orange">mdi-star-shooting-outline</v-icon>
                {{ f }}
                <v-icon color="deep-orange" right @click="deleteFeature(idx)">mdi-close</v-icon>
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
  name: "SettingsHobbies",
  props: ["user"],
  data: () => ({
    featureDialog: false,
    hobbyDialog: false,
    newFeature: '',
    newHobby: '',
  }),
  methods: {
    addFeature() {
      if (this.user.features.length !== 5) {
        this.user.features.push(this.newFeature);
      }

      this.featureDialog = false;
      this.newFeature = '';
    },
    addHobby() {
      this.user.hobbies.push(this.newHobby);
      this.hobbyDialog = false;
      this.newHobby = '';
    },
    deleteFeature(idx) {
      this.user.features.splice(idx, 1);
    },
    deleteHobby(idx) {
      this.user.hobbies.splice(idx, 1);
    },
    update() {
      this.$emit("update", this.user);
    }
  },
}
</script>

<style scoped>

</style>