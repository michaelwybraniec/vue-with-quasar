<template>
  <q-page class="q-pa-lg bg-grey-2">
    <div class="no-favorite-heroes absolute-center">
      <div class="text-h6 text-primary text-center">
        Click
        <q-btn
          class="q-ml-sm q-mr-sm"
          color="primary"
          unelevated
          icon="search"
          to="/"
        >
          Search
        </q-btn>
        to add your first favourite hero!
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Heroes",
  data() {
    return {
      expanded: false
    };
  }
};
</script>

<style lang="scss">
.my-card {
  width: 80%;
  height: 10px;
  max-width: 350px;
}
.no-favorite-heroes {
  opacity: 0.5;
}
</style>
