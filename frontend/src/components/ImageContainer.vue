<template>
  <div class="wrapper" ref="wrapper">
    <file-uploader
      @submit="handleSubmit"
      :image-visibility="image !== null"
      v-if="uploadable"
    ></file-uploader>
    <!-- <canvas class="canvas" ref="canvas"></canvas> -->
    <!-- <div v-if="image !== null">
      Image Loaded !
    </div> -->
    <image-canvas
      :width="canvasWidth"
      @submit="handleSubmit"
      :image="image"
      v-if="image !== null"
    ></image-canvas>
  </div>
</template>

<script>
import FileUploader from "./FileUploader"
import ImageCanvas from "./ImageCanvas.vue"

export default {
  components: {
    FileUploader,
    ImageCanvas,
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
  },
}
</script>

<style scoped>
.wrapper {
  margin: 8px;
  width: 100%;
  height: fit-content;
  position: relative;
  border: 5px solid red;
  box-sizing: border-box;
}
</style>
