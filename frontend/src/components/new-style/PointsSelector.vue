<template>
  <v-card v-resize="updateSize" class="points-selector" tile elevation="3">
    <v-container
      class="pa-0 d-flex flex-column justify-center align-start flex-nowrap"
      fill-height
    >
      <div class="toolbar">
        <v-toolbar color="warning" dense flat>
          <v-toolbar-title class="font-weight-bold">
            Aerial Image
          </v-toolbar-title>
        </v-toolbar>
      </div>
      <div class="content-wrapper">
        <div class="content" ref="content">
          <file-uploader
            :canvas-visible="imageCanvas.image !== null"
            @submit="handleSubmit"
            v-if="uploadable"
          ></file-uploader>
          <image-canvas
            @add-point="handleAddPoint"
            @drag-point="handleDragPoint"
            v-bind="imageCanvas"
            v-if="imageCanvas.image !== null"
          ></image-canvas>
        </div>
      </div>
    </v-container>
  </v-card>

  <!-- <div class="image-container" ref="wrapper">
      <file-uploader
        :canvas-visible="imageCanvas.image !== null"
        @submit="handleSubmit"
        v-if="uploadable"
      ></file-uploader>

      <image-canvas
        @add-point="handleAddPoint"
        @drag-point="handleDragPoint"
        v-bind="imageCanvas"
        v-if="imageCanvas.image !== null"
      ></image-canvas>
    </div>
    <points-list
      :points="imageCanvas.points"
      @delete="handleDeletePoint"
      @swap="handleListSwap"
      class="points-list"
    ></points-list> -->
</template>

<script>
import { pickColorWithBG } from "@/utils/colors.js"

import ImageCanvas from "./ImageCanvas.vue"
import FileUploader from "./FileUploader.vue"
import PointsList from "./points-list/PointsList.vue"

export default {
  name: "PointsSelector",
  components: {
    ImageCanvas,
    FileUploader,
    PointsList,
  },
  data() {
    return {
      uploadable: true,
      imageCanvas: {
        image: null,
        width: null,
        height: null,
        points: [],
      },
    }
  },
  mounted() {
    this.updateSize()
  },
  computed: {
    image: {
      get() {
        return this.imageCanvas.image
      },
      set(newValue) {
        return this.$set(this.imageCanvas, "image", newValue)
      },
    },
    width: {
      get() {
        return this.imageCanvas.width
      },
      set(newValue) {
        return this.$set(this.imageCanvas, "width", newValue)
      },
    },
    height: {
      get() {
        return this.imageCanvas.height
      },
      set(newValue) {
        return this.$set(this.imageCanvas, "height", newValue)
      },
    },
    points: {
      get() {
        return this.imageCanvas.points
      },
      set(newValue) {
        return this.$set(this.imageCanvas, "points", newValue)
      },
    },
    maxIdInPoints() {
      return this.points.length == 0
        ? 0
        : this.points.map(point => point.id).reduce((a, b) => (a > b ? a : b))
    },
  },
  methods: {
    updateSize() {
      console.log("Update Size @ PointsSelector.vue")
      this.width = this.$refs.content.clientWidth
      this.height = this.$refs.content.clientHeight
    },
    handleSubmit(image) {
      this.uploadable = false
      this.image = image
    },
    handleAddPoint(pos) {
      const points = this.points

      const id = this.maxIdInPoints + 1
      const color = pickColorWithBG(id)

      console.debug(`handleAddPoint <pos=${JSON.stringify(pos)}}>`)
      points.push({ id, pos, color })
    },
    handleDeletePoint(id) {
      const points = this.points
      const idx = points.findIndex(point => point.id == id)
      console.debug(`handleDeletePoint <id=${id}>`)
      if (idx != -1) {
        points.splice(idx, 1)
      } else {
        console.error(`Error! -- cannot find point (id=${id})`)
      }
    },
    handleDragPoint(idx, newPos) {
      const points = this.points

      console.debug(
        `handleDragOnPoint <idx=${idx}, newPos=(${newPos.x}, ${newPos.y})>`
      )

      points.splice(idx, 1, {
        ...points[idx],
        pos: newPos,
      })
    },
    handleListSwap(swappedList) {
      console.debug("handleListSwap")
      console.debug(swappedList)

      this.points = swappedList
    },
  },
}
</script>

<style lang="scss" scoped>
.fill-width {
  width: 100%;
}
.points-selector {
  height: 100%;
}
.toolbar {
  @extend .fill-width;
}
.content-wrapper {
  @extend .fill-width;
  flex-grow: 1;
  position: relative;
  box-sizing: border-box;
}
.content {
  height: 100%;
}
/* .image-container {
  width: 68%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
} */
/* .points-list {
  width: 32%;
  height: 100%;
  box-sizing: border-box;
} */
</style>
