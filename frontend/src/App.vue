<template>
  <div id="app">
    <h1>homography-assistant</h1>
    <div class="selector-wrapper">
      <points-selector id="img-1" />
    </div>
  </div>
</template>

<script>
import PointsSelector from "./components/PointsSelector.vue"

export default {
  name: "app",
  components: {
    PointsSelector,
  },
}
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.selector-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
</style>
