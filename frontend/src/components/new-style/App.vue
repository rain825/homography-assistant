<template>
  <v-app id="app" ref="app">
    <toolbar
      @send="handleSend"
      @show-modal="showModal"
      v-model="resultCanvas"
    />
    <v-content>
      <v-container fluid fill-height>
        <v-row class="fill-height" no-gutters>
          <v-col cols="6">
            <v-row align-content="space-between" class="fill-height" no-gutters>
              <v-col cols="12" style="height: 50%">
                <points-selector class="selector" id="img-1" ref="img1" />
              </v-col>
              <v-col cols="12" style="height: 49%">
                <points-selector class="selector" id="img-2" ref="img2" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <result-canvas
              :config="resultCanvas"
              class="result-canvas"
              ref="resultCanvas"
            ></result-canvas>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <file-export-modal
      :points="points"
      :visible="isVisibleExportModal"
      @close="isVisibleExportModal = false"
    ></file-export-modal>
  </v-app>
</template>

<script>
import PointsSelector from "./PointsSelector.vue"
import Toolbar from "./Toolbar.vue"
import ResultCanvas from "./ResultCanvas.vue"
import FileExportModal from "./FileExportModal.vue"
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
html {
  overflow-y: hidden;
}
body {
  margin: 0;
}
</style>
