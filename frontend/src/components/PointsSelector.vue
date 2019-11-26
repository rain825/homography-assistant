<template>
  <div class="points-selector">
    <div class="image-container" ref="wrapper">
      <file-uploader
        @submit="handleSubmit"
        :canvas-visible="image !== null"
        v-if="uploadable"
      ></file-uploader>

      <image-canvas
        @add-point="handleAddPoint"
        @drag-point="handleDragPoint"
        :width="canvasWidth"
        :image="image"
        :points="points"
        v-if="image !== null"
      ></image-canvas>
    </div>
    <draggable-list :points="points" @swap="handleListSwap"></draggable-list>
  </div>
</template>

<script>
import chroma from "chroma-js"
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
      image: null,
      canvasWidth: null,
      points: [],
    }
  },
  mounted() {
    this.canvasWidth = this.$el.clientWidth
  },
  methods: {
    generateRandomColor() {
      const bg = chroma.random()
      const fg =
        chroma.contrast("white", bg) > chroma.contrast("black", bg)
          ? chroma("white")
          : chroma("black")

      return {
        bg: bg.hex(),
        fg: fg.hex(),
      }
    },
    handleSubmit(image) {
      this.uploadable = false
      this.image = image
    },
    handleAddPoint(pos) {
      console.debug(`handleAddPoint <pos=${JSON.stringify(pos)}}>`)
      this.points.push({
        id: this.points.length,
        pos: pos,
        color: this.generateRandomColor(),
      })
    },
    handleDragPoint(idx, newPos) {
      console.debug(
        `handleDragOnPoint <idx=${idx}, newPos=(${newPos.x}, ${newPos.y})>`
      )

      const points = this.points

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
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 5px solid red;
}
.image-container {
  width: 100%;
  height: fit-content;
  position: relative;
  box-sizing: border-box;
}
</style>
