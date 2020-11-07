<template>
  <v-card class="v-card" border="top" elevation="2">
    <v-row>
      <v-col cols="12" class="mx-auto">
        <v-img class="rounded-circle mx-auto rec-img"
               :src="user.image"
               aspect-ratio="1"
               elevation="12"
               alt="User image"
               width="128"
        />
      </v-col>
    </v-row>
    <v-container>
      <v-col class="text-h4 text-center two-line-text text-truncate name-text">{{ user.name }}</v-col>
      <v-row>
        <v-col class="text-h6 text-center">
          <div class="social-text">{{ user.followers.length }} follower{{plural}}</div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: "Recommendation",
    props: ["user"],
    computed: {
      plural() {
        const l = this.user?.followers?.length;
        return (l === 0 || l > 1) ? 's' : '';
      }
    },
  }
</script>

<style lang="scss" scoped>
  * {
    --color-primary: #E64A19;
    --color-secondary: #c62828;
  }

  .name-text {
    color: #6F6F6F;
  }

  .v-card {
    border: 2px solid var(--color-primary) !important;
    transition: all 0.35s ease-out;
  }

  .social-text {
    color: var(--color-primary);
    font-size: 0.9em;
    opacity: 0;
  }

  .rec-img {
    border: 4px solid white !important;
  }

  .v-card:hover {
    transform: translateY(-5px) scale(1.005);
    box-shadow: 0 24px 36px rgba(0, 0, 0, 0.11),
    0 24px 46px rgba(255, 215, 97, 0.48) !important;
    background-color: var(--color-primary) !important;
    color: #fff;
    border: 2px solid var(--color-secondary) !important;

    .name-text {
      color: #fff;
    }

    .social-text {
      color: #fff;
      opacity: 1;
    }
  }

  @media screen and (max-width: 960px) {
    .two-line-text {
      line-height: 1.5em;
      height: 3em;
      overflow: hidden;
    }
  }
</style>
