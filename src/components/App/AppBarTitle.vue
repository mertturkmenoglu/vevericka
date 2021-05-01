<template>
  <div class="app-bar-title">
    <router-link
      to="/"
      class="text-decoration-none"
      aria-label="App Icon"
    >
      <v-img
        class="mx-4"
        src="../../assets/icon_primary.svg"
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
  </div>
</template>

<style lang="scss" scoped>
.app-bar-title {
  display: flex;
  align-items: center;
}
</style>
