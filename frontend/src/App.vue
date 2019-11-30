<template>
  <div class="app-wrapper">
    <div id="app" ref="app">
      <div class="tool">
        <h1>homography-assistant</h1>
        <process-controller @send="handleSend" v-model="resultCanvas.options" />
      </div>
      <div class="selector-wrapper">
        <points-selector id="img-1" ref="img1" />
        <points-selector id="img-2" ref="img2" />
      </div>
      <result-canvas
        ref="resultCanvas"
        :overlayImage="resultCanvas.overlayImage"
        :baseImage="resultCanvas.baseImage"
        :width="this.$refs.app.clientWidth"
        :isOverlayImageVisible="resultCanvas.options.overlayImage.visible"
        :overlayImageOpacity="resultCanvas.options.overlayImage.opacity"
        v-if="resultCanvas.overlayImage !== null"
      />
    </div>
  </div>
</template>

<script>
import PointsSelector from "./components/PointsSelector.vue"
import ProcessController from "./components/ProcessController.vue"
import ResultCanvas from "./components/ResultCanvas.vue"
import axios from "axios"

export default {
  name: "app",
  components: {
    PointsSelector,
    ProcessController,
    ResultCanvas,
  },
  data() {
    return {
      resultCanvas: {
        overlayImage: null,
        baseImage: null,
        options: {
          overlayImage: {
            visible: true,
            opacity: 1.0,
          },
        },
      },
    }
  },
  methods: {
    extractCoordinatesFromPoints(points) {
      return points.map(point => Object.values(point.pos))
    },
    handleSend() {
      const pointsA = this.extractCoordinatesFromPoints(
        this.$refs.img1.$data.points
      )
      const pointsB = this.extractCoordinatesFromPoints(
        this.$refs.img2.$data.points
      )

      if (pointsA.length < 4 || pointsB.length < 4) {
        console.debug(`PointsA and PointsB require at least 4 items`)
        alert(`PointsA and PointsB require at least 4 items`)
        return
      }

      if (pointsA.length != pointsB.length) {
        console.debug(`PointsA and PointsB must be same size`)
        alert(`PointsA and PointsB must be same size`)
        return
      }

      console.debug(`send: ${JSON.stringify(pointsA)}`)
      console.debug(`send: ${JSON.stringify(pointsB)}`)

      axios
        .post("/api", {
          pointsA: pointsA,
          pointsB: pointsB,
          width: this.$refs.img2.$data.image.naturalWidth,
          height: this.$refs.img2.$data.image.naturalHeight,
          img: this.$refs.img1.$data.image.src.split(",")[1],
        })
        .then(resp => {
          console.debug(resp.data)
          const image = new Image()
          image.onload = () => {
            this.resultCanvas.overlayImage = image
          }
          image.src = resp.data["img"]
          this.resultCanvas.baseImage = this.$refs.img2.$data.image
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

.app-wrapper {
  width: 100%;
  height: 100%;
  padding: 0px 16px;
  box-sizing: border-box;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.tool {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.selector-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
