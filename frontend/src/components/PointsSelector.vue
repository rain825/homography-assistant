<template>
  <div class="points-selector">
    <div class="image-container" ref="wrapper">
      <file-uploader
        @submit="handleSubmit"
        :canvas-visible="imageCanvas.image !== null"
        v-if="uploadable"
      ></file-uploader>

      <image-canvas
        @add-point="handleAddPoint"
        @drag-point="handleDragPoint"
        v-bind="imageCanvas"
        v-if="imageCanvas.image !== null"
      ></image-canvas>
    </div>
    <draggable-list
      class="draggable-list"
      :points="imageCanvas.points"
      @swap="handleListSwap"
    ></draggable-list>
  </div>
</template>

<script>
import { pickColorWithBG } from "@/utils/colors.js"

import ImageCanvas from "@/components/ImageCanvas.vue"
import FileUploader from "@/components/FileUploader.vue"
import DraggableList from "@/components/DraggableList.vue"

export default {
  name: "PointsSelector",
  components: {
    ImageCanvas,
    FileUploader,
    DraggableList,
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
  },
  mounted() {
    this.width = this.$refs.wrapper.clientWidth
    this.height = this.$refs.wrapper.clientHeight
  },
  methods: {
    handleSubmit(image) {
      this.uploadable = false
      this.image = image
    },
    handleAddPoint(pos) {
      const points = this.points

      const id = points.length
      const color = pickColorWithBG(id)

      console.debug(`handleAddPoint <pos=${JSON.stringify(pos)}}>`)
      points.push({ id, pos, color })
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

<style scoped>
.points-selector {
  width: 100%;
  box-sizing: content-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border: 5px solid red;
}
.image-container {
  width: 68%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
}
.draggable-list {
  width: 32%;
  height: 100%;
  box-sizing: border-box;
}
</style>
