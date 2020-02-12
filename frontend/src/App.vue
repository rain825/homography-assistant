<template>
  <div class="app-wrapper">
    <div id="app" ref="app">
      <div class="toolbar">
        <h1>homography-assistant</h1>
        <toolbar
          @send="handleSend"
          @show-modal="showModal"
          v-model="resultCanvas"
        />
      </div>
      <div class="main-window">
        <div class="selector-wrapper">
          <points-selector class="selector" id="img-1" ref="img1" />
          <points-selector class="selector" id="img-2" ref="img2" />
        </div>
        <result-canvas
          :config="resultCanvas"
          class="result-canvas"
          ref="resultCanvas"
        ></result-canvas>
      </div>
    </div>
    <file-export-modal
      :points="points"
      :visible="isVisibleExportModal"
      @close="isVisibleExportModal = false"
    ></file-export-modal>
  </div>
</template>

<script>
import PointsSelector from "./components/PointsSelector.vue"
import Toolbar from "./components/Toolbar.vue"
import ResultCanvas from "./components/ResultCanvas.vue"
import FileExportModal from "./components/FileExportModal.vue"
import axios from "axios"

export default {
  name: "app",
  components: {
    PointsSelector,
    Toolbar,
    ResultCanvas,
    FileExportModal,
  },
  data() {
    return {
      isMounted: false,
      isVisibleExportModal: false,
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
    points() {
      return this.isMounted
        ? [this.$refs.img1.points, this.$refs.img2.points]
        : Array()
    },
    transformAvailable() {
      return this.isMounted ? this.checkPoints() : false
    },
  },
  methods: {
    extractCoordinatesFromPoints(points) {
      return points.map(point => Object.values(point.pos))
    },

    checkPoints() {
      const [pointsA, pointsB] = this.points

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
          img: overlayImage.image.src,
          points_img: this.extractCoordinatesFromPoints(overlayImage.points),
          points_another: this.extractCoordinatesFromPoints(baseImage.points),
          width: baseImage.image.naturalWidth,
          height: baseImage.image.naturalHeight,
        })
        .then(resp => {
          console.debug(resp.data)
          const image = new Image()

          image.onload = () => {
            this.resultCanvas.overlayImage.image = image
          }
          image.src = resp.data["img"]
          this.resultCanvas.baseImage.image = baseImage.image
        })
        .catch(error => {
          console.error(error)
          console.error(error.response.data)
        })
    },
    showModal() {
      if (!this.checkPoints()) return

      this.isVisibleExportModal = true
    },
  },
}
</script>

<style>
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
.app-wrapper {
  width: 100%;
  height: 100%;
  padding: 8px 8px;
  box-sizing: border-box;
  position: relative;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.toolbar {
  width: 100%;
  height: 8%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.tool h1 {
  margin: 0px;
}
.main-window {
  width: 100%;
  height: 92%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.selector-wrapper {
  width: 49%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.selector {
  height: 48%;
}
.result-canvas {
  border: 5px solid blue;
  box-sizing: border-box;
  width: 49%;
  height: 100%;
}
</style>
