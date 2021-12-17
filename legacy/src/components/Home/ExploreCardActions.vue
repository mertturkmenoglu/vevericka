<template>
  <v-card-actions>
    <v-spacer />
    <router-link to="/explore">
      <v-btn
        text
        color="deep-orange"
        rounded
      >
        {{ $t('home_page.explore_box.more') }}
      </v-btn>
    </router-link>
  </v-card-actions>
</template>
