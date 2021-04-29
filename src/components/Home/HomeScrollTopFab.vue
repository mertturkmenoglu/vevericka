<template>
  <v-fab-transition>
    <v-btn
      v-if="showFab"
      fab
      bottom
      small
      absolute
      fixed
      color="deep-orange"
      dark
      right
      class="mb-10"
      aria-label="Scroll to Top"
      @click="scrollToTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class HomeScrollTopFab extends Vue {
  showFab = false

  created(): void {
    window.addEventListener('scroll', this.handleScroll);
  }

  destroyed(): void {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(): void {
    this.showFab = window.scrollY > 0;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
</script>
