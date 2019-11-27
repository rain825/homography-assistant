<template>
  <div id="app">
    <h1>homography-assistant</h1>
    <div class="selector-wrapper">
      <points-selector id="img-1" ref="img1" />
      <points-selector id="img-2" ref="img2" />
    </div>
    <div>
      <process-controller @send="handleSend" />
    </div>
    <div>
      <image-canvas
        :image="resultImage"
        :width="resultImageWidth"
        :points="points"
        v-if="resultImage !== null"
      />
    </div>
  </div>
</template>

<script>
import PointsSelector from "./components/PointsSelector.vue"
import ProcessController from "./components/ProcessController.vue"
import ImageCanvas from "./components/ImageCanvas.vue"
import axios from "axios"

export default {
  name: "app",
  components: {
    PointsSelector,
    ProcessController,
    ImageCanvas,
  },
  data() {
    return {
      resultImage: null,
      resultImageWidth: null,
      points: [],
    }
  },
  methods: {
    handleSend() {
      console.debug(`test: ${JSON.stringify(this.$refs.img1.$data.points)}`)
      console.debug(`test: ${JSON.stringify(this.$refs.img2.$data.points)}`)

      // どちらに変換するかによって変更
      this.resultImageWidth = this.$refs.img2.$data.image.naturalWidth
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
        .then(resp => {
          console.debug(resp.data)
          const image = new Image()
          image.onload = () => {
            this.resultImage = image
          }
          image.src = "data:image/jpeg;base64," + resp.data["img"]
        })
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
