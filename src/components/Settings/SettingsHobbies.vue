<template>
  <v-card flat>
    <v-card-title class="text-body-1">
      {{ $t('settings.hobbies.title') }}
    </v-card-title>
    <v-card-subtitle class="font-weight-light">
      {{ $t('settings.hobbies.subtitle') }}
    </v-card-subtitle>

    <v-divider class="ml-4 mr-4" />

    <v-card-text>
      <v-card flat>
        <v-card-title>
          <span class="text-body-1">{{ $t('settings.hobbies.hobbies.title') }}</span>
          <v-dialog
            v-model="hobbyDialog"
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
                <span class="headline">{{ $t('settings.hobbies.hobbies.dialog.title') }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-text-field
                    v-model="newHobby"
                    :label="$t('settings.hobbies.hobbies.dialog.question')"
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
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="hobbyDialog = false"
                >
                  {{ $t('settings.hobbies.hobbies.dialog.close') }}
                </v-btn>
                <v-btn
                  color="deep-orange"
                  text
                  @click="addHobby"
                >
                  {{ $t('settings.hobbies.hobbies.dialog.add_button') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-card-subtitle>{{ $t('settings.hobbies.hobbies.subtitle') }}</v-card-subtitle>
        <v-card-text>
          <v-list-item
            v-for="(h,idx) in user.hobbies"
            :key="idx"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="deep-orange">
                  mdi-star-shooting-outline
                </v-icon>
                {{ h }}
                <v-icon
                  color="deep-orange"
                  right
                  @click="deleteHobby(idx)"
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
          <span class="text-body-1">{{ $t('settings.hobbies.features.title') }}</span>
          <v-dialog
            v-model="featureDialog"
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
                <span class="headline">{{ $t('settings.hobbies.features.dialog.title') }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-text-field
                    v-model="newFeature"
                    :label="$t('settings.hobbies.features.dialog.question')"
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
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="featureDialog = false"
                >
                  {{ $t('settings.hobbies.features.dialog.close') }}
                </v-btn>
                <v-btn
                  color="deep-orange"
                  text
                  @click="addFeature"
                >
                  {{ $t('settings.hobbies.features.dialog.add_button') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-card-subtitle>{{ $t('settings.hobbies.features.subtitle') }}</v-card-subtitle>
        <v-card-text>
          <v-list-item
            v-for="(f,idx) in user.features"
            :key="idx"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon color="deep-orange">
                  mdi-star-shooting-outline
                </v-icon>
                {{ f }}
                <v-icon
                  color="deep-orange"
                  right
                  @click="deleteFeature(idx)"
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
export default class SettingsHobbies extends Vue {
  @Prop({ required: true }) user!: IUser;
  featureDialog = false;
  hobbyDialog = false;
  newFeature = '';
  newHobby = '';

  addFeature(): void {
    if (this.user.features.length !== 5) {
      this.user.features.push(this.newFeature);
    }

    this.featureDialog = false;
    this.newFeature = '';
  }

  addHobby(): void {
    this.user.hobbies.push(this.newHobby);
    this.hobbyDialog = false;
    this.newHobby = '';
  }

  deleteFeature(idx): void {
    this.user.features.splice(idx, 1);
  }

  deleteHobby(idx): void {
    this.user.hobbies.splice(idx, 1);
  }

  @Emit('update')
  update(): void {
    this.$emit('update', this.user);
  }
}
</script>

<style scoped>

</style>
