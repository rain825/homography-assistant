<template>
  <div class="file-uploader">
    <label
      :class="{ overlay: canvasVisible, 'in-drop-area': isInDropArea}"
      @dragenter.prevent="handleEnterDropArea"
      @dragleave.prevent="handleLeaveDropArea"
      @dragover.prevent
      @drop.prevent.stop="handleSubmit"
    >
      <input @change="handleSubmit" name="imgFile" ref="file" style="display:none;" type="file" />
    </label>
    <div class="message">Click here or drop file to open image</div>
  </div>
</template>

<script>
export default {
  props: {
    canvasVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dropAreaCounter: 0,
      isInDropArea: false
    };
  },
  methods: {
    handleEnterDropArea() {
      this.isInDropArea = true;
      console.debug(`enterDropArea:${this.isInDropArea}`);
    },
    handleLeaveDropArea() {
      this.isInDropArea = false;
      console.debug(`leaveDropArea:${this.isInDropArea}`);
    },
    handleSubmit(event) {
      const file = event.target.files
        ? event.target.files[0]
        : event.dataTransfer.files[0];
      const fileReader = new FileReader();

      fileReader.onload = event => {
        const image = new Image();
        image.onload = () => {
          this.$emit("submit", image);
        };
        image.src = event.target.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
};
</script>

<style scoped>
.file-uploader {
  width: 100%;
  height: 400px;
  /* padding: 18px; */
  box-sizing: border-box;
  outline: 5px dotted #222;
  outline-offset: -12px;
}

label {
  width: 100%;
  height: 100%;
  padding: 18px;
  background-color: transparent;
  box-sizing: border-box;
  color: black;
  display: block;
  transition-property: all;
  transition: 0.1s;
  position: absolute;
  z-index: 0;
}
label:hover {
  background-color: rgba(64, 128, 255, 0.3);
}

.in-drop-area {
  background-color: rgba(64, 255, 121, 0.3);
}
.overlay {
  position: absolute;
  top: 0px;
  z-index: 0;
}
.message {
  font-size: 1.5rem;
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  position: absolute;
  z-index: -10;
}
</style>
