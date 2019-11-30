<template>
  <div class="app-wrapper">
    <div id="app" ref="app">
      <div class="tool">
        <h1>homography-assistant</h1>
        <process-controller @send="handleSend" v-model="resultCanvas" />
      </div>
      <div class="selector-wrapper">
        <points-selector id="img-1" ref="img1" />
        <points-selector id="img-2" ref="img2" />
      </div>
      <result-canvas
        ref="resultCanvas"
        :config="resultCanvas"
        :width="canvasWidth"
        v-if="resultCanvas.overlayImage.image !== null"
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
      isMouted: false,
      resultCanvas: {
        overlayImage: {
          image: null,
          visible: true,
          opacity: 1.0,
        },
        baseImage: {
          image: null,
          visible: true,
          opacity: 1.0,
        },
      },
    }
  },
  mounted() {
    this.isMounted = true
  },
  computed: {
    canvasWidth() {
      return this.isMounted ? this.$refs.app.clientWidth : undefined
    },
  },
  methods: {
    extractCoordinatesFromPoints(points) {
      return points.map(point => Object.values(point.pos))
    },
    checkPoints() {
      const pointsA = this.extractCoordinatesFromPoints(
        this.$refs.img1.$data.points
      )

      const pointsB = this.extractCoordinatesFromPoints(
        this.$refs.img2.$data.points
      )

      if (pointsA.length < 4 || pointsB.length < 4) {
        console.debug(`PointsA and PointsB require at least 4 items`)
        alert(`PointsA and PointsB require at least 4 items`)
        return false
      }

      if (pointsA.length != pointsB.length) {
        console.debug(`PointsA and PointsB must be same size`)
        alert(`PointsA and PointsB must be same size`)
        return false
      }

      return true
    },
    handleSend() {
      if (!this.checkPoints()) return

      const overlayImage = this.$refs.img1
      const baseImage = this.$refs.img2

      axios
        .post("/api", {
          img: overlayImage.$data.image.src,
          points_img: this.extractCoordinatesFromPoints(
            overlayImage.$data.points
          ),
          points_another: this.extractCoordinatesFromPoints(
            baseImage.$data.points
          ),
          width: baseImage.$data.image.naturalWidth,
          height: baseImage.$data.image.naturalHeight,
        })
        .then(resp => {
          console.debug(resp.data)
          const image = new Image()

          image.onload = () => {
            this.resultCanvas.overlayImage.image = image
          }
          image.src = resp.data["img"]
          this.resultCanvas.baseImage.image = baseImage.$data.image
        })
        .catch(error => {
          console.error(error)
          console.error(error.response.data)
        })
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
