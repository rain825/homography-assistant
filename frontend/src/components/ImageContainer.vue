<template>
  <div class="container-wrapper" ref="wrapper">
    <file-uploader
      @submit="handleSubmit"
      :image-visibility="image !== null"
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
</template>

<script>
import { pointsValidator } from "@/utils/validator"

import FileUploader from "./FileUploader"
import ImageCanvas from "./ImageCanvas.vue"

export default {
  components: {
    FileUploader,
    ImageCanvas,
  },
  props: {
    points: {
      type: Array,
      required: true,
      validator: pointsValidator,
    },
  },
  data() {
    return {
      uploadable: true,
      image: null,
      canvasWidth: null,
    }
  },
  mounted() {
    this.canvasWidth = this.$el.clientWidth
  },
  methods: {
    handleSubmit(image) {
      this.uploadable = false
      this.image = image
    },
    handleAddPoint(pos) {
      console.debug(
        `handleAddPoint@ImageContainer <pos=${JSON.stringify(pos)}>`
      )
      this.$emit("add-point", pos)
    },
    handleDragPoint(idx, newPos) {
      console.debug(
        `handleDragPoint@ImageContainer <idx=${idx} newPos=${JSON.stringify(
          newPos
        )}>`
      )
      this.$emit("drag-point", idx, newPos)
    },
  },
}
</script>

<style scoped>
.container-wrapper {
  width: 100%;
  height: fit-content;
  position: relative;
  border: 5px solid red;
  box-sizing: border-box;
}
</style>
