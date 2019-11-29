<template>
  <div class="app-wrapper">
    <div id="app">
      <div class="tool">
        <h1>homography-assistant</h1>
        <process-controller
          @send="handleSend"
          @changeVisible="handleChangeResultImageVisible"
          :isResultImageVisible="isResultImageVisible"
          :resultImageOpacity="resultImageOpacity"
          @sliderChange="handleResultImageOpacityChange"
        />
      </div>
      <div class="selector-wrapper">
        <points-selector id="img-1" ref="img1" />
        <points-selector id="img-2" ref="img2" />
      </div>
      <result-canvas
        ref="resultCanvas"
        :resultImage="resultImage"
        :baseImage="baseImage"
        :width="this.$el.clientWidth - 32"
        :isResultImageVisible="isResultImageVisible"
        :resultImageOpacity="resultImageOpacity"
        v-if="resultImage !== null"
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
      resultImage: null,
      resultImageWidth: null,
      baseImage: null,
      isResultImageVisible: true,
      resultImageOpacity: 1.0,
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

      // どちらに変換するかによって変更
      this.resultImageWidth = this.$refs.img2.$data.image.naturalWidth
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
            this.resultImage = image
          }
          image.src = resp.data["img"]
          this.baseImage = this.$refs.img2.$data.image
        })
        .catch(error => console.debug(error))
    },
    handleChangeResultImageVisible() {
      // 射影変換画像の表示/非表示切り替え
      this.isResultImageVisible = !this.isResultImageVisible
    },
    handleResultImageOpacityChange(opacity) {
      this.resultImageOpacity = opacity
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
