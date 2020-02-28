<template>
  <div class="file-uploader">
    <label
      :class="{ overlay: canvasVisible, 'in-drop-area': isInDropArea }"
      @dragenter.prevent="handleEnterDropArea"
      @dragleave.prevent="handleLeaveDropArea"
      @dragover.prevent
      @drop.prevent.stop="handleSubmit"
    >
      <input
        @change="handleSubmit"
        name="imgFile"
        ref="file"
        style="display:none;"
        type="file"
      />
    </label>
    <div class="message">
      Click here or drop file to open image
    </div>
  </div>
</template>

<script>
export default {
  props: {
    canvasVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dropAreaCounter: 0,
      isInDropArea: false,
    }
  },
  methods: {
    handleEnterDropArea() {
      this.isInDropArea = true
      console.debug(`enterDropArea:${this.isInDropArea}`)
    },
    handleLeaveDropArea() {
      this.isInDropArea = false
      console.debug(`leaveDropArea:${this.isInDropArea}`)
    },
    handleSubmit(event) {
      const file = event.target.files
        ? event.target.files[0]
        : event.dataTransfer.files[0]
      const fileReader = new FileReader()

      fileReader.onload = event => {
        const image = new Image()
        image.onload = () => {
          this.$emit("submit", image)
        }
        image.src = event.target.result
      }
      fileReader.readAsDataURL(file)
    },
  },
}
</script>

<style lang="scss" scoped>
$inset-width: 8px;
.fill {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.z-front {
  position: absolute;
  z-index: 5;
}
.z-back {
  position: absolute;
  z-index: 0;
}
.file-uploader {
  @extend .fill;
  position: relative;
  outline-width: 2px;
  outline-style: dashed;
  outline-color: var(--v-warning-base);
  outline-offset: -$inset-width;
}

label {
  @extend .fill;
  @extend .z-front;
  padding: 0px;
  background-color: transparent;
  display: block;
  transition-property: all;
  transition: 0.1s;
}
label:hover {
  background-color: rgba(255, 188, 64, 0.2);
}
.in-drop-area {
  background-color: rgba(70, 255, 64, 0.2);
}
.overlay {
  @extend .z-front;
  top: 0px;
}
.message {
  @extend .fill;
  @extend .z-back;
  display: flex;
  font-size: 1.5rem;
  padding: $inset-width * 2;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
</style>
