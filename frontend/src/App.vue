<template>
  <div id="app">
    <h1>homography-assistant</h1>
    <div class="selector-wrapper">
      <points-selector id="img-1" ref="img1" />
      <points-selector id="img-2" ref="img2" />
    </div>
    <process-controller @send="handleSend" />
  </div>
</template>

<script>
import PointsSelector from "./components/PointsSelector.vue"
import ProcessController from "./components/ProcessController.vue"
import axios from "axios"

export default {
  name: "app",
  components: {
    PointsSelector,
    ProcessController,
  },
  methods: {
    handleSend() {
      console.debug(`test: ${JSON.stringify(this.$refs.img1.$data.points)}`)
      console.debug(`test: ${JSON.stringify(this.$refs.img2.$data.points)}`)

      axios
        .post("/api", {
          ptsa: this.$refs.img1.$data.points.map(function(d) {
            return Object.values(d.pos)
          }),
          ptsb: this.$refs.img2.$data.points.map(function(d) {
            return Object.values(d.pos)
          }),
          width: this.$refs.img2.$data.image.naturalWidth,
          height: this.$refs.img2.$data.image.naturalHeight,
          img: this.$refs.img1.$data.image.src.split(",")[1],
        })
        .then(resp => console.debug(resp.data))
        .catch(error => console.debug(error))
    },
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
