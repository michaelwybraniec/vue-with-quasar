<template>
  <q-page class="q-pa-lg bg-grey-2">
    <h6 class="q-mt-none q-mb-none">Search <q-icon name="search" /></h6>
    <p>You can find heroes by providing their <b>NAME</b> or <b>ID</b> !</p>

    <!-- <HeroDetail
      :hero="selectedHero"
      @save="saveHero"
      @cancel="cancelHero"
      v-if="selectedHero"
    /> -->
  </q-page>
</template>

<script>
export default {
  name: "Heroes"
};
</script>
